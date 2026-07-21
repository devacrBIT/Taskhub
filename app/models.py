from pydantic import BaseModel
from typing import Optional
from enum import Enum
from datetime import date


class Priority(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: Optional[date] = None
    priority: Priority = Priority.MEDIUM


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[date] = None
    priority: Optional[Priority] = None
    completed: Optional[bool] = None


class Task(BaseModel):
    id: int
    title: str
    description: Optional[str]
    completed: bool
    created_at: str
    deadline: Optional[date]
    priority: Priority