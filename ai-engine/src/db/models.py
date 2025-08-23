from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.db.db import Base

class User(Base):
    __tablename__ = "User"

    id = Column(String, primary_key=True, index=True)
    clerk_id = Column(String, unique=True, nullable=False)
    email = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    notes = relationship("Note", back_populates="user")

class Note(Base):
    __tablename__ = "Note"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(JSON, nullable=True)
    userId = Column(String, ForeignKey("User.id"), nullable=False)
    pinned = Column(Boolean, default=False)
    tags = Column(ARRAY(String), nullable=True)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    updatedAt = Column(DateTime(timezone=True), onupdate=func.now())
    user = relationship("User", back_populates="notes")

