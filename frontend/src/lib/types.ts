export interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
}

export interface DetectedObject {
  id: number;
  class_id: number;
  class_name: string;
  confidence: number;
  confidence_percent: number;
  box: BoundingBox;
  color: string;
}

export interface DetectionResponse {
  success: boolean;
  record_id?: number;
  filename: string;
  image_width: number;
  image_height: number;
  inference_time_ms: number;
  confidence_threshold: number;
  total_objects: number;
  class_counts: Record<string, number>;
  objects: DetectedObject[];
  annotated_image_base64?: string;
  annotated_image_url?: string;
}

export interface HistoryItem {
  id: number;
  timestamp: string;
  filename: string;
  image_width: number;
  image_height: number;
  confidence_threshold: number;
  total_objects: number;
  inference_time_ms: number;
  class_counts: Record<string, number>;
  detections: DetectedObject[];
  annotated_image_url?: string;
}

export interface AnalyticsResponse {
  total_scans: number;
  total_objects_detected: number;
  average_inference_time_ms: number;
  top_classes: Array<{ class_name: string; count: number }>;
  recent_activity: Array<{
    id: number;
    timestamp: string;
    filename: string;
    total_objects: number;
    inference_time_ms: number;
  }>;
}

export interface COCOClass {
  id: number;
  name: string;
}
