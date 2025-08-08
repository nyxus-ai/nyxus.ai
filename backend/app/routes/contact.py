# app/routes/contact.py
from fastapi import APIRouter, HTTPException, status
from app.models.contact import Contact
from app.services.contact_service import create_contact_submission

# Create a new APIRouter instance
router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED)
async def submit_contact(contact_data: Contact):
    """
    API endpoint to handle contact form submissions.
    
    Args:
        contact_data (Contact): The Pydantic model for the form data.
        
    Returns:
        dict: A success message.
    """
    try:
        result = await create_contact_submission(contact_data)
        if not result:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to save contact submission."
            )
        return {"message": "Thank you for your message! We will be in touch shortly."}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )