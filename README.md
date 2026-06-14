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

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Spotify OAuth requires HTTPS locally. Use [Caddy](https://caddyserver.com) as a reverse proxy:

```bash
brew install caddy
caddy run   # from project root, requires a Caddyfile
```

API available at `https://localhost:8443` — docs at `https://localhost:8443/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in `backend/`:

```
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/moodmix
SECRET_KEY=your-secret-key
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
SPOTIFY_REDIRECT_URI=http://localhost:8000/auth/spotify/callback
ANTHROPIC_API_KEY=your-anthropic-api-key
```

## Build Progress

| Step | Description | Status |
|------|-------------|--------|
| 1 | Init repo & project structure | ✅ Done |
| 2 | FastAPI app skeleton | ✅ Done |
| 3 | MySQL schema & SQLAlchemy models | ⬜ Not started |
| 4 | Spotify OAuth login | ⬜ Not started |
| 5 | Spotify API integration (top tracks, top artists, create playlist) | ⬜ Not started |
| 6 | AI: MoodMix — mood input → Claude → Spotify playlist | ⬜ Not started |
| 7 | AI: TasteClone — top genres → Claude → artist recommendations | ⬜ Not started |
| 8 | AI: PartyDJ — shared room → group playlist | ⬜ Not started |
| 9 | Analytics API — mood history, genre breakdown, playlist stats | ⬜ Not started |
| 10 | Frontend: React + Vite scaffold | ⬜ Not started |
| 11 | Frontend: Spotify login & home page | ⬜ Not started |
| 12 | Frontend: MoodMix UI | ⬜ Not started |
| 13 | Frontend: TasteClone UI | ⬜ Not started |
| 14 | Frontend: PartyDJ UI | ⬜ Not started |
| 15 | Frontend: Analytics dashboard (charts, genre viz, mood history) | ⬜ Not started |
| 16 | Frontend: Polish — animations, responsive design, portfolio-ready visuals | ⬜ Not started |
| 17 | Deployment: Docker Compose + Railway hosting | ⬜ Not started |
| 18 | CI/CD: GitHub Actions (lint, test, auto-deploy to Railway) | ⬜ Not started |
