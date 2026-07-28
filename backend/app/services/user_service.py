from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.user import UserUpdate
from app.models.user import User
from app.repositories import user_repository

async def get_user(db: AsyncSession, user_id: str) -> User:
    return await user_repository.get_user_by_id(db, user_id)

async def update_user(db: AsyncSession, user: User, user_update: UserUpdate) -> User:
    if user_update.name is not None:
        user.name = user_update.name
    if user_update.avatar_url is not None:
        user.avatar_url = user_update.avatar_url
    
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user
