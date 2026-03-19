# Pally

Interactive math tutoring app for kids (Grades 1–5) with an AI teacher in a live video-call style interface powered by **Google Gemini Live API**. Students see a cartoon teacher, speak and type answers, and interact with a shared blackboard—all in real time.

---

## Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running the App](#running-the-app)
- [User Flow](#user-flow)
- [Data Flow](#data-flow)
- [WebSocket Protocol](#websocket-protocol)
- [Blackboard Tools](#blackboard-tools)
- [Curriculum](#curriculum)
- [Environment Variables](#environment-variables)
- [Tech Stack](#tech-stack)
- [Troubleshooting](#troubleshooting)

---

## Features

- **Live AI Teacher** — Real-time voice conversation with Google Gemini (native audio model)
- **Webcam Visibility** — AI can see the student via periodic webcam frames
- **Interactive Blackboard** — Agent-driven chalk-style board: writes equations, keywords, questions
- **Grade-Based Curriculum** — Math topics for Grades 1–5 (Numbers, Addition, Fractions, Algebra, etc.)
- **Speech + Text** — Student answers out loud or types; AI responds with voice
- **Animated Teacher Character** — SVG character with moods (idle, talking, happy, surprised, thinking)
- **Responsive UI** — Starfield background, Tailwind CSS, mobile-friendly

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ FRONTEND (Next.js)                                                           │
│  page.tsx → Grade → Lessons → Subtopics → LiveCall                           │
│  LiveCall → useLiveSession + useBlackboard → LiveClient (WebSocket)          │
│  Mic (PCM 16kHz) + Webcam (JPEG) + Text → WebSocket                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ WebSocket ws://localhost:8000/ws?prompt=...
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ BACKEND (FastAPI)                                                            │
│  routes/websocket.py → run_gemini_session()                                   │
│  services/gemini_session.py → Gemini Live API (audio, video, tools)           │
│  tools/blackboard.py → write_to_blackboard, ask_student, clear_blackboard     │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Google Gemini Live API
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ GEMINI LIVE API                                                              │
│  Native audio I/O, webcam frames, tool calls (blackboard)                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
pally/
├── backend/                    # FastAPI + Gemini Live bridge
│   ├── main.py                 # App entry, CORS, /health, uvicorn
│   ├── config.py               # Env vars (GEMINI_*, HOST, PORT, CORS)
│   ├── protocol.py             # WebSocket message type constants
│   ├── requirements.txt
│   ├── .env                    # GEMINI_API_KEY, GEMINI_MODEL
│   ├── prompts/
│   │   ├── defaults.py         # DEFAULT_PROMPT (fallback)
│   │   ├── builder.py          # build_lesson_prompt()
│   │   └── __init__.py
│   ├── routes/
│   │   ├── websocket.py        # /ws endpoint, ?prompt= query param
│   │   └── __init__.py
│   ├── services/
│   │   ├── gemini_session.py   # Browser WS ↔ Gemini Live bridge
│   │   └── __init__.py
│   └── tools/
│       ├── blackboard.py       # Gemini function declarations
│       └── __init__.py
│
├── frontend/                   # Next.js 14 + React
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx      # Root layout, metadata
│   │   │   ├── page.tsx        # Main flow: grade → lessons → subtopics → live
│   │   │   ├── globals.css     # Tailwind, starfield, ground
│   │   │   ├── live/page.tsx   # Standalone /live test route
│   │   │   └── api/chat/       # Luna chat (Groq) — optional
│   │   ├── components/
│   │   │   ├── LiveCall.tsx    # Full-screen live session UI
│   │   │   ├── TeacherCharacter.tsx  # SVG teacher, moods
│   │   │   ├── Blackboard.tsx  # Chalk-style board
│   │   │   └── Starfield.tsx   # Animated background
│   │   ├── hooks/
│   │   │   ├── useLiveSession.ts   # LiveClient, mic, video, playback
│   │   │   └── useBlackboard.ts    # Agent commands → lines, answerMode
│   │   ├── lib/
│   │   │   ├── liveClient.ts   # WebSocket client (no React)
│   │   │   ├── protocol.ts     # Message type constants
│   │   │   └── blackboard.ts   # BoardLine, BlackboardCommand types
│   │   ├── data/
│   │   │   └── mathCurriculum.ts   # MATH_CURRICULUM, getLessonPrompt
│   │   └── config.ts           # WS_URL, WS_ERROR_MESSAGE
│   ├── package.json
│   └── .env.local              # Optional: NEXT_PUBLIC_WS_URL
│
├── ARCHITECTURE.md             # Detailed file reference
└── README.md
```

---

## Setup

### Prerequisites

- **Python 3.x** (backend)
- **Node.js** (frontend)
- **Google Gemini API key** — [Get one at ai.google.dev](https://ai.google.dev/)

### Backend

```bash
cd backend
pip install -r requirements.txt
```

Create `backend/.env`:

```
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash-native-audio-preview-12-2025
```

### Frontend

```bash
cd frontend
npm install
```

Optional: create `frontend/.env.local` if backend runs elsewhere:

```
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

---

## Running the App

```bash
# Terminal 1 — Backend
cd backend && python main.py

# Terminal 2 — Frontend
cd frontend && npm run dev
```

- **Backend:** http://localhost:8000 (health: http://localhost:8000/health)
- **Frontend:** http://localhost:3000

---

## User Flow

1. **Grade Picker** — User selects Grade 1–5
2. **Lessons Screen** — User selects a lesson (e.g. Numbers & Counting, Addition)
3. **Subtopics Screen** — User selects a topic (e.g. Counting to 20)
4. **Live Call** — Full-screen AI teacher session:
   - Teacher character (animated)
   - Blackboard (agent-controlled)
   - Webcam preview
   - Mic input (speech) + text input (typed answers)
   - Status bar (Listening / Teaching)

---

## Data Flow

### Live Call Flow

1. **page.tsx** — User picks grade/lesson/subtopic → `getLessonPrompt(subtopic, grade)` → `systemPrompt`
2. **LiveCall** — Renders with `systemPrompt`, `topicTitle`, `grade`
3. **useLiveSession** — Connects to `ws://localhost:8000/ws?prompt=<base64(systemPrompt)>`
4. **LiveClient** — Sends `audio` (PCM 16kHz), `video` (JPEG 320×240), `text` (typed answers)
5. **Backend** — `gemini_session.py` bridges to Gemini Live API
6. **Gemini** — Responds with voice, transcripts, tool calls (blackboard)
7. **Backend** — Forwards `audio`, `transcript`, `input`, `blackboard` to frontend
8. **useBlackboard** — `processCommand(cmd)` updates `lines`, `answerMode`, `question`
9. **Blackboard** — Renders `BoardLine[]` (intro, keyword, equation, question)

### Audio/Video Specs

| Stream | Format | Rate |
|--------|--------|------|
| Mic → Backend | PCM 16kHz, base64 | Real-time |
| Browser → Backend | JPEG 320×240 | ~1 frame/sec |
| Backend → Browser | PCM 24kHz, base64 | Real-time |

---

## WebSocket Protocol

### Browser → Backend

| Type | Data | Purpose |
|------|------|---------|
| `audio` | base64 PCM 16kHz | Microphone input |
| `video` | base64 JPEG | Webcam frame |
| `text` | string | Typed message (e.g. answer) |
| `audio_end` | — | End of user speech turn |

### Backend → Browser

| Type | Data | Purpose |
|------|------|---------|
| `audio` | base64 PCM 24kHz | AI voice output |
| `transcript` | string | AI speech transcription |
| `input` | string | User speech transcription |
| `interrupted` | — | AI was interrupted |
| `turn_end` | — | AI turn finished |
| `error` | string | Error message |
| `blackboard` | `{ action, text?, lineType?, question? }` | Blackboard command |

---

## Blackboard Tools

The AI teacher uses three Gemini tools to control the blackboard:

| Tool | Parameters | Purpose |
|------|------------|---------|
| `write_to_blackboard` | `text`, `line_type` | Write a line. `line_type`: `intro` (white italic), `keyword` (gold bold), `equation` (gold large monospace) |
| `ask_student` | `question` | Display question in blue, enable answer input |
| `clear_blackboard` | — | Erase all content |

All tools are **NON_BLOCKING** so Gemini can fire them alongside audio without pausing.

---

## Curriculum

`MATH_CURRICULUM` in `frontend/src/data/mathCurriculum.ts` defines Grades 1–5:

| Grade | Sample Lessons |
|-------|----------------|
| 1 | Numbers & Counting, Addition, Subtraction, Shapes & Patterns |
| 2 | Numbers to 1000, Addition & Subtraction, Measurement & Time, Geometry |
| 3 | Multiplication, Division, Fractions, Measurement |
| 4 | Multi-digit Multiplication, Long Division, Fractions & Decimals, Geometry & Angles |
| 5 | Fractions, Decimals & Percentages, Intro to Algebra, Geometry & Volume |

Each subtopic has a `prompt` that instructs the AI how to teach it. `getLessonPrompt(subtopic, grade)` builds the full system prompt including blackboard instructions.

---

## Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `GEMINI_API_KEY` | Backend | Google Gemini API key (required) |
| `GEMINI_MODEL` | Backend | Model name (default: `gemini-2.5-flash-native-audio-preview-12-2025`) |
| `GEMINI_VOICE` | Backend | Voice name (default: `Aoede`) |
| `HOST` | Backend | Server bind (default: `0.0.0.0`) |
| `PORT` | Backend | Port (default: `8000`) |
| `CORS_ORIGINS` | Backend | Comma-separated allowed origins |
| `NEXT_PUBLIC_WS_URL` | Frontend | WebSocket base URL (default: `ws://localhost:8000`) |
| `GROQ_API_KEY` | Frontend | For `/api/chat` Luna flow (optional) |

---

## Tech Stack

| Layer | Stack |
|-------|-------|
| Backend | FastAPI, uvicorn, WebSockets, google-genai, python-dotenv |
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| AI | Google Gemini Live API (native audio, webcam, tools) |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot reach backend" | Ensure backend is running: `cd backend && python main.py` |
| No audio | Check browser mic permissions; ensure HTTPS or localhost |
| WebSocket fails | Verify `NEXT_PUBLIC_WS_URL` matches backend (e.g. `ws://localhost:8000`) |
| GEMINI_API_KEY warning | Add valid key to `backend/.env` |
| CORS errors | Add your frontend origin to `CORS_ORIGINS` in backend config |

---

See [ARCHITECTURE.md](ARCHITECTURE.md) for a complete file-by-file reference.
