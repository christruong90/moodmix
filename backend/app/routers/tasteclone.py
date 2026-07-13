import anthropic
from fastapi import APIRouter, Depends, HTTPException
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services import spotify, claude

router = APIRouter(prefix="/tasteclone", tags=["tasteclone"])


@router.get("/recommendations")
async def get_recommendations(current_user: User = Depends(get_current_user)) -> dict:
    top_artists_data = await spotify.get_top_artists(current_user.access_token)
    top_artist_names = [a["name"] for a in top_artists_data]
    top_genres = list({g for a in top_artists_data for g in a.get("genres", [])})

    try:
        recommendations = claude.get_tasteclone_recommendations(top_artist_names, top_genres)
    except anthropic.BadRequestError:
        raise HTTPException(status_code=402, detail="Anthropic API credits required. Please add credits at console.anthropic.com.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Claude error: {str(e)}")

    return {
        "top_artists": top_artist_names[:5],
        "top_genres": top_genres[:5],
        "recommendations": recommendations,
    }
