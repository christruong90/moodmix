from datetime import datetime, timedelta
from urllib.parse import urlencode
import httpx
from app.core.config import settings

SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SCOPES = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private",
]


def get_auth_url() -> str:
    params = {
        "client_id": settings.spotify_client_id,
        "response_type": "code",
        "redirect_uri": settings.spotify_redirect_uri,
        "scope": " ".join(SCOPES),
    }
    return f"{SPOTIFY_AUTH_URL}?{urlencode(params)}"


async def exchange_code(code: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            SPOTIFY_TOKEN_URL,
            data={
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": settings.spotify_redirect_uri,
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            auth=(settings.spotify_client_id, settings.spotify_client_secret),
        )
        response.raise_for_status()
        return response.json()


async def refresh_access_token(refresh_token: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            SPOTIFY_TOKEN_URL,
            data={
                "grant_type": "refresh_token",
                "refresh_token": refresh_token,
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            auth=(settings.spotify_client_id, settings.spotify_client_secret),
        )
        response.raise_for_status()
        return response.json()


async def get_current_user(access_token: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.spotify.com/v1/me",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        response.raise_for_status()
        return response.json()


def token_expires_at(expires_in: int) -> datetime:
    return datetime.utcnow() + timedelta(seconds=expires_in)


async def get_top_tracks(access_token: str, limit: int = 20) -> list:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.spotify.com/v1/me/top/tracks",
            headers={"Authorization": f"Bearer {access_token}"},
            params={"limit": limit, "time_range": "medium_term"},
        )
        response.raise_for_status()
        return response.json().get("items", [])


async def get_top_artists(access_token: str, limit: int = 20) -> list:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.spotify.com/v1/me/top/artists",
            headers={"Authorization": f"Bearer {access_token}"},
            params={"limit": limit, "time_range": "medium_term"},
        )
        response.raise_for_status()
        return response.json().get("items", [])


async def search_tracks(access_token: str, query: str, limit: int = 5) -> list:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.spotify.com/v1/search",
            headers={"Authorization": f"Bearer {access_token}"},
            params={"q": query, "type": "track", "limit": limit},
        )
        response.raise_for_status()
        return response.json().get("tracks", {}).get("items", [])


async def create_playlist(
    access_token: str, spotify_user_id: str, name: str, description: str = ""
) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://api.spotify.com/v1/users/{spotify_user_id}/playlists",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json",
            },
            json={"name": name, "description": description, "public": False},
        )
        response.raise_for_status()
        return response.json()


async def add_tracks_to_playlist(
    access_token: str, playlist_id: str, track_uris: list
) -> None:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json",
            },
            json={"uris": track_uris},
        )
        response.raise_for_status()
