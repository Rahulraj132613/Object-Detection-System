from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.database import init_db
from app.routes.detection import router as detection_router
from app.routes.history import router as history_router
from app.routes.analytics import router as analytics_router
from app.routes.export import router as export_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite tables on startup
    await init_db()
    # Preload YOLO model into memory
    from app.services.yolo_service import yolo_service
    _ = yolo_service.model
    yield


app = FastAPI(
    title="AI Object Detection & Recognition System API",
    description="Production-grade object detection backend powered by Ultralytics YOLOv8, OpenCV, and SQLite.",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS for Next.js frontend and production domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded & annotated images statically
app.mount("/static/annotated", StaticFiles(directory=str(settings.ANNOTATED_DIR)), name="annotated")


@app.get("/api/health", tags=["Health"])
async def health_check():
    """Health check endpoint for Render service monitoring."""
    return {
        "status": "healthy",
        "service": "AI Object Detection & Recognition API",
        "yolo_model": settings.YOLO_MODEL,
        "database": "connected"
    }


# Include route modules under /api prefix
app.include_router(detection_router, prefix="/api")
app.include_router(history_router, prefix="/api")
app.include_router(analytics_router, prefix="/api")
app.include_router(export_router, prefix="/api")
