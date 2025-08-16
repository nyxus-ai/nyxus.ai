# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.database import close_mongo_connection
from app.routes import contact, chatbot 
import json
from pathlib import Path

# Initialize the FastAPI app
app = FastAPI(
    title="Nyxus AI Backend",
    version="1.0.0",
    description="Backend API for nyxus.ai services, including contact form submissions and chatbot interactions.",
)

# Configure CORS (Cross-Origin Resource Sharing)
origins = [
    "http://localhost:3000",
    "https://nyxus.ai"  # Your production domain
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Shutdown event to close the database connection
@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Include the API routers
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["Chatbot"])  # <-- added

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Nyxus AI Backend is running."}

# Load knowledge base from JSON
@app.get("/api/knowledge", tags=["Knowledge Base"])
async def get_knowledge_base():
    kb_path = Path(__file__).resolve().parent / "data" / "knowledge_base.json"
    try:
        with open(kb_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return {"status": "success", "data": data}
    except FileNotFoundError:
        return {"status": "error", "message": "Knowledge base file not found."}
    except json.JSONDecodeError:
        return {"status": "error", "message": "Invalid JSON format in knowledge base."}
