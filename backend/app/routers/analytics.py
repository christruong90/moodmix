from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.models.playlist import Playlist
from app.models.mood_log import MoodLog
from app.services import spotify

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/summary")
async def get_summary(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    total_playlists = db.query(func.count(Playlist.id)).filter(
        Playlist.user_id == current_user.id
    ).scalar()

    feature_counts = db.query(Playlist.feature, func.count(Playlist.id)).filter(
        Playlist.user_id == current_user.id
    ).group_by(Playlist.feature).all()

    mood_counts = db.query(MoodLog.mood_input, func.count(MoodLog.id)).filter(
        MoodLog.user_id == current_user.id
    ).group_by(MoodLog.mood_input).order_by(func.count(MoodLog.id).desc()).limit(10).all()

    recent_moods = db.query(MoodLog).filter(
        MoodLog.user_id == current_user.id
    ).order_by(MoodLog.created_at.desc()).limit(20).all()

    top_artists_data = await spotify.get_top_artists(current_user.access_token)
    top_genres = {}
    for artist in top_artists_data:
        for genre in artist.get("genres", []):
            top_genres[genre] = top_genres.get(genre, 0) + 1
    top_genres_sorted = sorted(top_genres.items(), key=lambda x: x[1], reverse=True)[:10]

    return {
        "total_playlists": total_playlists,
        "feature_breakdown": [{"feature": f, "count": c} for f, c in feature_counts],
        "top_moods": [{"mood": m, "count": c} for m, c in mood_counts],
        "mood_history": [
            {"mood": log.mood_input, "created_at": log.created_at.isoformat()}
            for log in recent_moods
        ],
        "top_genres": [{"genre": g, "count": c} for g, c in top_genres_sorted],
    }
