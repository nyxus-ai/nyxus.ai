# backend/routes/chatbot.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai
import json
from pathlib import Path

# Load environment variables
load_dotenv()

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set in .env file")

genai.configure(api_key=GEMINI_API_KEY)

# Initialize FastAPI router
router = APIRouter()

# Request model
class ChatRequest(BaseModel):
    message: str

def load_knowledge_base():
    """Load company knowledge base from JSON file"""
    kb_path = Path(__file__).resolve().parent.parent / "data" / "knowledge_base.json"
    if kb_path.exists():
        try:
            with open(kb_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading KB: {e}")
    return []

@router.post("/")
async def chat_endpoint(req: ChatRequest):
    try:
        knowledge_base = load_knowledge_base()

        # Build prompt with company identity
        system_prompt = f"""
        You are Nyxus.AI's official chatbot assistant.
        Always answer as a representative of Nyxus.AI, not Google.

        Nyxus.AI Services & Knowledge Base:
        {json.dumps(knowledge_base, indent=2)}

        Rules:
        - If the question is about services, products, or company info, ONLY use the knowledge base.
        - If asked "who built you" or "what are you", respond that you are built by Nyxus.AI.
        - Keep answers short, clear, and friendly.
        """

        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(f"{system_prompt}\nUser: {req.message}\nAssistant:")

        return {
            "user_message": req.message,
            "bot_reply": response.text.strip() if hasattr(response, "text") else ""
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
