# MoodMix

A full-stack portfolio project for generating AI-powered Spotify playlists. Built to demonstrate Spotify OAuth, Claude AI integration, backend API development, and frontend UI.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI (Python) |
| Database | MySQL + SQLAlchemy |
| Auth | Spotify OAuth2 |
| Music Data | Spotify Web API |
| AI | Claude API (Anthropic) |
| Frontend | React + Vite |
| Deployment | Docker Compose |

## Features

- Login with Spotify
- **MoodMix**: Type a mood or vibe, Claude picks tracks and creates a real Spotify playlist
- **TasteClone**: Analyse your top artists and genres, Claude recommends new artists you'd love
- **PartyDJ**: Join a shared room with friends, Claude generates a group playlist balancing everyone's taste

## Project Structure

```
moodmix/
├── backend/
│   ├── app/
│   │   ├── core/        # Config, security, dependencies
│   │   ├── models/      # SQLAlchemy database models
│   │   ├── routers/     # API route handlers
│   │   ├── schemas/     # Pydantic request/response schemas
│   │   └── services/    # Business logic, Spotify & Claude clients
│   └── requirements.txt
├── frontend/            # React + Vite app
└── docker-compose.yml
```

## Getting Started

### Prerequisites
- Spotify Developer account — create an app at https://developer.spotify.com
- Anthropic API key — create one at https://console.anthropic.com
- MySQL running locally
- ngrok account — static domain for Spotify OAuth

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Spotify OAuth requires HTTPS — use ngrok to tunnel local traffic:

```bash
ngrok http --url=versus-aloha-lens.ngrok-free.dev 8000
```

API available at `http://localhost:8000` — docs at `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in `backend/`:

```
DATABASE_URL=mysql+pymysql://root:@localhost:3306/moodmix
SECRET_KEY=your-secret-key
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
SPOTIFY_REDIRECT_URI=https://versus-aloha-lens.ngrok-free.dev/auth/spotify/callback
ANTHROPIC_API_KEY=your-anthropic-api-key
```

## Build Progress

| Step | Description | Status |
|------|-------------|--------|
| 1 | Init repo & project structure | ✅ Done |
| 2 | FastAPI app skeleton | ✅ Done |
| 3 | MySQL schema & SQLAlchemy models | ✅ Done |
| 4 | Spotify OAuth login | ✅ Done |
| 5 | Spotify API integration (top tracks, top artists, create playlist) | ✅ Done |
| 6 | AI: MoodMix — mood input → Claude → Spotify playlist | ✅ Done |
| 7 | AI: TasteClone — top genres → Claude → artist recommendations | ✅ Done |
| 8 | AI: PartyDJ — shared room → group playlist | ✅ Done |
| 9 | Analytics API — mood history, genre breakdown, playlist stats | ✅ Done |
| 10 | Frontend: React + Vite scaffold | ✅ Done |
| 11 | Frontend: Spotify login & home page | ✅ Done |
| 12 | Frontend: MoodMix UI | ✅ Done |
| 13 | Frontend: TasteClone UI | ✅ Done |
| 14 | Frontend: PartyDJ UI | ✅ Done |
| 15 | Frontend: Analytics dashboard (charts, genre viz, mood history) | ✅ Done |
| 16 | Frontend: Polish — animations, responsive design, portfolio-ready visuals | ⬜ Not started |
| 17 | Deployment: Docker Compose + Railway hosting | ⬜ Not started |
| 18 | CI/CD: GitHub Actions (lint, test, auto-deploy to Railway) | ⬜ Not started |
