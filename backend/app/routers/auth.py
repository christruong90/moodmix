import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import create_access_token
from app.models.user import User
from app.services import spotify

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/spotify/login")
async def spotify_login() -> RedirectResponse:
    url = spotify.get_auth_url()
    return RedirectResponse(url)


@router.get("/spotify/callback")
async def spotify_callback(code: str, db: Session = Depends(get_db)) -> dict:
    token_data = await spotify.exchange_code(code)
    access_token = token_data["access_token"]
    refresh_token = token_data["refresh_token"]
    expires_at = spotify.token_expires_at(token_data["expires_in"])

    spotify_user = await spotify.get_current_user(access_token)
    spotify_id = spotify_user["id"]

    user = db.query(User).filter(User.spotify_id == spotify_id).first()
    if user:
        user.access_token = access_token
        user.refresh_token = refresh_token
        user.token_expires_at = expires_at
        user.display_name = spotify_user.get("display_name")
        user.email = spotify_user.get("email")
    else:
        user = User(
            spotify_id=spotify_id,
            display_name=spotify_user.get("display_name"),
            email=spotify_user.get("email"),
            access_token=access_token,
            refresh_token=refresh_token,
            token_expires_at=expires_at,
        )
        db.add(user)

    db.commit()
    db.refresh(user)

    our_token = create_access_token(user.id)
    frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:5173")
    return RedirectResponse(f"{frontend_url}/callback?token={our_token}")
