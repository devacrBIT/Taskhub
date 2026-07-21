import sqlite3
from pathlib import Path


DATA_DIR = Path("data")

DATA_DIR.mkdir(
    exist_ok=True
)


DB_NAME = DATA_DIR / "tasks.db"


def get_connection():

    conn = sqlite3.connect(DB_NAME)

    conn.row_factory = sqlite3.Row  # Return rows like dictionaries

    return conn



def init_db():

    conn = get_connection()

    cursor = conn.cursor()


    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            completed INTEGER DEFAULT 0,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            deadline TEXT,
            priority TEXT DEFAULT 'LOW'
        )
    """)


    conn.commit()

    conn.close()
