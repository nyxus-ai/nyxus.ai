# app/models/contact.py
from pydantic import BaseModel, EmailStr
from datetime import datetime

class Contact(BaseModel):
    """
    Pydantic model for a contact form submission.
    This ensures incoming data has the correct structure and types.
    """
    name: str
    email: EmailStr
    message: str
    created_at: datetime = datetime.now()