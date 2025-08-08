# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.database import close_mongo_connection
from app.routes import contact

# Initialize the FastAPI app
app = FastAPI(
    title="Nyxus AI Backend",
    version="1.0.0",
    description="Backend API for nyxus.ai services, including contact form submissions.",
)

# Configure CORS (Cross-Origin Resource Sharing)
origins = [
    "http://localhost:3000",
    "https://nyxus.ai" # Your production domain
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

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Nyxus AI Backend is running."}