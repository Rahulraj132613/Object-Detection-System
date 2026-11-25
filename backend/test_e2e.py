import os
import sys
import base64
import json
import cv2
import numpy as np
from fastapi.testclient import TestClient

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.main import app
from app.services.yolo_service import yolo_service
import ultralytics

TEST_RESULTS = []

def record(test_name: str, passed: bool, details: str = ""):
    status = "PASSED" if passed else "FAILED"
    print(f"[{status}] {test_name}: {details}")
    TEST_RESULTS.append({"name": test_name, "passed": passed, "details": details})


def run_all_tests():
    print("=" * 65)
    print("AI Object Detection & Recognition System - Local Verification Suite")
    print("=" * 65)

    client = TestClient(app)

    # 1. Environment & Dependencies Check
    try:
        import torch
        import pydantic
        import aiosqlite
        cuda_avail = torch.cuda.is_available()
        record(
            "1. Environment & Dependencies",
            True,
            f"Python {sys.version.split()[0]}, PyTorch {torch.__version__} (CUDA: {cuda_avail}), OpenCV {cv2.__version__}, FastAPI loaded"
        )
    except Exception as e:
        record("1. Environment & Dependencies", False, str(e))

    # 2. Test /api/health Endpoint
    try:
        res = client.get("/api/health")
        data = res.json()
        passed = res.status_code == 200 and data.get("status") == "healthy"
        record("2. Health Check (/api/health)", passed, f"Status: {res.status_code}, Payload: {data}")
    except Exception as e:
        record("2. Health Check (/api/health)", False, str(e))

    # 3. Test /docs Endpoint
    try:
        res = client.get("/docs")
        passed = res.status_code == 200 and "Swagger UI" in res.text
        record("3. Swagger UI Docs (/docs)", passed, f"Status: {res.status_code}, Length: {len(res.text)} bytes")
    except Exception as e:
        record("3. Swagger UI Docs (/docs)", False, str(e))

    # 4. Test /api/classes Endpoint
    try:
        res = client.get("/api/classes")
        data = res.json()
        total_classes = data.get("total_classes", 0)
        classes_list = data.get("classes", [])
        passed = res.status_code == 200 and total_classes == 80 and len(classes_list) == 80
        sample_classes = [c["name"] for c in classes_list[:5]]
        record("4. Supported Classes (/api/classes)", passed, f"Total: {total_classes} categories, First 5: {sample_classes}")
    except Exception as e:
        record("4. Supported Classes (/api/classes)", False, str(e))

    # 5. Real YOLO Inference on sample image (bus.jpg)
    bus_path = os.path.join(os.path.dirname(ultralytics.__file__), "assets", "bus.jpg")
    with open(bus_path, "rb") as f:
        bus_bytes = f.read()

    detected_record_id = None
    try:
        res = client.post(
            "/api/detect?confidence=0.35&iou_threshold=0.45",
            files={"file": ("bus.jpg", bus_bytes, "image/jpeg")}
        )
        data = res.json()
        passed = res.status_code == 200 and data.get("success") is True and data.get("total_objects", 0) > 0
        detected_record_id = data.get("record_id")
        record(
            "5. Real YOLOv8 Inference (/api/detect)",
            passed,
            f"Detected {data.get('total_objects')} objects in {data.get('inference_time_ms')} ms. Classes: {data.get('class_counts')}"
        )
    except Exception as e:
        record("5. Real YOLOv8 Inference (/api/detect)", False, str(e))

    # 6. Verify Object Counting, Confidences and Bounding Boxes
    try:
        objects = data.get("objects", [])
        has_boxes = len(objects) >= 4  # bus.jpg has 4 people and 1 bus
        valid_coords = all(
            obj["box"]["x1"] < obj["box"]["x2"] and obj["box"]["y1"] < obj["box"]["y2"]
            for obj in objects
        )
        valid_conf = all(0.35 <= obj["confidence"] <= 1.0 for obj in objects)
        passed = has_boxes and valid_coords and valid_conf
        classes_found = [f"{o['class_name']} ({o['confidence_percent']}%)" for o in objects[:4]]
        record(
            "6. Object Counting & BBox Verification",
            passed,
            f"Found {len(objects)} objects. Sample: {classes_found}. Valid coordinates & dimensions: {valid_coords}"
        )
    except Exception as e:
        record("6. Object Counting & BBox Verification", False, str(e))

    # 7. Category Filtering Verification (Only 'bus')
    try:
        res_filter = client.post(
            "/api/detect?confidence=0.35&categories=bus",
            files={"file": ("bus.jpg", bus_bytes, "image/jpeg")}
        )
        filter_data = res_filter.json()
        filter_objs = filter_data.get("objects", [])
        only_bus = all(o["class_name"] == "bus" for o in filter_objs) and len(filter_objs) >= 1
        record(
            "7. Category Filtering (Filter: 'bus')",
            only_bus,
            f"Total filtered objects: {len(filter_objs)}, All are 'bus': {only_bus}"
        )
    except Exception as e:
        record("7. Category Filtering", False, str(e))

    # 8. Annotated Image Base64 & OpenCV Decode Verification
    try:
        b64_img = data.get("annotated_image_base64", "")
        header, encoded = b64_img.split(",", 1)
        raw_img = base64.b64decode(encoded)
        np_arr = np.frombuffer(raw_img, np.uint8)
        decoded = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        h, w, c = decoded.shape
        passed = decoded is not None and h > 0 and w > 0 and c == 3
        record(
            "8. Annotated Image Rendering & Base64",
            passed,
            f"Rendered image successfully decoded via OpenCV. Dimensions: {w}x{h}x{c}"
        )
    except Exception as e:
        record("8. Annotated Image Rendering", False, str(e))

    # 9. CSV and JSON Reports Export Verification
    try:
        # CSV Export
        csv_res = client.get(f"/api/export/csv/{detected_record_id}")
        csv_passed = csv_res.status_code == 200 and "bus.jpg" in csv_res.text and "person" in csv_res.text

        # JSON Export
        json_res = client.get(f"/api/export/json/{detected_record_id}")
        json_data = json_res.json()
        json_passed = json_res.status_code == 200 and json_data.get("filename") == "bus.jpg"

        record(
            "9. Export System (CSV & JSON Reports)",
            csv_passed and json_passed,
            f"CSV: {len(csv_res.text)} bytes, Content-Disposition: {csv_res.headers.get('content-disposition')}. JSON parsed: {json_passed}"
        )
    except Exception as e:
        record("9. Export System", False, str(e))

    # 10. SQLite Detection History & Analytics
    try:
        hist_res = client.get("/api/history?limit=10")
        hist_data = hist_res.json()
        has_history = hist_res.status_code == 200 and len(hist_data) >= 1

        analytics_res = client.get("/api/analytics")
        analytics_data = analytics_res.json()
        has_analytics = (
            analytics_res.status_code == 200
            and analytics_data.get("total_scans", 0) >= 1
            and analytics_data.get("total_objects_detected", 0) >= 1
            and len(analytics_data.get("top_classes", [])) >= 1
        )

        record(
            "10. SQLite History & Analytics",
            has_history and has_analytics,
            f"Total scans logged: {analytics_data.get('total_scans')}, Total objects: {analytics_data.get('total_objects_detected')}, Top class: {analytics_data.get('top_classes', [{}])[0].get('class_name')}"
        )
    except Exception as e:
        record("10. SQLite History & Analytics", False, str(e))

    print("=" * 65)
    total_passed = sum(1 for r in TEST_RESULTS if r["passed"])
    print(f"Summary: {total_passed} / {len(TEST_RESULTS)} tests passed ({total_passed/len(TEST_RESULTS)*100:.1f}%)")
    print("=" * 65)

    if total_passed == len(TEST_RESULTS):
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == "__main__":
    run_all_tests()
