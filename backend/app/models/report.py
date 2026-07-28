from app.models.base import Base
from sqlalchemy import Column, String, Float, JSON, Enum, ForeignKey, Integer
import uuid
import enum

class ReportStatus(str, enum.Enum):
    pending = "pending"
    processing = "processing"
    completed = "completed"
    failed = "failed"

class Report(Base):
    __tablename__ = "reports"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    video_id = Column(String, ForeignKey("videos.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    authenticity_score = Column(Float, nullable=True)
    ai_percentage = Column(Float, nullable=True)
    confidence_score = Column(Float, nullable=True)
    status = Column(Enum(ReportStatus), default=ReportStatus.pending)
    pdf_path = Column(String, nullable=True)
    processing_time = Column(Float, nullable=True)
    suspicious_segments = Column(JSON, nullable=True)
    frame_analysis = Column(JSON, nullable=True)
    frame_count = Column(Integer, nullable=True)
