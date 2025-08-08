# app/config/database.py
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

# Load environment variables
load_dotenv()

# Get connection details from .env
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

# Initialize the MongoDB client
client: AsyncIOMotorClient = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

async def close_mongo_connection():
    """Close the MongoDB connection gracefully."""
    client.close()

def get_contact_collection():
    """Get the contacts collection from the database."""
    return db.get_collection("contacts")