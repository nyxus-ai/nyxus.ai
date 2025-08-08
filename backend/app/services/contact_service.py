# app/services/contact_service.py
from app.models.contact import Contact
from app.config.database import get_contact_collection

async def create_contact_submission(contact_data: Contact):
    """
    Creates a new contact submission in the database.
    
    Args:
        contact_data (Contact): The Pydantic model containing the form data.
        
    Returns:
        dict: A dictionary with the result of the database operation.
    """
    contact_collection = get_contact_collection()
    contact_dict = contact_data.dict()
    result = await contact_collection.insert_one(contact_dict)
    
    if result.inserted_id:
        return {"id": str(result.inserted_id)}
    
    return None