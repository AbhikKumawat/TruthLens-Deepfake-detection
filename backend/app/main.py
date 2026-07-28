from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, users, videos, reports, dashboard
from app.core.config import settings
from app.database.connection import create_all_tables
from app.seeds.seed_data import seed_database
import os

app = FastAPI(
    title=settings.APP_NAME,
    description="AI Video Authenticity & Deepfake Detection SaaS platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(videos.router, prefix="/api/v1/videos", tags=["videos"])
app.include_router(reports.router, prefix="/api/v1/reports", tags=["reports"])
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["dashboard"])

@app.on_event("startup")
async def startup_event():
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    os.makedirs(settings.REPORTS_DIR, exist_ok=True)
    await create_all_tables()
    try:
        await seed_database()
    except Exception as e:
        print(f"Seeding skipped or failed: {e}")

@app.get("/health")
def health_check():
    return {"status": "ok", "app": settings.APP_NAME}
