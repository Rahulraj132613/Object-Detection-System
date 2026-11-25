import aiosqlite
from app.config import settings

CREATE_TABLES_SQL = """
CREATE TABLE IF NOT EXISTS detections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    filename TEXT NOT NULL,
    image_width INTEGER NOT NULL,
    image_height INTEGER NOT NULL,
    confidence_threshold REAL NOT NULL,
    total_objects INTEGER NOT NULL,
    inference_time_ms REAL NOT NULL,
    class_counts TEXT NOT NULL,
    detections_json TEXT NOT NULL,
    annotated_image_path TEXT
);
CREATE INDEX IF NOT EXISTS idx_detections_timestamp ON detections(timestamp DESC);
"""


async def init_db():
    async with aiosqlite.connect(str(settings.DB_PATH)) as db:
        await db.executescript(CREATE_TABLES_SQL)
        await db.commit()


async def get_db():
    async with aiosqlite.connect(str(settings.DB_PATH)) as db:
        db.row_factory = aiosqlite.Row
        yield db
