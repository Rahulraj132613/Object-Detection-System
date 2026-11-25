from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any


class BoundingBox(BaseModel):
    x1: float = Field(..., description="Top-left X coordinate")
    y1: float = Field(..., description="Top-left Y coordinate")
    x2: float = Field(..., description="Bottom-right X coordinate")
    y2: float = Field(..., description="Bottom-right Y coordinate")
    width: float = Field(..., description="Box width")
    height: float = Field(..., description="Box height")


class DetectedObject(BaseModel):
    id: int = Field(..., description="Object index in scan")
    class_id: int = Field(..., description="COCO class ID")
    class_name: str = Field(..., description="Label / class name")
    confidence: float = Field(..., description="Confidence score between 0.0 and 1.0")
    confidence_percent: float = Field(..., description="Confidence percentage (0-100%)")
    box: BoundingBox
    color: str = Field(..., description="HEX color used for bounding box")


class DetectionResponse(BaseModel):
    success: bool = True
    record_id: Optional[int] = None
    filename: str
    image_width: int
    image_height: int
    inference_time_ms: float
    confidence_threshold: float
    total_objects: int
    class_counts: Dict[str, int]
    objects: List[DetectedObject]
    annotated_image_base64: Optional[str] = None
    annotated_image_url: Optional[str] = None


class HistoryItem(BaseModel):
    id: int
    timestamp: str
    filename: str
    image_width: int
    image_height: int
    confidence_threshold: float
    total_objects: int
    inference_time_ms: float
    class_counts: Dict[str, int]
    detections: List[DetectedObject]
    annotated_image_url: Optional[str] = None


class AnalyticsResponse(BaseModel):
    total_scans: int
    total_objects_detected: int
    average_inference_time_ms: float
    top_classes: List[Dict[str, Any]]
    recent_activity: List[Dict[str, Any]]
