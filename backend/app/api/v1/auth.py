from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse, RefreshRequest
from app.services import auth_service
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    return await auth_service.register_user(db, request)

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    return await auth_service.login_user(db, request)

@router.post("/refresh", response_model=TokenResponse)
async def refresh(request: RefreshRequest):
    return await auth_service.refresh_token(request.refresh_token)

@router.post("/logout")
async def logout(current_user: User = Depends(get_current_user)):
    return {"msg": "Logged out successfully"}
