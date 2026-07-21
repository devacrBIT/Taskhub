from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from pathlib import Path

from .database import init_db
from .routes.tasks import router


app = FastAPI(title="TaskHub API")


# =====================
# CORS
# =====================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "*"
    ],

    allow_credentials=False,

    allow_methods=[
        "*"
    ],

    allow_headers=[
        "*"
    ],
)



# =====================
# DATABASE
# =====================

@app.on_event("startup")
def startup():

    init_db()



# =====================
# API ROUTES
# =====================

app.include_router(router)



# =====================
# REACT FRONTEND
# =====================


BASE_DIR = Path(__file__).resolve().parent.parent

FRONTEND_DIR = BASE_DIR / "frontend" / "dist"


# Serve React assets
app.mount(
    "/assets",
    StaticFiles(
        directory=FRONTEND_DIR / "assets"
    ),
    name="assets"
)



# React entry page
@app.get("/")
async def serve_frontend():

    return FileResponse(
        FRONTEND_DIR / "index.html"
    )



# React router fallback
@app.get("/{full_path:path}")
async def react_routes(full_path: str):

    file_path = FRONTEND_DIR / full_path


    if file_path.exists() and file_path.is_file():

        return FileResponse(file_path)


    return FileResponse(
        FRONTEND_DIR / "index.html"
    )