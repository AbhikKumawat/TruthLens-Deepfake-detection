from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.security import get_current_user
from app.models.user import User
from sqlalchemy import select, func
from app.models.video import Video

router = APIRouter()

@router.get("/stats")
async def get_stats(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(func.count(Video.id)).where(Video.user_id == current_user.id))
    total_videos = result.scalar() or 0
    
    result = await db.execute(select(func.count(Video.id)).where(Video.user_id == current_user.id, Video.authenticity_score > 80))
    verified_videos = result.scalar() or 0
    
    result = await db.execute(select(func.count(Video.id)).where(Video.user_id == current_user.id, Video.ai_percentage > 50))
    ai_detected = result.scalar() or 0
    
    result = await db.execute(select(func.count(Video.id)).where(Video.user_id == current_user.id, Video.status == 'pending'))
    pending = result.scalar() or 0
    
    result = await db.execute(select(func.avg(Video.authenticity_score)).where(Video.user_id == current_user.id))
    avg_authenticity_score = result.scalar() or 0.0

    return {
        "total_videos": total_videos,
        "verified_videos": verified_videos,
        "ai_detected": ai_detected,
        "pending": pending,
        "avg_authenticity_score": round(avg_authenticity_score, 2)
    }
