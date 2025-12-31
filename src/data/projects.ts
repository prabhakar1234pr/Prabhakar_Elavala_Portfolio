export type Project = {
  title: string;
  summary: string;
  tech: string[];
  links: { github?: string; demo?: string };
  highlightMetrics?: string[];
};

export const projects: Project[] = [
  {
    title: "Job Search MCP Server",
    summary: "🔍 MCP server for Claude Desktop that searches AI/ML jobs across multiple platforms with AI-powered resume tailoring and referral assistance.",
    tech: ["Python", "MCP", "Claude AI", "Adzuna API", "Greenhouse API", "Lever API"],
    links: { 
      github: "https://github.com/prabhakar1234pr/Applying-Jobs-MCP-server"
    },
    highlightMetrics: ["Multi-platform job search", "AI resume tailoring", "Referral message generator"],
  },
  {
    title: "GitGuide",
    summary: "🚀 Transform GitHub repositories into personalized learning journeys with AI-powered guidance and context-aware chat assistance.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Azure OpenAI", "TypeScript"],
    links: { 
      github: "https://github.com/prabhakar1234pr/gitguide_frontend",
      demo: "https://gitguidefrontend.vercel.app/"
    },
    highlightMetrics: ["AI-powered learning paths", "Context-aware chat", "Full-stack architecture"],
  },
  {
    title: "Song Popularity ML Pipeline",
    summary: "🎵 Professional-grade ML pipeline predicting song popularity using 600K+ Spotify tracks with ZenML orchestration and MLflow tracking.",
    tech: ["Python", "XGBoost", "ZenML", "MLflow", "FastAPI", "Docker"],
    links: { 
      github: "https://github.com/prabhakar1234pr/Predicting-song-popularity",
      demo: "https://huggingface.co/spaces/Prabhakar554/song-popularity-predictor"
    },
    highlightMetrics: ["R² ≈ 0.51 accuracy", "600K+ tracks analyzed", "MLOps best practices"],
  },
  {
    title: "Blog Manager",
    summary: "📝 Full-stack blog management application with user authentication, CRUD operations, and responsive design.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "JWT"],
    links: { 
      github: "https://github.com/prabhakar1234pr/Blog-manager", 
      demo: "https://blog-manager-omega.vercel.app/" 
    },
    highlightMetrics: ["Full CRUD operations", "User authentication", "Responsive UI"],
  },
  {
    title: "Traffic Safety Analysis System",
    summary: "🚦 Data-driven analysis of traffic collisions in Montgomery County using ML clustering to identify high-risk zones and infrastructure needs.",
    tech: ["Python", "K-Means", "DBSCAN", "Pandas", "Matplotlib", "Statistical Analysis"],
    links: { 
      github: "https://github.com/prabhakar1234pr/Traffic-Safety-Analysis-and-Prediction-System-"
    },
    highlightMetrics: ["192K+ collision records", "ML clustering analysis", "Safety recommendations"],
  },
  {
    title: "Sentiment Analysis ML Model",
    summary: "🎭 Deep learning sentiment analysis for IMDB movie reviews using LSTM networks with Streamlit deployment.",
    tech: ["TensorFlow", "Keras", "LSTM", "Streamlit", "Python", "NLP"],
    links: { 
      github: "https://github.com/prabhakar1234pr/sentiment-analysis-ml-model", 
      demo: "https://sentiment-analysis-ml-model-398g7mjum7qmvrbee73afo.streamlit.app/" 
    },
    highlightMetrics: ["LSTM neural network", "Real-time predictions", "Interactive web app"],
  },
  {
    title: "Avatar Store",
    summary: "🎨 Modern 3D avatar customization web app built with React, Vite, and Tailwind CSS for immersive user experiences.",
    tech: ["React", "Vite", "Tailwind CSS", "Three.js", "JavaScript"],
    links: { 
      github: "https://github.com/prabhakar1234pr/Avatar_Store"
    },
    highlightMetrics: ["3D avatar customization", "Hot Module Replacement", "Responsive design"],
  },
  {
    title: "AirText",
    summary: "✋ Turn mid-air finger writing into text using computer vision, then generate images from recognized text with AI.",
    tech: ["OpenCV", "MediaPipe", "Streamlit", "Azure OpenAI", "Computer Vision"],
    links: { 
      github: "https://github.com/prabhakar1234pr/AirText",
      demo: "https://airtext-kduznc54nefybwje8bzscp.streamlit.app/"
    },
    highlightMetrics: ["Hand gesture recognition", "OCR integration", "Text-to-image generation"],
  },
];


