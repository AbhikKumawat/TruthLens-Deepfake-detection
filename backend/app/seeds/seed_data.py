from sqlalchemy import select
from app.database.connection import AsyncSessionLocal
from app.models.user import User, RoleEnum
from app.models.video import Video, VideoStatus
from app.models.report import Report, ReportStatus
from app.core.security import get_password_hash
import random

async def seed_database():
    async with AsyncSessionLocal() as session:
        # Check if users exist
        result = await session.execute(select(User))
        if result.scalars().first():
            return # Already seeded

        # Create Users
        users = [
            User(email="admin@truthlens.ai", name="Admin", hashed_password=get_password_hash("Password123!"), role=RoleEnum.admin),
            User(email="mod@truthlens.ai", name="Moderator", hashed_password=get_password_hash("Password123!"), role=RoleEnum.moderator),
            User(email="user@truthlens.ai", name="User", hashed_password=get_password_hash("Password123!"), role=RoleEnum.user)
        ]
        session.add_all(users)
        await session.commit()
        
        # Create Videos & Reports for the regular user
        user = users[2]
        
        for i in range(5):
            auth_score = random.uniform(60.0, 99.0)
            ai_perc = random.uniform(1.0, 40.0)
            conf_score = random.uniform(70.0, 99.0)
            
            video = Video(
                user_id=user.id,
                title=f"Sample Video {i+1}",
                description="A sample video for testing",
                file_path=f"uploads/sample_{i+1}.mp4",
                status=VideoStatus.completed,
                authenticity_score=auth_score,
                ai_percentage=ai_perc,
                confidence_score=conf_score,
                processing_time=random.uniform(2.0, 15.0)
            )
            session.add(video)
            await session.commit()
            await session.refresh(video)
            
            report = Report(
                video_id=video.id,
                user_id=user.id,
                authenticity_score=auth_score,
                ai_percentage=ai_perc,
                confidence_score=conf_score,
                status=ReportStatus.completed,
                processing_time=video.processing_time,
                suspicious_segments=[],
                frame_count=random.randint(100, 3000)
            )
            session.add(report)
            await session.commit()
