import pytest
from app.services.history_service import HistoryService
from app.services.report_service import ReportService
from app.database import init_db
from app.models import DetectedObject, BoundingBox


@pytest.mark.asyncio
async def test_database_history_crud_and_analytics():
    # Initialize DB
    await init_db()

    # Create dummy detected objects
    obj1 = DetectedObject(
        id=1,
        class_id=0,
        class_name="person",
        confidence=0.885,
        confidence_percent=88.5,
        box=BoundingBox(x1=10.0, y1=20.0, x2=100.0, y2=200.0, width=90.0, height=180.0),
        color="#00F5D4"
    )
    obj2 = DetectedObject(
        id=2,
        class_id=2,
        class_name="car",
        confidence=0.752,
        confidence_percent=75.2,
        box=BoundingBox(x1=150.0, y1=50.0, x2=350.0, y2=250.0, width=200.0, height=200.0),
        color="#7B2CBF"
    )

    # 1. Save detection
    record_id = await HistoryService.save_detection(
        filename="test_car_person.jpg",
        image_width=640,
        image_height=480,
        confidence_threshold=0.35,
        total_objects=2,
        inference_time_ms=45.2,
        class_counts={"person": 1, "car": 1},
        objects=[obj1, obj2],
        annotated_image_path="/static/annotated/test.jpg"
    )
    assert record_id is not None
    assert record_id > 0

    # 2. Retrieve record
    record = await HistoryService.get_by_id(record_id)
    assert record is not None
    assert record.filename == "test_car_person.jpg"
    assert record.total_objects == 2
    assert len(record.detections) == 2

    # 3. Test CSV and JSON report generation
    csv_report = ReportService.generate_csv(record.model_dump())
    assert "test_car_person.jpg" in csv_report
    assert "person" in csv_report
    assert "car" in csv_report

    json_report = ReportService.generate_json(record.model_dump())
    assert '"filename": "test_car_person.jpg"' in json_report

    # 4. Analytics
    analytics = await HistoryService.get_analytics()
    assert analytics.total_scans >= 1
    assert analytics.total_objects_detected >= 2
    assert len(analytics.top_classes) >= 1
