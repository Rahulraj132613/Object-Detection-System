import base64
import time
import uuid
from pathlib import Path
from typing import List, Dict, Tuple, Optional, Any
import cv2
import numpy as np
from ultralytics import YOLO

from app.config import settings
from app.models import BoundingBox, DetectedObject, DetectionResponse

# High-contrast color palette optimized for dark-mode UI bounding boxes
COLOR_PALETTE = [
    "#00F5D4", "#7B2CBF", "#FF007F", "#FEE440", "#00BBF9",
    "#38B000", "#FF5400", "#9B5DE5", "#00F0FF", "#FFB703",
    "#FB5607", "#8338EC", "#3A86FF", "#06D6A0", "#EF476F",
    "#118AB2", "#FFD166", "#04E762", "#DC2F02", "#4895EF"
]


def hex_to_bgr(hex_code: str) -> Tuple[int, int, int]:
    hex_code = hex_code.lstrip("#")
    r, g, b = tuple(int(hex_code[i:i+2], 16) for i in (0, 2, 4))
    return (b, g, r)  # OpenCV uses BGR format


class YOLOService:
    _instance: Optional["YOLOService"] = None
    _model: Optional[YOLO] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(YOLOService, cls).__new__(cls)
        return cls._instance

    @property
    def model(self) -> YOLO:
        if self._model is None:
            # Loads pretrained YOLOv8 nano model
            self._model = YOLO(settings.YOLO_MODEL)
        return self._model

    def get_supported_classes(self) -> Dict[int, str]:
        """Returns standard COCO class IDs and labels from the YOLO model."""
        return self.model.names

    def detect_objects(
        self,
        image_bytes: bytes,
        filename: str,
        confidence_threshold: float = settings.DEFAULT_CONFIDENCE,
        iou_threshold: float = settings.DEFAULT_IOU_THRESHOLD,
        filter_classes: Optional[List[str]] = None
    ) -> DetectionResponse:
        """
        Runs real YOLOv8 object detection on an input image buffer,
        annotates the image with styled bounding boxes and labels,
        and returns structured detections.
        """
        # Convert bytes to OpenCV image
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("Failed to decode uploaded image file. Ensure it is a valid JPG/PNG/WebP format.")

        height, width = img.shape[:2]

        start_time = time.perf_counter()
        results = self.model.predict(
            source=img,
            conf=confidence_threshold,
            iou=iou_threshold,
            verbose=False
        )
        inference_time_ms = (time.perf_counter() - start_time) * 1000.0

        detected_objects: List[DetectedObject] = []
        class_counts: Dict[str, int] = {}
        annotated_img = img.copy()

        # Parse detected boxes
        if len(results) > 0 and results[0].boxes is not None:
            boxes = results[0].boxes
            obj_idx = 1
            for i in range(len(boxes)):
                cls_id = int(boxes.cls[i].item())
                cls_name = self.model.names.get(cls_id, f"class_{cls_id}")
                conf = float(boxes.conf[i].item())

                # Filter by category if user requested specific categories
                if filter_classes and cls_name.lower() not in [c.lower() for c in filter_classes]:
                    continue

                xyxy = boxes.xyxy[i].tolist()
                x1, y1, x2, y2 = float(xyxy[0]), float(xyxy[1]), float(xyxy[2]), float(xyxy[3])
                box_w = max(0.0, x2 - x1)
                box_h = max(0.0, y2 - y1)

                color_hex = COLOR_PALETTE[cls_id % len(COLOR_PALETTE)]
                bgr_color = hex_to_bgr(color_hex)

                det_obj = DetectedObject(
                    id=obj_idx,
                    class_id=cls_id,
                    class_name=cls_name,
                    confidence=round(conf, 4),
                    confidence_percent=round(conf * 100.0, 1),
                    box=BoundingBox(
                        x1=round(x1, 1),
                        y1=round(y1, 1),
                        x2=round(x2, 1),
                        y2=round(y2, 1),
                        width=round(box_w, 1),
                        height=round(box_h, 1)
                    ),
                    color=color_hex
                )
                detected_objects.append(det_obj)
                class_counts[cls_name] = class_counts.get(cls_name, 0) + 1
                obj_idx += 1

                # Draw styled bounding box on annotated_img
                # 1. Main bounding rectangle
                thickness = max(2, int(min(width, height) / 300))
                cv2.rectangle(
                    annotated_img,
                    (int(x1), int(y1)),
                    (int(x2), int(y2)),
                    bgr_color,
                    thickness,
                    cv2.LINE_AA
                )

                # 2. Label banner
                label_text = f"{cls_name} {det_obj.confidence_percent:.1f}%"
                font = cv2.FONT_HERSHEY_SIMPLEX
                font_scale = max(0.45, min(width, height) / 1000)
                font_thick = max(1, int(thickness / 1.5))
                (txt_w, txt_h), baseline = cv2.getTextSize(label_text, font, font_scale, font_thick)

                # Position label above box if space permits, else inside
                label_y1 = int(y1 - txt_h - 10)
                label_y2 = int(y1)
                if label_y1 < 0:
                    label_y1 = int(y1)
                    label_y2 = int(y1 + txt_h + 10)

                label_x1 = int(x1)
                label_x2 = int(x1 + txt_w + 10)

                # Draw filled banner background
                cv2.rectangle(
                    annotated_img,
                    (label_x1, label_y1),
                    (label_x2, label_y2),
                    bgr_color,
                    -1
                )

                # Text color: dark for light banners, white for darker banners
                brightness = (bgr_color[0] * 0.114 + bgr_color[1] * 0.587 + bgr_color[2] * 0.299)
                text_color = (0, 0, 0) if brightness > 140 else (255, 255, 255)

                cv2.putText(
                    annotated_img,
                    label_text,
                    (label_x1 + 5, label_y2 - 5),
                    font,
                    font_scale,
                    text_color,
                    font_thick,
                    cv2.LINE_AA
                )

        # Encode annotated image to JPEG buffer
        ret, buf = cv2.imencode(".jpg", annotated_img, [int(cv2.IMWRITE_JPEG_QUALITY), 92])
        if not ret:
            raise RuntimeError("Failed to encode annotated image to JPEG")

        annotated_bytes = buf.tobytes()
        base64_str = f"data:image/jpeg;base64,{base64.b64encode(annotated_bytes).decode('utf-8')}"

        # Save to disk for persistence and direct download link
        unique_id = uuid.uuid4().hex
        annotated_filename = f"annotated_{unique_id}.jpg"
        annotated_path = settings.ANNOTATED_DIR / annotated_filename
        with open(annotated_path, "wb") as f:
            f.write(annotated_bytes)

        return DetectionResponse(
            success=True,
            filename=filename,
            image_width=width,
            image_height=height,
            inference_time_ms=round(inference_time_ms, 2),
            confidence_threshold=confidence_threshold,
            total_objects=len(detected_objects),
            class_counts=class_counts,
            objects=detected_objects,
            annotated_image_base64=base64_str,
            annotated_image_url=f"/static/annotated/{annotated_filename}"
        )


yolo_service = YOLOService()
