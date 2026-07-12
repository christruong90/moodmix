from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, spotify, moodmix, tasteclone

app = FastAPI(title="MoodMix API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(spotify.router)
app.include_router(moodmix.router)
app.include_router(tasteclone.router)


@app.get("/health")
async def health_check() -> dict:
    return {"status": "ok"}
