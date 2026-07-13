# MoodMix — Copilot Context

## What This Project Is
MoodMix is a **full-stack portfolio project** built to demonstrate: Spotify OAuth, Claude AI integration, backend API development, frontend UI, and relational database design.

## Tech Stack
- **Backend**: FastAPI (Python), SQLAlchemy ORM, PyMySQL
- **Database**: MySQL
- **Auth**: Spotify OAuth2 (no username/password — Spotify handles identity)
- **Music Data**: Spotify Web API
- **AI**: Claude API (Anthropic) — `claude-haiku-4-5-20251001` for speed/cost
- **Frontend**: React + Vite
- **Deployment**: Docker Compose

## Repository
- GitHub: to be created at `https://github.com/christruong90/moodmix`
- Personal account: `christruong90` / `c.truong604@gmail.com`
- Enterprise git config is separate — do not use SAP credentials for this repo

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
│   ├── requirements.txt
│   └── venv/            # Local only, gitignored
└── frontend/            # React + Vite
```

## Features

### MoodMix (core)
- User types a mood or vibe ("late night drive", "gym pump", "rainy Sunday")
- Claude interprets the mood and returns track search queries
- Backend searches Spotify for matching tracks
- Backend creates a real playlist in the user's Spotify account
- Frontend shows the generated playlist with track cards

### TasteClone
- Fetch user's top artists and genres from Spotify
- Send genre/artist list to Claude: "recommend 5 artists this user has never heard of"
- Claude returns artists with a one-line reason for each
- Frontend displays recommendations with Spotify links

### PartyDJ
- User creates a "room" and gets a shareable code
- Other users join the room and connect their Spotify
- Once all joined, backend fetches everyone's top genres
- Claude generates a balanced group playlist
- Playlist is created in the room creator's Spotify

## Build Plan (step-by-step for clean git history)
1. ✅ Init repo & project structure
2. ✅ Backend: FastAPI app skeleton (`main.py`, `config`, `database`)
3. ✅ Database: MySQL schema & SQLAlchemy models (User, Playlist, Room, RoomMember)
4. ✅ Backend: Spotify OAuth login (redirect → callback → store token)
5. ✅ Backend: Spotify API integration (top tracks, top artists, create playlist, search tracks)
6. ✅ Backend: AI MoodMix route (mood → Claude → Spotify playlist)
7. ✅ Backend: AI TasteClone route (top genres → Claude → artist recommendations)
8. ✅ Backend: AI PartyDJ route (room system + group playlist generation)
9. ✅ Backend: Analytics API (mood history, genre breakdown, playlist stats)
10. ✅ Frontend: React + Vite scaffold
11. ✅ Frontend: Spotify login & home page
12. ⬜ Frontend: MoodMix UI
13. ⬜ Frontend: TasteClone UI
14. ⬜ Frontend: PartyDJ UI
15. ⬜ Frontend: Analytics dashboard (charts, genre viz, mood history)
16. ⬜ Frontend: Polish — animations, responsive design, portfolio-ready visuals
17. ⬜ Deployment: Docker Compose + Railway hosting (backend + frontend + MySQL)
18. ⬜ CI/CD: GitHub Actions pipeline (lint, test, auto-deploy to Railway)
15. ⬜ Deploy to Railway (public URL)

## Railway Deployment Plan (Step 15)
- Create a Railway account at https://railway.app
- Connect GitHub repo `christruong90/moodmix`
- Railway auto-detects Docker Compose and creates services for backend, frontend, and MySQL
- Set env vars in Railway dashboard (same as local `.env` but with production values)
- Update Spotify Developer app to add the Railway callback URL as an allowed redirect URI
- Update `ALLOWED_ORIGINS` to include the Railway frontend URL
- Each project gets a free public URL (e.g. `moodmix.up.railway.app`)

## Working Style
- Build **one step at a time** with a git commit after each step
- Use feature branches: `feat/step-N-description`, merge to `main` when done
- Keep commits clean and descriptive for portfolio presentation
- Use `.env` for secrets — never hardcode credentials
- Backend venv lives in `backend/venv/` (not repo root)
- Explain what each file/function does as we build it — this is a learning project
- Show one file at a time to avoid response cutoffs
- User runs all commands themselves — provide commands to copy/paste

## Copilot Instructions
When generating code for this project:
- Follow the project structure above — ask before creating files outside it
- Use Pydantic v2 syntax
- Use type hints on all functions
- Keep route handlers thin — business logic belongs in `services/`
- Never expose passwords, tokens, or API keys in code or responses
- Always explain what new code does and why, before showing it
- Show one file at a time

## Local HTTPS Setup
Spotify OAuth requires HTTPS. ngrok is used to tunnel local dev traffic:
- uvicorn runs on `http://localhost:8000` (plain HTTP)
- ngrok tunnels `https://versus-aloha-lens.ngrok-free.dev` → `localhost:8000`
- Spotify redirect URI: `https://versus-aloha-lens.ngrok-free.dev/auth/spotify/callback`
- Start ngrok: `ngrok http --url=versus-aloha-lens.ngrok-free.dev 8000`
- Caddy is no longer used for local dev

## Environment Variables (backend `.env`)
```
DATABASE_URL=mysql+pymysql://root:@localhost:3306/moodmix
SECRET_KEY=your-secret-key
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
SPOTIFY_REDIRECT_URI=https://versus-aloha-lens.ngrok-free.dev/auth/spotify/callback
ANTHROPIC_API_KEY=your-anthropic-api-key
```

## Prerequisites Before Starting
- Spotify Developer account: https://developer.spotify.com
  - Create an app called "MoodMix"
  - Add redirect URI: `https://versus-aloha-lens.ngrok-free.dev/auth/spotify/callback`
  - Note down Client ID and Client Secret
- Anthropic API key: https://console.anthropic.com
  - Sign up and create an API key
  - Add to backend `.env` as `ANTHROPIC_API_KEY`
- ngrok account: https://dashboard.ngrok.com
  - Static domain: `versus-aloha-lens.ngrok-free.dev`
  - Start with: `ngrok http --url=versus-aloha-lens.ngrok-free.dev 8000`
