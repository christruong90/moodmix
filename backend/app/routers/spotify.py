from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services import spotify

router = APIRouter(prefix="/spotify", tags=["spotify"])


@router.get("/me/top-tracks")
async def top_tracks(current_user: User = Depends(get_current_user)) -> list:
    return await spotify.get_top_tracks(current_user.access_token)


@router.get("/me/top-artists")
async def top_artists(current_user: User = Depends(get_current_user)) -> list:
    return await spotify.get_top_artists(current_user.access_token)
