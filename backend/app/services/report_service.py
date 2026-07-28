from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException
from fastapi.responses import HTMLResponse, Response
from app.repositories import report_repository, video_repository
from app.models.report import Report
from app.models.video import Video, VideoStatus
from app.ai.pdf_generator import PDFGenerator
import json

async def get_reports(db: AsyncSession, user_id: str):
    return await report_repository.get_user_reports(db, user_id)

async def get_report(db: AsyncSession, identifier: str, user_id: str):
    # Try finding by report_id first
    report = await report_repository.get_report_by_id(db, identifier)
    if not report:
        # Try finding by video_id
        result = await db.execute(select(Report).where(Report.video_id == identifier))
        report = result.scalar_one_or_none()
        
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
        
    return report

async def download_report_file(db: AsyncSession, identifier: str, user_id: str):
    report = await get_report(db, identifier, user_id)
    video = await video_repository.get_video_by_id(db, report.video_id)
    
    report_dict = {
        'id': report.id,
        'title': video.title if video else 'Analyzed Video',
        'authenticity_score': report.authenticity_score,
        'ai_percentage': report.ai_percentage,
        'confidence_score': report.confidence_score,
        'processing_time': report.processing_time,
        'frame_count': report.frame_count,
        'suspicious_segments': report.suspicious_segments or [],
        'timeline': [{'time': s.get('time', '0:00'), 'status': s.get('status', 'Clean'), 'details': s.get('details', '')} for s in (report.suspicious_segments or [])] or [{'time': '0:00 - End', 'status': 'Clean'}]
    }
    
    generator = PDFGenerator()
    html_content = generator.generate(report_dict)
    
    return HTMLResponse(
        content=html_content,
        headers={"Content-Disposition": f"attachment; filename=truthlens_report_{report.id}.html"}
    )

async def execute_report_action(db: AsyncSession, identifier: str, action: str, user_id: str):
    report = await get_report(db, identifier, user_id)
    video = await video_repository.get_video_by_id(db, report.video_id)
    
    if not video:
        raise HTTPException(status_code=404, detail="Associated video not found")
        
    if action == "remove":
        await video_repository.delete_video(db, video)
        return {"status": "success", "action": "removed", "message": "Video permanently deleted."}
        
    elif action == "label_ai":
        video.status = VideoStatus.labeled_ai
        db.add(video)
        await db.commit()
        return {"status": "success", "action": "labeled_ai", "message": "Video marked and labeled as AI Generated."}
        
    elif action == "submit_moderator":
        video.status = VideoStatus.flagged
        db.add(video)
        await db.commit()
        return {"status": "success", "action": "submitted_moderator", "message": "Video submitted to moderation queue."}
        
    elif action == "publish":
        video.status = VideoStatus.published
        db.add(video)
        await db.commit()
        return {"status": "success", "action": "published", "message": "Video published successfully."}
        
    else:
        raise HTTPException(status_code=400, detail="Invalid post-detection action specified.")
