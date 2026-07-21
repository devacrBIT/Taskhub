from .database import get_connection

def create_task(title, description, deadline, priority):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO tasks(title, description, deadline, priority, completed)
        VALUES (?, ?, ?, ?, 0)
        """,
        (title, description, deadline, priority)
    )

    conn.commit()
    task_id = cur.lastrowid
    conn.close()

    return task_id

def get_tasks(completed=None, priority=None):
    conn = get_connection()
    cursor = conn.cursor()

    query = """
        SELECT id, title, description, completed,
               created_at, deadline, priority
        FROM tasks
        WHERE 1=1
    """

    params = []

    if completed is not None:
        query += " AND completed = ?"
        params.append(int(completed))

    if priority:
        query += " AND priority = ?"
        params.append(priority)

    query += " ORDER BY created_at DESC"

    cursor.execute(query, params)

    tasks = []

    for row in cursor.fetchall():
        task = dict(row)
        task["completed"] = bool(task["completed"])
        tasks.append(task)

    conn.close()

    return tasks

def get_task(task_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM tasks WHERE id = ?",
        (task_id,)
    )

    task = cursor.fetchone()

    conn.close()

    return dict(task) if task else None

def update_task(task_id, data):
    conn = get_connection()
    cursor = conn.cursor()

    fields = []
    values = []

    for key, value in data.items():
        if value is not None:
            fields.append(f"{key} = ?")
            values.append(value)

    if not fields:
        return None

    values.append(task_id)

    query = f"""
        UPDATE tasks
        SET {", ".join(fields)}
        WHERE id = ?
    """

    cursor.execute(query, values)

    conn.commit()
    conn.close()

    return get_task(task_id)

def delete_task(task_id):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "DELETE FROM tasks WHERE id = ?",
        (task_id,)
    )

    deleted = cur.rowcount

    conn.commit()
    conn.close()

    return deleted > 0