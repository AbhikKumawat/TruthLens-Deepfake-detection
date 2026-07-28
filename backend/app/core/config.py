from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite+aiosqlite:///./truthlens.db"
    SECRET_KEY: str = "supersecret"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    UPLOAD_DIR: str = "uploads"
    REPORTS_DIR: str = "reports"
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8080"]
    APP_NAME: str = "TruthLens"
    DEBUG: bool = False

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
