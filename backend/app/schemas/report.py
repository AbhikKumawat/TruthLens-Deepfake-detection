from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.report import ReportStatus

class ReportResponse(BaseModel):
    id: str
    video_id: str
    user_id: str
    authenticity_score: Optional[float] = None
    ai_percentage: Optional[float] = None
    confidence_score: Optional[float] = None
    status: ReportStatus
    processing_time: Optional[float] = None
    suspicious_segments: Optional[List[Dict[str, Any]]] = None
    frame_analysis: Optional[List[Dict[str, Any]]] = None
    frame_count: Optional[int] = None
    created_at: datetime

    model_config = {"from_attributes": True}

class ReportListResponse(ReportResponse):
    pass
