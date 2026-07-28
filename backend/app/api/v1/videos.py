from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.schemas.video import VideoResponse, VideoListResponse
from app.services import video_service
from app.core.security import get_current_user
from app.models.user import User
from typing import List

router = APIRouter()

@router.post("/upload", response_model=VideoResponse)
async def upload_video(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await video_service.upload_video(db, current_user, file, title, description)

@router.get("/", response_model=List[VideoListResponse])
async def list_videos(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await video_service.get_videos(db, current_user.id)

@router.get("/{video_id}", response_model=VideoResponse)
async def get_video(video_id: str, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await video_service.get_video(db, video_id, current_user.id)

@router.delete("/{video_id}")
async def delete_video(video_id: str, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    await video_service.delete_video(db, video_id, current_user.id)
    return {"msg": "Video deleted successfully"}
