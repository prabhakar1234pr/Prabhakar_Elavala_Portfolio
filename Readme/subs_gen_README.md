# SubsGen — Instagram Talking Head Subtitles & AI Reel Pipeline

Generate viral Instagram-style subtitles for your videos, or let AI build a complete reel from raw clips. Word-by-word highlighting, CrewAI Flow orchestration, and creative agent-driven editing.

## Features

### Subtitles Mode
- **Word-by-Word Highlighting** — Each word pops with color as it's spoken (Hormozi/CapCut style)
- **Multiple Styles** — Hormozi, minimal, neon, fire, karaoke, purple
- **Burned-In Subtitles** — Ready to post, no additional editing required

### AI Reel Pipeline
- **CrewAI Flows** — Event-driven orchestration with state management
- **6-Step AI Pipeline** — Transcribe → Analyze → Holistic Review → Edit Plan → Music → Blueprint
- **Holistic Reviewer** — Human-like view of all clips before editing
- **Creative EditDirector** — Agent picks transitions (fade, wipe, slide), trim points, pacing
- **Internet Archive Music** — CC0/public domain tracks, no API key
- **Audio Ducking** — Music lowers when speech is present
- **Agent-Driven Transitions** — Per-segment transition type and duration

## Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | FastAPI + Python |
| Orchestration | CrewAI Flows |
| Speech-to-Text | Groq Whisper Large v3 |
| Vision | Groq Llama 4 Scout VLM |
| LLM | Groq Llama 3.3 70B |
| Music | Internet Archive (CC0) |
| Video Processing | FFmpeg |
| Frontend | Next.js 14 + Tailwind CSS |

## Project Structure

```
instagram-talkinghead-subs/
├── backend/
│   ├── main.py                    # API entry point
│   ├── routers/
│   │   ├── video.py               # /api/process, /api/process-reel
│   │   └── reel_pipeline.py       # /api/reel-pipeline (AI reel)
│   ├── agents/
│   │   ├── flows/
│   │   │   ├── reel_flow.py       # CrewAI Flow orchestration
│   │   │   └── state.py           # ReelFlowState schema
│   │   ├── transcriber.py         # Groq Whisper Large v3
│   │   ├── video_analyst.py       # Llama 4 Scout VLM
│   │   ├── holistic_reviewer.py   # Human-like clip review
│   │   ├── brain.py               # EditDirector (creative edit plan)
│   │   ├── music_supervisor.py    # Internet Archive music
│   │   └── key_manager.py         # Groq key rotation
│   ├── services/
│   │   ├── transcription.py       # faster-whisper (subtitles mode)
│   │   ├── subtitle.py            # ASS subtitle generation
│   │   ├── video_editor.py        # FFmpeg trim, reframe, agent transitions
│   │   ├── audio_master.py        # Mix with ducking
│   │   └── music_selector.py     # Bundled fallback music
│   ├── utils/file_handler.py
│   └── pyproject.toml
├── frontend/
│   ├── app/page.tsx
│   ├── components/
│   │   ├── VideoUploader.tsx      # Subtitles mode
│   │   ├── ReelPipelineUploader.tsx
│   │   ├── ProcessingStatus.tsx
│   │   └── VideoPreview.tsx
│   └── lib/api.ts
└── README.md
```

## Local Development

### Prerequisites

- Python 3.10+
- Node.js 18+
- FFmpeg installed on your system
- Groq API key(s) — [Get one free](https://console.groq.com/)

### Backend Setup

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env and add your Groq API key(s):
# GROQ_API_KEY=your_key
# Or for round-robin: GROQ_API_KEY_1, GROQ_API_KEY_2, GROQ_API_KEY_3

# Install dependencies
uv sync
# or: pip install -e .

# Run the server
uv run uvicorn main:app --reload --port 7860
```

API: `http://localhost:7860`

### Frontend Setup

```bash
cd frontend

npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:7860" > .env.local

npm run dev
```

Frontend: `http://localhost:3000`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API info |
| `/api/health` | GET | Health check (FFmpeg status) |
| `/api/process` | POST | Single video → subtitles |
| `/api/process-reel` | POST | Multiple videos → ZIP of subtitled videos |
| `/api/reel-pipeline` | POST | Multiple clips → AI reel (trim, music, subs) |
| `/api/reel-pipeline/status` | GET | Groq keys, models info |
| `/api/reel-pipeline/last-caption` | GET | Last generated caption |

### Subtitles Mode

```bash
curl -X POST -F "video=@clip.mp4" -F "style=hormozi" \
  http://localhost:7860/api/process --output result.mp4
```

### AI Reel Pipeline

```bash
curl -X POST -F "videos=@clip1.mp4" -F "videos=@clip2.mp4" \
  http://localhost:7860/api/reel-pipeline --output reel.mp4
```

Caption is returned in the `X-Caption` response header (JSON).

## AI Pipeline Flow

```
@start → ingest_clips
  → transcribe_all (Groq Whisper Large v3)
  → analyze_all (Llama 4 Scout VLM)
  → holistic_review (human-like summary)
  → edit_director (creative EditPlan + transitions)
  → music_supervisor (Internet Archive)
  → build_blueprint
```

Router then: FFmpeg trim/reframe/concat → mix_with_ducking → burn subtitles → return reel.mp4

## Configuration

### Groq API Keys

Set in `.env`:
- `GROQ_API_KEY` — single key
- `GROQ_API_KEY_1`, `GROQ_API_KEY_2`, `GROQ_API_KEY_3` — round-robin (optional)

### Subtitle Styles

In `backend/services/subtitle.py`: hormozi, minimal, neon, fire, karaoke, purple

### EditDirector (Brain)

- Temperature: 0.6 (creative)
- Outputs: trim points, transition type/duration per clip, music params, caption

## Limitations

- **Subtitles mode**: faster-whisper (tiny) — local, no API
- **Reel pipeline**: Groq API required; videos up to 500MB total
- Supported formats: MP4, MOV, WebM, AVI
- English optimized

## Troubleshooting

### "No speech detected"
- Ensure clear audio; check audio track is not muted

### "FFmpeg not found"
- Install from [ffmpeg.org](https://ffmpeg.org/download.html) and add to PATH

### "No Groq keys"
- Add `GROQ_API_KEY` to `.env`

### Pipeline timeout
- Try fewer/shorter clips; Groq has rate limits

## License

MIT License

## Credits

- [CrewAI](https://crewai.com/) — Flow orchestration
- [Groq](https://groq.com/) — Whisper, Llama inference
- [Internet Archive](https://archive.org/) — CC0 music
- [FFmpeg](https://ffmpeg.org/) — Video processing
- [FastAPI](https://fastapi.tiangolo.com/) — Backend
- [Next.js](https://nextjs.org/) — Frontend
