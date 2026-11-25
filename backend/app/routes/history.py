from typing import List
from fastapi import APIRouter, HTTPException, Query, status

from app.services.history_service import HistoryService
from app.models import HistoryItem

router = APIRouter(prefix="/history", tags=["Detection History"])


@router.get("", response_model=List[HistoryItem])
async def list_history(
    limit: int = Query(50, ge=1, le=200, description="Number of records to fetch"),
    offset: int = Query(0, ge=0, description="Offset for pagination")
):
    """Fetches paginated list of detection scans from SQLite."""
    return await HistoryService.get_history(limit=limit, offset=offset)


@router.get("/{record_id}", response_model=HistoryItem)
async def get_history_record(record_id: int):
    """Fetches a single detection record by its database ID."""
    record = await HistoryService.get_by_id(record_id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Detection record with ID {record_id} not found."
        )
    return record


@router.delete("/{record_id}")
async def delete_history_record(record_id: int):
    """Deletes a single detection record by ID."""
    deleted = await HistoryService.delete_by_id(record_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Detection record with ID {record_id} not found."
        )
    return {"success": True, "message": f"Record {record_id} deleted."}


@router.delete("")
async def clear_all_history():
    """Clears all detection records from SQLite."""
    count = await HistoryService.clear_all()
    return {"success": True, "deleted_count": count}
