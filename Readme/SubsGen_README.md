# Instagram Talking Head Subtitles Generator

Generate viral Instagram-style subtitles for your talking head videos. Free, fast, and trendy with word-by-word highlighting (Hormozi/CapCut style).

![SubsGen Preview](https://via.placeholder.com/800x400?text=SubsGen+Preview)

## Features

- **Word-by-Word Highlighting** - Each word pops with color as it's spoken
- **AI Transcription** - Powered by OpenAI Whisper (runs locally, no API key needed)
- **Burned-In Subtitles** - Ready to post, no additional editing required
- **100% Free** - No watermarks, no sign-up, completely free to use

## Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | FastAPI + Python |
| Speech-to-Text | OpenAI Whisper (base model) |
| Video Processing | FFmpeg |
| Frontend | Next.js 14 + Tailwind CSS |
| Backend Hosting | Hugging Face Spaces (Docker) |
| Frontend Hosting | Vercel |

## Project Structure

```
instagram-talkinghead-subs/
├── backend/                    # FastAPI backend
│   ├── main.py                 # API entry point
│   ├── routers/video.py        # Video processing endpoint
│   ├── services/
│   │   ├── transcription.py    # Whisper transcription
│   │   └── subtitle.py         # ASS subtitle generation
│   ├── utils/file_handler.py   # Temp file management
│   ├── Dockerfile              # HF Spaces config
│   └── pyproject.toml          # Python dependencies
├── frontend/                   # Next.js frontend
│   ├── app/                    # App router pages
│   ├── components/             # React components
│   └── package.json
└── README.md
```

## Local Development

### Prerequisites

- Python 3.10+
- Node.js 18+
- FFmpeg installed on your system
- uv (Python package manager)

### Backend Setup

```bash
cd backend

# Install uv if not already installed
pip install uv

# Install dependencies
uv sync

# Run the server
uv run uvicorn main:app --reload --port 7860
```

The API will be available at `http://localhost:7860`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL=http://localhost:7860

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Deployment

### Backend: Hugging Face Spaces

1. Create a new Space on [Hugging Face](https://huggingface.co/spaces)
2. Select **Docker** as the SDK
3. Clone your Space repository:
   ```bash
   git clone https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME
   ```
4. Copy the `backend/` contents to your Space:
   ```bash
   cp -r backend/* YOUR_SPACE_NAME/
   cd YOUR_SPACE_NAME
   git add .
   git commit -m "Initial deployment"
   git push
   ```
5. Wait for the Space to build (may take 5-10 minutes for first build)
6. Your API will be available at `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space`

### Frontend: Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Set the **Root Directory** to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space`
5. Deploy!

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API info |
| `/api/health` | GET | Health check |
| `/api/process` | POST | Upload video, returns video with subtitles |

### Example Usage

```bash
curl -X POST \
  -F "video=@your_video.mp4" \
  https://your-space.hf.space/api/process \
  --output result.mp4
```

## Configuration

### Whisper Model

The default model is `base` (~74MB). You can change it in `backend/services/transcription.py`:

```python
transcription_service = TranscriptionService(model_name="base")
# Options: tiny, base, small, medium, large
```

Note: Larger models require more RAM and processing time.

### Subtitle Style

Customize the subtitle appearance in `backend/services/subtitle.py`:

- Font size, family, and color
- Background opacity
- Highlight color (default: yellow)
- Words per group (default: 3)

## Limitations

- Videos up to 3 minutes recommended for optimal processing time
- Supported formats: MP4, MOV, WebM, AVI
- Maximum file size: 100MB
- English language optimized (other languages may work but with reduced accuracy)

## Troubleshooting

### "No speech detected"
- Ensure your video has clear audio
- Check that the audio track is not muted
- Try a shorter video clip

### Processing timeout
- HF Spaces free tier has processing limits
- Try a shorter video (under 60 seconds)
- Consider using a smaller Whisper model

### CORS errors
- Ensure `NEXT_PUBLIC_API_URL` is set correctly
- Check that the backend CORS settings include your frontend domain

## License

MIT License - feel free to use and modify for your own projects!

## Credits

- [OpenAI Whisper](https://github.com/openai/whisper) - Speech recognition
- [FFmpeg](https://ffmpeg.org/) - Video processing
- [FastAPI](https://fastapi.tiangolo.com/) - Backend framework
- [Next.js](https://nextjs.org/) - Frontend framework

