import json
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
import aiosqlite

from app.config import settings
from app.models import HistoryItem, DetectedObject, AnalyticsResponse


class HistoryService:
    @staticmethod
    async def save_detection(
        filename: str,
        image_width: int,
        image_height: int,
        confidence_threshold: float,
        total_objects: int,
        inference_time_ms: float,
        class_counts: Dict[str, int],
        objects: List[DetectedObject],
        annotated_image_path: Optional[str] = None
    ) -> int:
        """Saves a detection scan to SQLite database and returns the record ID."""
        now_iso = datetime.now(timezone.utc).isoformat()
        class_counts_json = json.dumps(class_counts)
        detections_json = json.dumps([obj.model_dump() for obj in objects])

        async with aiosqlite.connect(str(settings.DB_PATH)) as db:
            cursor = await db.execute(
                """
                INSERT INTO detections (
                    timestamp, filename, image_width, image_height,
                    confidence_threshold, total_objects, inference_time_ms,
                    class_counts, detections_json, annotated_image_path
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    now_iso, filename, image_width, image_height,
                    confidence_threshold, total_objects, inference_time_ms,
                    class_counts_json, detections_json, annotated_image_path
                )
            )
            await db.commit()
            return cursor.lastrowid

    @staticmethod
    async def get_history(limit: int = 50, offset: int = 0) -> List[HistoryItem]:
        """Returns paginated history records ordered by newest first."""
        async with aiosqlite.connect(str(settings.DB_PATH)) as db:
            db.row_factory = aiosqlite.Row
            async with db.execute(
                """
                SELECT id, timestamp, filename, image_width, image_height,
                       confidence_threshold, total_objects, inference_time_ms,
                       class_counts, detections_json, annotated_image_path
                FROM detections
                ORDER BY id DESC
                LIMIT ? OFFSET ?
                """,
                (limit, offset)
            ) as cursor:
                rows = await cursor.fetchall()

        history: List[HistoryItem] = []
        for r in rows:
            class_counts = json.loads(r["class_counts"])
            raw_objects = json.loads(r["detections_json"])
            objects = [DetectedObject(**item) for item in raw_objects]
            history.append(
                HistoryItem(
                    id=r["id"],
                    timestamp=r["timestamp"],
                    filename=r["filename"],
                    image_width=r["image_width"],
                    image_height=r["image_height"],
                    confidence_threshold=r["confidence_threshold"],
                    total_objects=r["total_objects"],
                    inference_time_ms=r["inference_time_ms"],
                    class_counts=class_counts,
                    detections=objects,
                    annotated_image_url=r["annotated_image_path"]
                )
            )
        return history

    @staticmethod
    async def get_by_id(record_id: int) -> Optional[HistoryItem]:
        """Fetch single history record by ID."""
        async with aiosqlite.connect(str(settings.DB_PATH)) as db:
            db.row_factory = aiosqlite.Row
            async with db.execute(
                """
                SELECT id, timestamp, filename, image_width, image_height,
                       confidence_threshold, total_objects, inference_time_ms,
                       class_counts, detections_json, annotated_image_path
                FROM detections
                WHERE id = ?
                """,
                (record_id,)
            ) as cursor:
                r = await cursor.fetchone()
                if not r:
                    return None

        class_counts = json.loads(r["class_counts"])
        raw_objects = json.loads(r["detections_json"])
        objects = [DetectedObject(**item) for item in raw_objects]
        return HistoryItem(
            id=r["id"],
            timestamp=r["timestamp"],
            filename=r["filename"],
            image_width=r["image_width"],
            image_height=r["image_height"],
            confidence_threshold=r["confidence_threshold"],
            total_objects=r["total_objects"],
            inference_time_ms=r["inference_time_ms"],
            class_counts=class_counts,
            detections=objects,
            annotated_image_url=r["annotated_image_path"]
        )

    @staticmethod
    async def delete_by_id(record_id: int) -> bool:
        """Deletes a record by ID."""
        async with aiosqlite.connect(str(settings.DB_PATH)) as db:
            cursor = await db.execute("DELETE FROM detections WHERE id = ?", (record_id,))
            await db.commit()
            return cursor.rowcount > 0

    @staticmethod
    async def clear_all() -> int:
        """Clears all detection records."""
        async with aiosqlite.connect(str(settings.DB_PATH)) as db:
            cursor = await db.execute("DELETE FROM detections")
            await db.commit()
            return cursor.rowcount

    @staticmethod
    async def get_analytics() -> AnalyticsResponse:
        """Computes aggregate analytics over all historical scans."""
        async with aiosqlite.connect(str(settings.DB_PATH)) as db:
            db.row_factory = aiosqlite.Row
            # Summary totals
            async with db.execute(
                """
                SELECT COUNT(*) as total_scans,
                       COALESCE(SUM(total_objects), 0) as total_objects,
                       COALESCE(AVG(inference_time_ms), 0.0) as avg_inference
                FROM detections
                """
            ) as cursor:
                summary = await cursor.fetchone()

            # Class counts across all records
            async with db.execute("SELECT class_counts FROM detections") as cursor:
                rows = await cursor.fetchall()

            # Recent scans for activity graph
            async with db.execute(
                """
                SELECT id, timestamp, filename, total_objects, inference_time_ms
                FROM detections
                ORDER BY id DESC
                LIMIT 10
                """
            ) as cursor:
                recent_rows = await cursor.fetchall()

        total_scans = summary["total_scans"] if summary else 0
        total_objects = summary["total_objects"] if summary else 0
        avg_inference = round(summary["avg_inference"], 2) if summary else 0.0

        aggregated_classes: Dict[str, int] = {}
        for r in rows:
            counts = json.loads(r["class_counts"])
            for cls_name, cnt in counts.items():
                aggregated_classes[cls_name] = aggregated_classes.get(cls_name, 0) + cnt

        # Top classes sorted by frequency
        sorted_classes = sorted(aggregated_classes.items(), key=lambda x: x[1], reverse=True)
        top_classes = [{"class_name": k, "count": v} for k, v in sorted_classes[:10]]

        recent_activity = [
            {
                "id": r["id"],
                "timestamp": r["timestamp"],
                "filename": r["filename"],
                "total_objects": r["total_objects"],
                "inference_time_ms": round(r["inference_time_ms"], 1)
            }
            for r in recent_rows
        ]

        return AnalyticsResponse(
            total_scans=total_scans,
            total_objects_detected=total_objects,
            average_inference_time_ms=avg_inference,
            top_classes=top_classes,
            recent_activity=recent_activity
        )
