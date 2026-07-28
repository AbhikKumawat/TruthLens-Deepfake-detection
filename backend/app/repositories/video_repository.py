from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.video import Video

async def get_user_videos(db: AsyncSession, user_id: str):
    result = await db.execute(select(Video).where(Video.user_id == user_id))
    return result.scalars().all()

async def get_video_by_id(db: AsyncSession, video_id: str) -> Video | None:
    result = await db.execute(select(Video).where(Video.id == video_id))
    return result.scalar_one_or_none()

async def delete_video(db: AsyncSession, video: Video):
    await db.delete(video)
    await db.commit()
