export interface ProjectReadme {
  projectTitle: string;
  content: string;
}

export const projectReadmes: { [key: string]: ProjectReadme } = {
  "Job Search MCP Server": {
    projectTitle: "Job Search MCP Server - AI-Powered Job Search Assistant",
    content: `# Job Search MCP Server

🔍 **MCP server for searching AI/ML jobs across multiple job boards with AI-powered resume tailoring and referral assistance.**

## Overview

Job Search MCP Server is a Model Context Protocol (MCP) server that integrates with Claude Desktop to provide comprehensive job search capabilities. It searches across multiple platforms (Greenhouse, Lever, and Adzuna), analyzes job postings, and helps you tailor your application materials and find referrals.

## Features

- **🏢 Greenhouse Search**: Search jobs on Greenhouse boards across multiple AI/ML companies
- **📋 Lever Search**: Search jobs on Lever boards across multiple companies  
- **🌐 Adzuna Search**: Search across all major job boards (Indeed, Monster, company sites, etc.)
- **📄 Job Details**: Fetch full job descriptions from any URL
- **✨ Resume Tailoring**: AI-powered analysis that extracts job requirements and suggests how to tailor your resume
- **🤝 Referral Helper**: Generate personalized outreach messages and strategies for getting referrals

## Installation

This project uses \`uv\` as the package manager:

\`\`\`bash
# Install uv if you haven't already
pip install uv

# Initialize and sync dependencies
uv sync
\`\`\`

## Configuration

### Get Adzuna API Credentials (Free)
1. Sign up at https://developer.adzuna.com/
2. Get your App ID and API Key
3. Add them to your Claude Desktop configuration

### Adding to Claude Desktop

Add this configuration to your Claude Desktop config file:

**Windows**: \`%APPDATA%\\Claude\\claude_desktop_config.json\`  
**macOS**: \`~/Library/Application Support/Claude/claude_desktop_config.json\`

\`\`\`json
{
  "mcpServers": {
    "job-search-mcp": {
      "command": "uv",
      "args": ["run", "python", "-m", "mcp_server.server"],
      "cwd": "C:\\\\apply_jobs",
      "env": {
        "ADZUNA_APP_ID": "your_app_id_here",
        "ADZUNA_API_KEY": "your_api_key_here"
      }
    }
  }
}
\`\`\`

After configuration, restart Claude Desktop.

## MCP Tools

### search_greenhouse_jobs
Search for jobs on Greenhouse job boards across multiple AI/ML companies.

**Parameters:**
- \`keywords\` (required): Job title keywords (e.g., "AI Engineer", "Machine Learning")
- \`location\` (optional): Location filter (e.g., "San Francisco", "Remote")
- \`companies\` (optional): List of company board names to search

**Default companies:** anthropic, scale, perplexity, cohere, wandb, huggingface, replicate, modal

### search_lever_jobs
Search for jobs on Lever job boards across multiple companies.

**Parameters:**
- \`keywords\` (required): Job title keywords
- \`location\` (optional): Location filter
- \`companies\` (optional): List of company names to search

**Default companies:** cohere, together, runwayml, pinecone

### search_adzuna_jobs
Search across all major job boards using Adzuna aggregator (searches Indeed, Monster, company sites, etc.).

**Parameters:**
- \`keywords\` (required): Job search query
- \`location\` (optional): Location
- \`results_per_page\` (optional): Number of results (default 20, max 50)
- \`salary_min\` (optional): Minimum salary filter (annual)
- \`max_days_old\` (optional): Only jobs posted within this many days (default 7)

### tailor_resume_for_job
Analyze a job posting and get personalized recommendations for tailoring your resume.

**Parameters:**
- \`job_url\` (required): URL of the job posting
- \`your_skills\` (required): Array of your skills
- \`your_experience_years\` (optional): Your years of relevant experience

**What it does:**
- Extracts required skills and keywords from job description
- Matches your skills against job requirements
- Identifies skills you should highlight
- Suggests keywords to add to your resume
- Provides specific resume tailoring recommendations

### find_referrals
Generate personalized outreach message templates for requesting referrals.

**Parameters:**
- \`company_name\` (required): Name of the company
- \`job_title\` (required): Job title you're applying for
- \`your_background\` (required): Brief description of your background

**What it provides:**
- Step-by-step strategy for finding connections on LinkedIn
- 4 different message templates (for different scenarios)
- Best practices and timing tips
- Pro tips and red flags to avoid
- Action items checklist

## Example Usage with Claude

Once configured, you can ask Claude:

**Job Search:**
- "Search for AI Engineer jobs at Anthropic and OpenAI"
- "Find Machine Learning jobs in San Francisco with salary over $150k"
- "Show me remote Data Scientist positions posted in the last 3 days"

**Resume Tailoring:**
- "Analyze this job posting and tell me how to tailor my resume: [URL]"
- "What skills should I highlight for this AI Engineer role?"
- "Compare my skills [Python, ML, AWS] against this job: [URL]"

**Getting Referrals:**
- "Help me find referrals at Anthropic for the AI Engineer position"
- "Generate an outreach message for someone at OpenAI"
- "I want to reach out to John Doe at Google for a referral"

## Project Highlights

- **Claude Desktop Integration**: Seamless MCP server integration for AI-powered job search
- **Multi-Platform Search**: Combines Greenhouse, Lever, and Adzuna APIs for comprehensive coverage
- **AI-Powered Resume Tailoring**: Automatically analyzes job requirements and provides personalized suggestions
- **Referral Assistance**: Generates customized outreach messages and networking strategies
- **Real-Time Job Data**: Searches thousands of job boards simultaneously through Adzuna aggregation
- **Professional Automation**: Streamlines the entire job search and application process`
  },
  "GitGuide": {
    projectTitle: "GitGuide - AI-Powered Learning Platform",
    content: `# GitGuide

🚀 **Transform GitHub repositories into personalized learning journeys** with AI-powered guidance and context-aware chat assistance.

## 🌟 Overview

GitGuide is a sophisticated learning platform that analyzes GitHub repositories and creates personalized, structured learning paths. It combines repository analysis, AI content generation, and interactive tutoring to provide a comprehensive learning experience.

### Key Features

- **🤖 AI Agent System**: Automated learning path generation using Azure OpenAI
- **💬 Smart Chat Assistant**: Context-aware AI tutor with full project understanding
- **📂 Project Management**: Complete GitHub repository analysis and learning path storage
- **✅ Task Management**: Structured learning tasks with progress tracking
- **🔐 Secure Authentication**: JWT-based authentication via Clerk
- **📊 Database**: Async PostgreSQL with SQLAlchemy ORM

## 🏗️ Architecture

### Frontend (Next.js)
- **🎯 Interactive Learning Paths**: Visual representation of AI-generated concepts
- **💬 AI Chat Assistant**: Context-aware tutoring with full repository understanding
- **🔄 Content Regeneration**: AI-powered customization of learning content
- **📱 Responsive Design**: Modern UI with Tailwind CSS and smooth animations

### Backend (FastAPI)
- **🤖 AI Agent System**: Automated learning path generation
- **📂 Repository Analysis**: GitHub API integration and content extraction
- **🗃️ Database Management**: PostgreSQL with async SQLAlchemy
- **🔐 Authentication**: Clerk-based JWT authentication

## 🚀 Key Technologies

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Clerk Auth
- **Backend**: FastAPI, PostgreSQL, SQLAlchemy, Azure OpenAI
- **AI**: GPT-4, Context-aware chat, Learning path generation
- **Infrastructure**: Async/await, RESTful APIs, JWT tokens

## 📊 Project Highlights

- **Modular Architecture**: Clean separation between frontend and backend
- **AI-Powered Content**: Generates personalized learning paths from any GitHub repo
- **Interactive Learning**: Click-through concepts, subtopics, and tasks
- **Real-time Chat**: AI tutor understands your project context
- **Professional Grade**: Production-ready with proper authentication and database design

Built with ❤️ for developers who want to learn from real-world GitHub repositories.`
  },

  "Song Popularity ML Pipeline": {
    projectTitle: "Song Popularity ML Pipeline",
    content: `# 🎵 Predicting Song Popularity with Machine Learning

## Overview
This project is a professional-grade machine learning pipeline designed to predict the popularity of songs using audio features and metadata from a massive Spotify dataset (600,000+ tracks). The pipeline is built with modern MLOps best practices, leveraging **ZenML** for orchestration and **MLflow** for experiment tracking.

## Problem Statement
**Goal:** Predict the popularity score of a song (0-100) based on its audio features and metadata.

- **Dataset:** 600K+ Spotify tracks (1922-2021)
- **Features:** Acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, year, and more
- **Target:** \`popularity\` (integer, 0-100)

## Pipeline Architecture

### 🏗️ **Orchestration: ZenML**
- Modular, step-based pipeline (13+ steps)
- Factory pattern for model and step creation
- Automatic artifact lineage and caching

### 🧪 **Experiment Tracking: MLflow**
- All runs, parameters, metrics, and models logged
- Local file-based tracking for speed and reliability

### ⚡ **Smart Sampling Approach**
- **Hyperparameter tuning:** 100K sample, 30 trials, 3-fold CV (fast, high-quality search)
- **Final training:** Full 600K dataset with best hyperparameters
- **Champion selection:** Automated leaderboard picks the best model

## Pipeline Steps

1. **Data Ingestion:** Load raw Spotify data (CSV)
2. **Duplicate Removal:** Drop duplicate rows
3. **Date Parsing:** Extract year, month, day from release date
4. **Missing Value Handling:** Impute or drop missing values
5. **Data Splitting:** Train/test split (80/20)
6. **Categorical Encoding:** One-hot encode categorical features
7. **Feature Transformation:** Handle skewness, scaling
8. **Diagnostics:** Quick checks on feature distributions
9. **Outlier Cleaning:** (Optional) Cap extreme values in training data
10. **Model Training:**
    - 5 models: Linear, Ridge, Random Forest, XGBoost, LightGBM
    - Smart sampling: 100K for tuning, 600K for final fit
11. **Evaluation:** Test all models on the same test set
12. **Leaderboard:** Select champion model (highest R²)
13. **Model Registration:** Save champion to MLflow and as a local pickle

## Model Selection & Results

- **Tree-based models (XGBoost, Random Forest, LightGBM)** consistently outperform linear models
- **Champion Model:** XGBoost (R² ≈ 0.51)
- **Linear models** included for benchmarking and educational purposes

## Project Highlights

- **Scalable:** Handles 600K+ records efficiently
- **Reproducible:** All steps, parameters, and artifacts tracked
- **Modular:** Easy to extend with new models or steps
- **Professional:** Follows MLOps best practices
- **Portfolio-ready:** Demonstrates advanced ML engineering skills`
  },

  "Blog Manager": {
    projectTitle: "Blog Manager - Full-Stack Application",
    content: `# Blog Manager

A full-stack blog management application built with **React** (frontend) and **Node.js / Express** (backend).  
Users can register, login, create, view, and delete blog posts, manage their profiles, and interact via a responsive UI.

## 🚀 Why Blog Manager?

- Centralized blog creation + management with user auth
- Clean, modern UI + responsive design
- Separation of concerns: backend API + frontend UI

## ✨ Features

- User registration & login via email
- Create / Read / Delete operations for blog posts
- User profile management
- Responsive frontend (works well on mobile & desktop)
- Clean, intuitive UI

## 🗂 Project Structure

\`\`\`
Blog-Manager/
├── backend/                 # Node.js / Express server
│   ├── controllers/         # Route handler logic
│   ├── db.js               # Database (PostgreSQL) config
│   ├── schema.sql          # Database schema setup
│   ├── server.js           # Entry-point of backend API
│   └── package.json        # Backend dependencies
├── react-blog-manager/     # Frontend (React)
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── assets/         # Images, icons etc.
│   │   └── App.js          # Main React component
│   └── package.json        # Frontend dependencies
├── .gitignore
└── README.md
\`\`\`

## ⚙️ Prerequisites

- **Node.js:** v14 or higher
- **npm** or **yarn**
- **PostgreSQL** (or any SQL database you configure)
- Environment variables setup for database connection, server port, etc.

## 🧰 Technologies Used

**Frontend:**
- React, React Router, CSS3, modern JavaScript (ES6+)

**Backend:**
- Node.js, Express, PostgreSQL, dotenv, cors

## 🌐 Live Demo
[https://blog-manager-omega.vercel.app/](https://blog-manager-omega.vercel.app/)

## Project Highlights

- **Full-stack architecture** with clear separation of concerns
- **User authentication** and session management
- **CRUD operations** for blog posts
- **Responsive design** for all devices
- **Production deployment** on Vercel`
  },

  "Traffic Safety Analysis System": {
    projectTitle: "Traffic Safety Analysis & Prediction System",
    content: `# Traffic Safety Analysis and Prediction System

## Project Overview
This project analyzes traffic collision data in Montgomery County, Maryland, to identify high-risk crash zones and assess the impact of lighting conditions on accident severity. Using machine learning techniques like K-Means and DBSCAN clustering, as well as statistical hypothesis testing, we provide data-driven recommendations for improving road safety.

## Team Members
- Eunah Choi
- Mallika Choudhari
- Prabhakar Elavala
- Nikhil Gade
- Tejashwini Nagendra Singh

## Course Information
- **Institution:** College of Professional Studies, Northeastern University
- **Course:** ALY 6110 Data Management & Big Data
- **Instructor:** Dr. Donhoffner
- **Date:** February 13, 2025

## Research Question
**How do lighting conditions impact traffic collisions in Montgomery County, and which locations require immediate streetlight installations to enhance road safety?**

## Hypothesis Testing
- **Null Hypothesis (H₀):** Lighting conditions have no significant impact on crash severity
- **Alternative Hypothesis (H₁):** Lighting conditions significantly affect crash severity

## Data Acquisition
- **Source:** [Data.gov](https://catalog.data.gov/dataset/crash-reporting-drivers-data)
- **Dataset Name:** Crash Reporting – Drivers Data
- **Size:** 192,000+ records spanning January 1, 2015 – January 21, 2025
- **Key Variables:** Weather, Surface Condition, Lighting, Collision Type, Traffic Control, Speed Limit, Driver at Fault, Injury Severity, and Location Coordinates

## Methodology
1. **Data Cleaning & Preprocessing**
   - Removed irrelevant or highly missing columns
   - Standardized categorical variables
   - Handled missing values and duplicates
   - Applied feature engineering (time-of-day classification, severity index)
   - Outlier retention for high-impact incident analysis

2. **Analytical Methods**
   - **K-Means Clustering**: Segmented accident-prone areas into high, moderate, and low-risk zones
   - **DBSCAN Clustering**: Identified high-density crash hotspots in poorly lit areas
   - **Chi-Square Test**: Assessed the significance of lighting conditions on crash severity
   - **Geospatial Visualizations**: Created heatmaps, scatter plots, and clustering diagrams

## Key Findings
- Poor lighting conditions significantly contribute to high-severity crashes, especially at intersections and high-speed roads
- High-risk crash zones were identified and prioritized for intervention
- Speed limits between 30-50 mph showed the highest crash severity levels
- Roads requiring immediate streetlight installation include Woodfield Rd, Clarksburg Rd, Log House Rd, Damascus Rd, Eisenhower Memorial Hwy, Barnesville Rd, and Ridge Rd

## Recommendations
- **Immediate Actions for High-Risk Areas:** Install high-intensity LED streetlights, add reflective markers, improve road signs, and deploy speed detection cameras
- **Moderate-Priority Areas:** Enhance road surface conditions, implement weather-sensitive traffic controls, and integrate smart signage
- **Long-Term Planning for Low-Priority Areas:** Conduct regular safety audits, educate the public on safe driving habits, and gradually upgrade infrastructure

## Future Work
- Conduct a before-and-after crash analysis to measure the effectiveness of interventions
- Collaborate with local authorities, urban planners, and law enforcement to execute improvements
- Utilize real-time AI-based predictive models for ongoing traffic safety monitoring`
  },

  "Sentiment Analysis ML Model": {
    projectTitle: "Sentiment Analysis ML Model",
    content: `# Sentiment Analysis ML Model

🎭 **Deep learning sentiment analysis for IMDB movie reviews using LSTM networks with Streamlit deployment.**

**Live Demo:** [https://sentiment-analysis-ml-model-398g7mjum7qmvrbee73afo.streamlit.app/](https://sentiment-analysis-ml-model-398g7mjum7qmvrbee73afo.streamlit.app/)

## Introduction
This project implements a sentiment analysis model for IMDB movie reviews, leveraging deep learning techniques to classify reviews as positive or negative. The system demonstrates the practical application of natural language processing (NLP) in understanding and categorizing user-generated content.

## Project Development

### Data Preparation
The project began with loading and preprocessing a large dataset of IMDB movie reviews. Multiple CSV files were concatenated to create a comprehensive dataset, with sentiments encoded as binary values (0 for negative, 1 for positive).

### Text Preprocessing
A Tokenizer from TensorFlow's Keras API was employed to convert the text data into a format suitable for machine learning. The reviews were tokenized and padded to ensure uniform input size for the neural network.

### Model Architecture
A Sequential model was designed using TensorFlow, consisting of:
- **Embedding layer** to create dense vector representations of words
- **LSTM (Long Short-Term Memory) layer** to capture long-range dependencies in the text
- **Dense output layer** with sigmoid activation for binary classification

### Training Process
The model was trained using:
- Binary cross-entropy as the loss function
- Adam optimizer for efficient gradient descent
- Accuracy as the primary metric
- Early stopping to prevent overfitting
- TensorBoard integration for performance visualization

### Model Evaluation
The training process included validation splits to monitor the model's performance on unseen data, ensuring generalization.

### Deployment
Post-training, the model was saved for later use. A Streamlit web application was developed to provide an intuitive interface for users to input reviews and receive real-time sentiment predictions.

## Key Features

- **LSTM Neural Network**: Advanced deep learning architecture for sequence processing
- **Real-time Predictions**: Instant sentiment analysis of user input
- **Interactive Web Interface**: User-friendly Streamlit application
- **Binary Classification**: Accurate positive/negative sentiment detection
- **TensorBoard Integration**: Comprehensive training visualization

## Technologies Used

- **TensorFlow/Keras**: Deep learning framework
- **LSTM**: Recurrent neural network architecture
- **Streamlit**: Web application framework
- **Python**: Core programming language
- **NLP**: Natural language processing techniques

## Project Impact

The project showcases the integration of advanced NLP techniques with modern web technologies, creating a practical tool for sentiment analysis that can be easily used by non-technical users. This demonstrates real-world application of machine learning in text analysis and user experience design.`
  },

  "Avatar Store": {
    projectTitle: "Avatar Store - 3D Avatar Customization",
    content: `# Avatar Store

A modern **3D avatar customization web app** built with **React + Vite** and styled using **Tailwind CSS**.  
The project is designed to allow users to create, customize, and store avatars in a visually rich, responsive UI.

## 🚀 Why Avatar Store?

- **Immersive**: Lets users visualize and personalize avatars
- **Fast development**: Powered by React + Vite + HMR (Hot Module Replacement)
- **Scalable UI**: Built with Tailwind CSS and PostCSS for flexible styling

## ✨ Features

- ⚡ **Hot Module Replacement (HMR)** for instant updates during dev
- 🔍 **ESLint Integration** for code quality
- 🎨 **Tailwind CSS** utility-first styling
- 🔧 **Vite Build Tool** for blazing-fast dev & production builds
- 🌐 **Responsive design** for desktop and mobile

## 🛠 Architecture

The app follows a **React component-based structure** with **Vite** as the build system.

1. **Frontend**: React (with JSX components in \`/src\`)
2. **Styling**: Tailwind CSS + PostCSS
3. **Bundling/Build**: Vite for dev + production builds
4. **Configuration**: Babel (\`.babelrc\`), Tailwind (\`tailwind.config.js\`), PostCSS (\`postcss.config.cjs\`)

## 📂 Project Layout

\`\`\`
Avatar_Store/
├── Assets/                 # Static assets (images, icons, fonts)
├── node_modules/           # Dependencies
├── public/                 # Public static files
├── src/                    # React components & main app logic
├── .babelrc               # Babel config
├── .gitignore             # Git ignore rules
├── index.html             # Main HTML entry point
├── package.json           # Project metadata & scripts
├── package-lock.json      # Dependency lockfile
├── postcss.config.cjs     # PostCSS config
├── tailwind.config.js     # Tailwind config
└── vite.config.js         # Vite config
\`\`\`

## 🧑‍💻 Technology Stack

- **React** → Component-based UI
- **Vite** → Fast dev server & build tool
- **Tailwind CSS** → Utility-first styling
- **PostCSS** → CSS transformations
- **Babel** → JavaScript compiler

## 🗺 Roadmap

- Add avatar 3D model rendering with Three.js
- Add avatar storage backend (Firebase/Node.js)
- Support for exporting avatars as GLTF/OBJ
- User authentication & profile management

## 📜 Available Scripts

- \`npm run dev\` → start dev server
- \`npm run build\` → build for production
- \`npm run preview\` → preview production build

## Project Highlights

- **Modern Build Tools**: Leverages Vite for extremely fast development cycles
- **Component Architecture**: Clean, maintainable React component structure
- **Responsive Design**: Works seamlessly across all device sizes
- **Developer Experience**: Hot reloading and modern development workflow
- **Scalable Styling**: Utility-first CSS approach with Tailwind`
  },

  "AirText": {
    projectTitle: "AirText - Hand Gesture to Text",
    content: `# AirText

✋ **Turn mid-air finger writing into text — then turn that text into images.**

**AirText** lets you draw with your fingertip in front of a webcam, auto-captures the sketch, runs AI handwriting recognition, and (optionally) generates a pretty image from your recognized text.

## 🚀 Why AirText?

- **Hands-free vibe**: Sketch letters/shapes with your finger — no stylus/tablet
- **Fast OCR**: Push the captured canvas to a vision model for handwriting recognition
- **Creative kicker**: Pipe recognized text into an image generator for concept art or playful outputs

## ✨ Features

- Fingertip drawing via **webcam** (MediaPipe + OpenCV style pipeline)
- **Mode switching**: draw / erase / clear / save
- **Canvas export** → \`airtext_output.png\`
- **OCR** with Vision model → recognized text
- **Text-to-Image** (DALL·E-style)
- **Streamlit web app** (\`streamlit_app.py\`) for uploads/camera workflow

## 🛠 Architecture

**Capture → Recognize → (Optional) Generate**

1. **Capture** (\`interactive_draw.py\`)  
   Tracks fingertip → draws onto canvas → saves PNG

2. **Recognize** (\`Handwriting_reader.py\`)  
   OCR via Vision model → returns text

3. **Generate** (optional)  
   Text prompt → DALL·E-style generator → output image

4. **UI** (\`streamlit_app.py\`)  
   One-stop Streamlit interface tying it together

## ⚡ Quick Start

### 1. Environment
\`\`\`bash
conda create -n airtext python=3.10 -y
conda activate airtext
\`\`\`

### 2. Install dependencies
\`\`\`bash
pip install opencv-python mediapipe streamlit pillow numpy requests python-dotenv
pip install openai azure-identity azure-core   # if using Azure
\`\`\`

### 3. Configure keys
Use \`.env\` locally or \`.streamlit/secrets.toml\` in Streamlit Cloud.

## ⚙️ Configuration

### Local .env
\`\`\`
AZURE_OPENAI_ENDPOINT=https://<your-endpoint>.openai.azure.com/
AZURE_OPENAI_API_KEY=<your-key>
AZURE_OPENAI_API_VERSION=2024-02-15-preview
AZURE_OCR_DEPLOYMENT=gpt-4o
AZURE_IMAGE_DEPLOYMENT=dalle-3
\`\`\`

## ▶️ Running Options

1. **Streamlit app (recommended)**
   \`\`\`bash
   streamlit run streamlit_app.py
   \`\`\`

2. **Direct capture**
   \`\`\`bash
   python interactive_draw.py
   \`\`\`

3. **OCR & generation**
   \`\`\`bash
   python Handwriting_reader.py --image airtext_output.png --task ocr
   python Handwriting_reader.py --image airtext_output.png --task generate
   \`\`\`

## 🗺 Roadmap

- One-click "camera → OCR → generate" in Streamlit
- Brush/eraser thickness + color options
- Undo/redo support
- Batch OCR
- Export PDF with text + images

## 🙏 Acknowledgments

- MediaPipe + OpenCV for hand tracking
- Streamlit for easy UI
- Azure OpenAI for vision + image generation

## Project Highlights

- **Computer Vision**: Real-time hand tracking and gesture recognition
- **AI Integration**: OCR and text-to-image generation
- **Interactive Interface**: User-friendly Streamlit web application
- **Multi-modal AI**: Combines vision, text processing, and image generation
- **Creative Tool**: Transforms natural hand gestures into digital content`
  }
};
