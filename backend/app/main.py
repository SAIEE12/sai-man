"""
SAI-MAN Portfolio — FastAPI Backend
Author: Sai Manish Ananthula
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import contact

app = FastAPI(
    title="SAI-MAN Portfolio API",
    description="Backend API for Sai Manish's portfolio — contact form, analytics, and more.",
    version="1.0.0",
)

# CORS — allow frontend origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",          # Vite dev server
        "https://saimanish.vercel.app",   # Production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api/v1", tags=["contact"])


@app.get("/", tags=["health"])
async def root():
    return {
        "status": "online",
        "service": "SAI-MAN Portfolio API",
        "version": "1.0.0",
        "docs": "/docs",
    }


@app.get("/health", tags=["health"])
async def health_check():
    return {"status": "ok"}
