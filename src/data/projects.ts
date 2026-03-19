export type Project = {
  title: string;
  summary: string;
  tech: string[];
  links: { github?: string; demo?: string };
  highlightMetrics?: string[];
};

export const projects: Project[] = [
  {
    title: "GitGuide",
    summary: "A full learning platform — not just a chatbot. Paste any GitHub repo and GitGuide generates a day-by-day roadmap from the actual codebase, spins up a per-user cloud IDE with a Monaco editor and real terminal, and answers questions through a RAG chatbot grounded in the repo's files.",
    tech: ["Next.js", "FastAPI", "LangGraph", "Qdrant", "GCP Vertex AI", "Docker", "TypeScript"],
    links: {
      github: "https://github.com/prabhakar1234pr/GitGuide-nextjs",
      demo: "https://gitguide.dev/"
    },
    highlightMetrics: [
      "3 backend services",
      "7-node orchestration graph",
      "Sub-3s RAG over live code",
    ],
  },
  {
    title: "Song Popularity ML Pipeline",
    summary: "Audio-first MLOps pipeline — upload an actual MP3 and get a popularity score. Essentia extracts 18 audio features, a 13-step ZenML pipeline runs data ingestion through champion model selection, and Optuna hyperparameter search (150 trials, 5 algorithms) with smart sampling cuts compute time by 80% while preserving accuracy.",
    tech: ["Python", "XGBoost", "ZenML", "MLflow", "Optuna", "Essentia", "Docker"],
    links: {
      github: "https://github.com/prabhakar1234pr/Predicting-song-popularity",
      demo: "https://huggingface.co/spaces/Prabhakar554/song-popularity-predictor"
    },
    highlightMetrics: [
      "150 hyperparameter trials",
      "13-step MLOps pipeline",
      "MP3/WAV audio feature extraction",
    ],
  },
  {
    title: "SubsGen",
    summary: "Two modes in one: drop a video and get Instagram-style word-by-word subtitles ready to post, or feed it multiple raw clips and a 6-step CrewAI Flow builds a complete reel — Groq Whisper transcribes, Llama 4 Scout VLM analyses each clip visually, an EditDirector agent picks transitions and trim points, and a Music Supervisor pulls CC0 tracks from the Internet Archive with audio ducking.",
    tech: ["FastAPI", "CrewAI Flows", "Groq Whisper", "Llama 4 Scout VLM", "FFmpeg", "Next.js"],
    links: {
      github: "https://github.com/prabhakar1234pr/subsgen-frontend",
      demo: "https://subsgen-frontend-qk75e3hl0-prabhakar-elavalas-projects.vercel.app/"
    },
    highlightMetrics: [
      "6-step reel pipeline",
      "Agent-chosen cuts",
      "Music with audio ducking",
    ],
  },
  {
    title: "Pally",
    summary: "Interactive math tutoring app for kids (Grades 1–5) with an AI teacher in a live video-call style interface powered by Google Gemini Live API. Students see a cartoon teacher, speak and type answers, and interact with a shared blackboard—all in real time.",
    tech: ["Gemini Live API", "FastAPI", "WebSockets", "Next.js", "TypeScript", "Python"],
    links: {
      github: "https://github.com/prabhakar1234pr/pally-frontend"
    },
    highlightMetrics: [
      "Bidirectional PCM audio + JPEG video stream",
      "Agent-driven blackboard via function calling",
      "Barge-in interruption & voice activity detection",
    ],
  },
  {
    title: "Job Search MCP Server",
    summary: "MCP server for Claude Desktop that searches AI/ML jobs across Greenhouse, Lever, and Adzuna simultaneously, tailors your resume against the live job description, and drafts personalised referral outreach — all from a single Claude conversation.",
    tech: ["Python", "MCP", "Claude AI", "Adzuna API", "Greenhouse API", "Lever API"],
    links: {
      github: "https://github.com/prabhakar1234pr/Applying-Jobs-MCP-server"
    },
    highlightMetrics: ["Multi-platform job search", "AI resume tailoring", "Referral message generator"],
  },
  {
    title: "BrowserFriend",
    summary: "Chrome extension + local FastAPI server that tracks every tab switch into SQLite, runs Gemini-powered analysis over your browsing patterns, and emails you a formatted HTML dashboard. Published on PyPI and actively maintained.",
    tech: ["Python", "Chrome Extension", "SQLite", "Gemini", "Resend", "FastAPI"],
    links: {
      github: "https://github.com/prabhakar1234pr/browserfriend",
      demo: "https://pypi.org/project/browserfriend/"
    },
    highlightMetrics: ["Tab tracking", "AI-powered insights", "Published on PyPI"],
  },
  {
    title: "AirText",
    summary: "Write letters mid-air with your finger and watch them become text in real time. MediaPipe tracks hand landmarks, OpenCV renders the strokes, and Azure OpenAI turns the recognised text into AI-generated images.",
    tech: ["OpenCV", "MediaPipe", "Streamlit", "Azure OpenAI", "Computer Vision"],
    links: {
      github: "https://github.com/prabhakar1234pr/AirText",
      demo: "https://airtext-kduznc54nefybwje8bzscp.streamlit.app/"
    },
    highlightMetrics: ["Real-time hand gesture recognition", "OCR integration", "Text-to-image generation"],
  },
  {
    title: "Traffic Safety Analysis System",
    summary: "Analysed 192K+ traffic collision records from Montgomery County using K-Means and DBSCAN clustering to surface high-risk zones and identify infrastructure gaps with actionable safety recommendations.",
    tech: ["Python", "K-Means", "DBSCAN", "Pandas", "Matplotlib", "Statistical Analysis"],
    links: {
      github: "https://github.com/prabhakar1234pr/Traffic-Safety-Analysis-and-Prediction-System-"
    },
    highlightMetrics: ["192K+ collision records", "ML clustering analysis", "Safety recommendations"],
  },
  {
    title: "Sentiment Analysis ML Model",
    summary: "LSTM-based deep learning model for IMDB review sentiment, trained with TensorFlow and deployed as a live Streamlit app where you can paste any review and get a real-time prediction.",
    tech: ["TensorFlow", "Keras", "LSTM", "Streamlit", "Python", "NLP"],
    links: {
      github: "https://github.com/prabhakar1234pr/sentiment-analysis-ml-model",
      demo: "https://sentiment-analysis-ml-model-398g7mjum7qmvrbee73afo.streamlit.app/"
    },
    highlightMetrics: ["LSTM neural network", "Real-time predictions", "Interactive web app"],
  },
  {
    title: "Blog Manager",
    summary: "Full-stack blog platform with JWT authentication, full CRUD, and a responsive UI. Built to learn the React + Node.js + PostgreSQL stack end-to-end.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "JWT"],
    links: {
      github: "https://github.com/prabhakar1234pr/Blog-manager",
      demo: "https://blog-manager-omega.vercel.app/"
    },
    highlightMetrics: ["Full CRUD operations", "JWT authentication", "Responsive UI"],
  },
  {
    title: "Avatar Store",
    summary: "3D avatar customisation app built with React and Three.js. An early project exploring real-time 3D rendering in the browser with Vite and Tailwind CSS.",
    tech: ["React", "Vite", "Tailwind CSS", "Three.js", "JavaScript"],
    links: {
      github: "https://github.com/prabhakar1234pr/Avatar_Store"
    },
    highlightMetrics: ["3D avatar customisation", "Real-time rendering", "Browser-based"],
  },
];
