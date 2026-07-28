from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import UploadFile, HTTPException
import os
import shutil
import uuid
from app.core.config import settings
from app.models.video import Video, VideoStatus
from app.models.report import Report, ReportStatus
from app.models.user import User
from app.repositories import video_repository, report_repository
from app.pipeline.detection_pipeline import DetectionPipeline

async def upload_video(db: AsyncSession, current_user: User, file: UploadFile, title: str, description: str):
    filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(settings.UPLOAD_DIR, filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    video = Video(
        user_id=current_user.id,
        title=title,
        description=description,
        file_path=file_path,
        status=VideoStatus.processing
    )
    db.add(video)
    await db.commit()
    await db.refresh(video)
    
    # Run pipeline
    pipeline = DetectionPipeline()
    results = pipeline.run(file_path)
    
    video.status = VideoStatus.completed
    video.authenticity_score = results['authenticity_score']
    video.ai_percentage = results['ai_percentage']
    video.confidence_score = results['confidence_score']
    video.processing_time = results['processing_time']
    db.add(video)
    
    report = Report(
        video_id=video.id,
        user_id=current_user.id,
        authenticity_score=results['authenticity_score'],
        ai_percentage=results['ai_percentage'],
        confidence_score=results['confidence_score'],
        status=ReportStatus.completed,
        processing_time=results['processing_time'],
        suspicious_segments=results.get('timeline', []),
        frame_analysis=results.get('frame_analysis', []),
        frame_count=results['frame_count']
    )
    db.add(report)
    await db.commit()
    await db.refresh(video)
    return video

async def get_videos(db: AsyncSession, user_id: str):
    return await video_repository.get_user_videos(db, user_id)

async def get_video(db: AsyncSession, video_id: str, user_id: str):
    video = await video_repository.get_video_by_id(db, video_id)
    if not video or video.user_id != user_id:
        raise HTTPException(status_code=404, detail="Video not found")
    return video

async def delete_video(db: AsyncSession, video_id: str, user_id: str):
    video = await get_video(db, video_id, user_id)
    if os.path.exists(video.file_path):
        os.remove(video.file_path)
    await video_repository.delete_video(db, video)
