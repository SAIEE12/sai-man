from pydantic import BaseModel, EmailStr
from typing import Optional


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Recruiter Name",
                "email": "recruiter@company.com",
                "message": "Hi Sai, I'd love to connect about an opportunity.",
            }
        }
    }


class ContactResponse(BaseModel):
    success: bool
    message: str
