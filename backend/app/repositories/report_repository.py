from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.report import Report

async def get_user_reports(db: AsyncSession, user_id: str):
    result = await db.execute(select(Report).where(Report.user_id == user_id))
    return result.scalars().all()

async def get_report_by_id(db: AsyncSession, report_id: str) -> Report | None:
    result = await db.execute(select(Report).where(Report.id == report_id))
    return result.scalar_one_or_none()
