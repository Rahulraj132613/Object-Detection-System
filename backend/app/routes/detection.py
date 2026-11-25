from typing import Optional, List
from fastapi import APIRouter, File, UploadFile, Query, HTTPException, status
from fastapi.responses import JSONResponse

from app.services.yolo_service import yolo_service
from app.services.history_service import HistoryService
from app.models import DetectionResponse

router = APIRouter(prefix="", tags=["Detection"])

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE = 15 * 1024 * 1024  # 15 MB limit


@router.get("/classes")
async def get_detection_classes():
    """
    Returns all COCO classes recognizable by the YOLO model.
    Used by frontend for category filtering.
    """
    classes_dict = yolo_service.get_supported_classes()
    return {
        "total_classes": len(classes_dict),
        "classes": [{"id": k, "name": v} for k, v in classes_dict.items()]
    }


@router.post("/detect", response_model=DetectionResponse)
async def detect_objects(
    file: UploadFile = File(..., description="Image file to analyze"),
    confidence: float = Query(0.35, ge=0.05, le=1.0, description="Confidence threshold"),
    iou_threshold: float = Query(0.45, ge=0.1, le=0.9, description="Intersection-over-Union threshold"),
    categories: Optional[str] = Query(None, description="Comma-separated category names to filter")
):
    """
    Upload an image, run real Ultralytics YOLOv8 inference, annotate bounding boxes,
    and persist results to SQLite database.
    """
    # 1. Validation: file extension
    filename = file.filename or "uploaded_image.jpg"
    ext = "." + filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{ext}'. Supported formats: JPEG, PNG, WEBP."
        )

    # 2. Validation: file content
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded image file is empty."
        )
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeds maximum allowed limit of 15MB."
        )

    # 3. Parse category filters
    filter_classes = [c.strip() for c in categories.split(",") if c.strip()] if categories else None

    # 4. Perform YOLO detection & annotation
    try:
        detection_result = yolo_service.detect_objects(
            image_bytes=contents,
            filename=filename,
            confidence_threshold=confidence,
            iou_threshold=iou_threshold,
            filter_classes=filter_classes
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Detection inference error: {str(exc)}"
        )

    # 5. Persist detection scan to SQLite history
    try:
        record_id = await HistoryService.save_detection(
            filename=filename,
            image_width=detection_result.image_width,
            image_height=detection_result.image_height,
            confidence_threshold=confidence,
            total_objects=detection_result.total_objects,
            inference_time_ms=detection_result.inference_time_ms,
            class_counts=detection_result.class_counts,
            objects=detection_result.objects,
            annotated_image_path=detection_result.annotated_image_url
        )
        detection_result.record_id = record_id
    except Exception as db_err:
        # Non-fatal if DB insert fails; still return detection result
        print(f"Warning: Failed to save to history DB: {db_err}")

    return detection_result
