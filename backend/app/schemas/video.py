from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.video import VideoStatus

class VideoUpload(BaseModel):
    title: str
    description: Optional[str] = None

class VideoResponse(BaseModel):
    id: str
    user_id: str
    title: str
    description: Optional[str] = None
    status: VideoStatus
    file_path: str
    authenticity_score: Optional[float] = None
    ai_percentage: Optional[float] = None
    confidence_score: Optional[float] = None
    created_at: datetime

    model_config = {"from_attributes": True}

class VideoListResponse(VideoResponse):
    pass
