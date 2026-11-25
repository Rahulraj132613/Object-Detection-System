import csv
import io
import json
from typing import Dict, Any, List


class ReportService:
    @staticmethod
    def generate_csv(detection_data: Dict[str, Any]) -> str:
        """
        Generate CSV content containing summary and itemized detected objects.
        """
        output = io.StringIO()
        writer = csv.writer(output)

        # Header section
        writer.writerow(["AI Object Detection & Recognition System - Scan Report"])
        writer.writerow([])
        writer.writerow(["Filename", detection_data.get("filename", "unknown")])
        writer.writerow(["Timestamp", detection_data.get("timestamp", "")])
        writer.writerow(["Resolution", f"{detection_data.get('image_width', 0)}x{detection_data.get('image_height', 0)}"])
        writer.writerow(["Confidence Threshold", f"{detection_data.get('confidence_threshold', 0.0):.2f}"])
        writer.writerow(["Total Objects Detected", detection_data.get("total_objects", 0)])
        writer.writerow(["Inference Time (ms)", f"{detection_data.get('inference_time_ms', 0.0):.1f}"])
        writer.writerow([])

        # Class counts breakdown
        writer.writerow(["Class Summary"])
        writer.writerow(["Category", "Count"])
        class_counts = detection_data.get("class_counts", {})
        for cat, cnt in class_counts.items():
            writer.writerow([cat, cnt])
        writer.writerow([])

        # Itemized detections
        writer.writerow(["Itemized Objects"])
        writer.writerow(["Index", "Class ID", "Class Name", "Confidence (%)", "X1", "Y1", "X2", "Y2", "Width", "Height"])

        objects: List[Dict[str, Any]] = detection_data.get("objects", []) or detection_data.get("detections", [])
        for obj in objects:
            box = obj.get("box", {})
            writer.writerow([
                obj.get("id", 0),
                obj.get("class_id", 0),
                obj.get("class_name", ""),
                f"{obj.get('confidence_percent', obj.get('confidence', 0.0) * 100):.2f}%",
                f"{box.get('x1', 0.0):.1f}",
                f"{box.get('y1', 0.0):.1f}",
                f"{box.get('x2', 0.0):.1f}",
                f"{box.get('y2', 0.0):.1f}",
                f"{box.get('width', 0.0):.1f}",
                f"{box.get('height', 0.0):.1f}",
            ])

        return output.getvalue()

    @staticmethod
    def generate_json(detection_data: Dict[str, Any]) -> str:
        """
        Generate pretty-printed JSON report.
        """
        return json.dumps(detection_data, indent=2)
