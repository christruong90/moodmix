from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.routers import auth, spotify, moodmix, tasteclone, partydj, analytics

app = FastAPI(title="MoodMix API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
        headers={"Access-Control-Allow-Origin": "http://localhost:5173"},
    )


app.include_router(auth.router)
app.include_router(spotify.router)
app.include_router(moodmix.router)
app.include_router(tasteclone.router)
app.include_router(partydj.router)
app.include_router(analytics.router)


@app.get("/health")
async def health_check() -> dict:
    return {"status": "ok"}
