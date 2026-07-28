from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
from app.schemas.auth import RegisterRequest, LoginRequest
from app.models.user import User
from app.core.security import get_password_hash, verify_password, create_access_token, create_refresh_token, verify_token
from app.repositories import user_repository

async def register_user(db: AsyncSession, request: RegisterRequest):
    existing_user = await user_repository.get_user_by_email(db, request.email)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    user = User(
        email=request.email,
        name=request.name,
        hashed_password=get_password_hash(request.password)
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    
    return {
        "access_token": create_access_token({"sub": user.id}),
        "refresh_token": create_refresh_token({"sub": user.id})
    }

async def login_user(db: AsyncSession, request: LoginRequest):
    user = await user_repository.get_user_by_email(db, request.email)
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    return {
        "access_token": create_access_token({"sub": user.id}),
        "refresh_token": create_refresh_token({"sub": user.id})
    }

async def refresh_token(refresh_token: str):
    payload = verify_token(refresh_token)
    if not payload or not payload.get("sub"):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
    
    user_id = payload.get("sub")
    return {
        "access_token": create_access_token({"sub": user_id}),
        "refresh_token": create_refresh_token({"sub": user_id})
    }
