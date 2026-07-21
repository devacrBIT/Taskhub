from fastapi import APIRouter, HTTPException
from ..models import (
    TaskCreate,
    Task,
    TaskUpdate
    )
from ..crud import (
    get_tasks,
    get_task,
    create_task,
    update_task,
    delete_task
)
from typing import Optional

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("/", response_model=list[Task])
def list_tasks(
    completed: Optional[bool] = None,
    priority: Optional[str] = None
):
    return get_tasks(
        completed,
        priority
    )

@router.get("/{task_id}", response_model=Task)
def task_by_id(task_id: int):
    task = get_task(task_id)

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )
    return task

@router.post("/add-task")
def add_task(task: TaskCreate):
    task_id = create_task(
        task.title,
        task.description,
        task.deadline,
        task.priority.value
    )
    return {"id": task_id}

@router.patch("/{task_id}", response_model=Task)
def patch_task(task_id: int, task: TaskUpdate):
    updated = update_task(
        task_id,
        task.model_dump()
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return updated

@router.delete("/{task_id}")
def remove_task(task_id: int):
    deleted = delete_task(task_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return {
        "message": "Task deleted"
    }