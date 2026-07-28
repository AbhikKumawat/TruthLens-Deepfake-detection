from app.models.base import Base
from sqlalchemy import Column, String, Boolean, Enum
import uuid
import enum

class RoleEnum(str, enum.Enum):
    admin = "admin"
    moderator = "moderator"
    user = "user"

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.user)
    avatar_url = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
