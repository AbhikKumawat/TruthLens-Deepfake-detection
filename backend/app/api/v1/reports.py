from fastapi import APIRouter, Depends, Body
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.schemas.report import ReportResponse, ReportListResponse
from app.services import report_service
from app.core.security import get_current_user
from app.models.user import User
from typing import List, Dict, Any

router = APIRouter()

@router.get("/", response_model=List[ReportListResponse])
async def list_reports(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await report_service.get_reports(db, current_user.id)

@router.get("/{report_id}", response_model=ReportResponse)
async def get_report(report_id: str, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await report_service.get_report(db, report_id, current_user.id)

@router.get("/{report_id}/download")
async def download_report(report_id: str, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await report_service.download_report_file(db, report_id, current_user.id)

@router.post("/{report_id}/action")
async def report_action(
    report_id: str, 
    payload: Dict[str, Any] = Body(...), 
    current_user: User = Depends(get_current_user), 
    db: AsyncSession = Depends(get_db)
):
    action = payload.get("action")
    return await report_service.execute_report_action(db, report_id, action, current_user.id)
