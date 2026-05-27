import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, HTTPException, status
from app.schemas.contact import ContactRequest, ContactResponse

router = APIRouter()


@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_200_OK,
    summary="Send a contact message to Sai Manish",
)
async def send_contact_message(payload: ContactRequest) -> ContactResponse:
    """
    Accepts a contact form submission and sends an email via SMTP.
    Falls back gracefully if SMTP credentials are not configured (dev mode).
    """
    smtp_host = os.getenv("SMTP_HOST", "")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_pass = os.getenv("SMTP_PASS", "")
    recipient = os.getenv("CONTACT_EMAIL", "saimanishmail@gmail.com")

    body = (
        f"New portfolio contact from {payload.name}\n\n"
        f"From: {payload.email}\n"
        f"Message:\n{payload.message}"
    )

    if not smtp_host or not smtp_user:
        # Dev mode — log and return success without sending
        print(f"[DEV] Contact form submission:\n{body}")
        return ContactResponse(
            success=True,
            message="Message received (SMTP not configured — check server logs).",
        )

    try:
        msg = MIMEMultipart()
        msg["From"] = smtp_user
        msg["To"] = recipient
        msg["Subject"] = f"Portfolio Contact from {payload.name}"
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, recipient, msg.as_string())

        return ContactResponse(success=True, message="Message sent successfully!")

    except smtplib.SMTPException as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send email: {str(exc)}",
        ) from exc
