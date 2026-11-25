from fastapi import APIRouter, HTTPException, Response, status
from fastapi.responses import PlainTextResponse

from app.services.history_service import HistoryService
from app.services.report_service import ReportService

router = APIRouter(prefix="/export", tags=["Reports & Export"])


@router.get("/csv/{record_id}")
async def export_csv_report(record_id: int):
    """Generates downloadable CSV report for a specific detection scan."""
    record = await HistoryService.get_by_id(record_id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Detection record with ID {record_id} not found."
        )

    csv_data = ReportService.generate_csv(record.model_dump())
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={
            "Content-Disposition": f'attachment; filename="detection_report_{record_id}_{record.filename}.csv"'
        }
    )


@router.get("/json/{record_id}")
async def export_json_report(record_id: int):
    """Generates downloadable formatted JSON report for a specific detection scan."""
    record = await HistoryService.get_by_id(record_id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Detection record with ID {record_id} not found."
        )

    json_data = ReportService.generate_json(record.model_dump())
    return Response(
        content=json_data,
        media_type="application/json",
        headers={
            "Content-Disposition": f'attachment; filename="detection_report_{record_id}_{record.filename}.json"'
        }
    )
