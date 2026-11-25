from fastapi import APIRouter
from app.services.history_service import HistoryService
from app.models import AnalyticsResponse

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("", response_model=AnalyticsResponse)
async def get_analytics_summary():
    """
    Computes aggregate metrics across all scans:
    total scans, total objects identified, average latency, top classes, and activity log.
    """
    return await HistoryService.get_analytics()
