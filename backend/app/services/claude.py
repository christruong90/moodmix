import json
import anthropic
from app.core.config import settings

client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
MODEL = "claude-haiku-4-5-20251001"


def get_moodmix_queries(mood: str) -> list[str]:
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
