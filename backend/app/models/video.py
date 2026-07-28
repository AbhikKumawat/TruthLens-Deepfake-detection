from app.models.base import Base
from sqlalchemy import Column, String, Float, JSON, Enum, ForeignKey
import uuid
import enum

class VideoStatus(str, enum.Enum):
    pending = "pending"
    processing = "processing"
    completed = "completed"
    rejected = "rejected"
    labeled_ai = "labeled_ai"
    flagged = "flagged"
    published = "published"

class Video(Base):
    __tablename__ = "videos"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    tags = Column(JSON, nullable=True)
    category = Column(String, nullable=True)
    status = Column(Enum(VideoStatus), default=VideoStatus.pending)
    file_path = Column(String, nullable=False)
    thumbnail_path = Column(String, nullable=True)
    visibility = Column(String, nullable=True)
    platforms = Column(JSON, nullable=True)
    authenticity_score = Column(Float, nullable=True)
    ai_percentage = Column(Float, nullable=True)
    confidence_score = Column(Float, nullable=True)
    processing_time = Column(Float, nullable=True)
