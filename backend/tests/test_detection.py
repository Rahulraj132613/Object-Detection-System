import io
import pytest
from PIL import Image, ImageDraw
from fastapi.testclient import TestClient

from app.main import app
from app.services.yolo_service import yolo_service


def create_test_image_bytes(width=640, height=480, draw_shapes=True) -> bytes:
    """Creates a real in-memory JPEG test image."""
    image = Image.new("RGB", (width, height), color=(30, 30, 40))
    if draw_shapes:
        draw = ImageDraw.Draw(image)
        # Draw some colored shapes
        draw.rectangle([50, 50, 200, 300], fill=(220, 50, 50), outline=(255, 255, 255), width=2)
        draw.ellipse([300, 100, 500, 350], fill=(50, 180, 50), outline=(255, 255, 255), width=2)
    buf = io.BytesIO()
    image.save(buf, format="JPEG", quality=90)
    return buf.getvalue()


def test_health_endpoint():
    """Verify backend health endpoint."""
    with TestClient(app) as client:
        response = client.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "yolo_model" in data


def test_supported_classes():
    """Verify YOLO model loads and provides standard COCO classes."""
    classes = yolo_service.get_supported_classes()
    assert isinstance(classes, dict)
    assert len(classes) == 80  # Standard COCO 80 categories
    assert 0 in classes
    assert classes[0] == "person"


def test_yolo_inference_real_image():
    """Verify real YOLO inference and image annotation without errors."""
    img_bytes = create_test_image_bytes()
    res = yolo_service.detect_objects(
        image_bytes=img_bytes,
        filename="test_scan.jpg",
        confidence_threshold=0.25
    )

    assert res.success is True
    assert res.filename == "test_scan.jpg"
    assert res.image_width == 640
    assert res.image_height == 480
    assert res.inference_time_ms > 0
    assert isinstance(res.total_objects, int)
    assert isinstance(res.class_counts, dict)
    assert isinstance(res.objects, list)
    assert res.annotated_image_base64 is not None
    assert res.annotated_image_base64.startswith("data:image/jpeg;base64,")


def test_api_detect_endpoint():
    """Verify /api/detect multipart file upload endpoint."""
    img_bytes = create_test_image_bytes()
    with TestClient(app) as client:
        response = client.post(
            "/api/detect?confidence=0.30",
            files={"file": ("sample.jpg", img_bytes, "image/jpeg")}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["filename"] == "sample.jpg"
        assert "total_objects" in data
        assert "annotated_image_base64" in data
