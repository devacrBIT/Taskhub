# Task Management App

A full-stack task management application built with:

* **Frontend:** React + Vite
* **Backend:** FastAPI
* **Database:** SQLite + SQLAlchemy
* **Server:** FastAPI serving the React production build

---

# Features

* Create, edit, delete, and complete tasks
* Task priority management
* Task sorting and filtering
* Deadline calendar
* Interactive calendar task view
* Theme customization
* Responsive design
* REST API backend
* Single-server deployment

---

# Project Structure

```text
Taskmgnt/
│
├── app/
│   ├── main.py
│   ├── database.py
│   └── routes/
│       └── tasks.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── dist/
│   └── package.json
│
├── requirements.txt
└── README.md
```

---

# Installation

## Requirements

Install:

* Python 3.10+
* Node.js 18+
* npm

Check versions:

```bash
python3 --version
```

```bash
node --version
```

```bash
npm --version
```

---

# Backend Installation

Clone the repository:

```bash
git clone https://github.com/devacrBIT/Taskhub.git
```

Enter the project folder:

```bash
cd Taskmgnt
```

Create a Python virtual environment:

```bash
python3 -m venv venv
```

Activate it:

### Linux/macOS

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

---

# Frontend Installation

Move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create the production build:

```bash
npm run build
```

This generates:

```text
frontend/dist/
```

FastAPI uses this folder to serve the application.

---

# Running the Application

From the project root:

```bash
python3 -m uvicorn app.main:app
```

The application will be available at:

```text
http://127.0.0.1:8000
```

---

# API Documentation

FastAPI automatically provides documentation:

Swagger UI:

```text
http://127.0.0.1:8000/docs
```

ReDoc:

```text
http://127.0.0.1:8000/redoc
```

---

# API Endpoints

Base route:

```text
/tasks
```

## Get all tasks

```http
GET /tasks/
```

## Create task

```http
POST /tasks/add-task
```

## Update task

```http
PUT /tasks/{id}
```

## Delete task

```http
DELETE /tasks/{id}
```

---

# Database

The application uses SQLite.

The database is automatically initialized when the FastAPI application starts.

No manual database migration is required.

---

# Production Deployment

The recommended production setup:

```
Client
  |
  |
  v
FastAPI Server
  |
  ├── React frontend (dist/)
  |
  └── API routes
          |
          v
       SQLite Database
```

FastAPI handles:

* Serving React files
* API requests
* Database communication

Only one server process is required.

---

# Updating the Application

After frontend changes:

```bash
cd frontend
npm run build
```

Restart FastAPI:

```bash
python3 -m uvicorn app.main:app
```

The new frontend build will automatically be served.

---

# Production Process Manager (Recommended)

For a permanent server deployment, run FastAPI using a process manager such as:

* systemd
* Docker
* Supervisor
* PM2

Example with systemd:

```ini
[Service]
WorkingDirectory=/path/to/Taskmgnt
ExecStart=/path/to/venv/bin/python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always
```

---

# Environment Configuration

Before public deployment, configure:

* Allowed CORS origins
* Database location
* Server host and port
* Debug settings

---

# Security Checklist

Before exposing publicly:

* Use HTTPS
* Keep dependencies updated
* Restrict CORS origins
* Do not expose database files
* Use environment variables for secrets
* Enable server logging

---

# License

This project is for personal and educational use.
