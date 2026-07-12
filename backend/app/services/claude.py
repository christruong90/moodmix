import json
import anthropic
from app.core.config import settings

client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
MODEL = "claude-haiku-4-5-20251001"


def get_moodmix_queries(mood: str) -> list:
    prompt = f"""You are a music expert. A user wants a playlist that matches this mood or vibe: "{mood}"

Return exactly 10 Spotify search queries that would find perfect tracks for this mood.
Each query should be specific enough to find a real song (e.g. "artist name song title" or "genre mood descriptor").

Respond with a JSON array of 10 strings only. No explanation, no markdown, just the JSON array."""

    message = client.messages.create(
        model=MODEL,
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}],
    )
    return json.loads(message.content[0].text)


def get_tasteclone_recommendations(top_artists: list, top_genres: list) -> list:
    artists_str = ", ".join(top_artists[:10])
    genres_str = ", ".join(top_genres[:10])

    prompt = f"""You are a music expert. Based on this user's listening history:

Top artists: {artists_str}
Top genres: {genres_str}

Recommend exactly 5 artists this user has likely never heard of but would love.
For each artist include:
- name: the artist's name
- reason: one sentence explaining why this user would love them
- genre: their primary genre

Respond with a JSON array of 5 objects only. No explanation, no markdown, just the JSON array."""

    message = client.messages.create(
        model=MODEL,
        max_tokens=800,
        messages=[{"role": "user", "content": prompt}],
    )
    return json.loads(message.content[0].text)

