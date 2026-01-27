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
    content: `# GitGuide — End-to-End Project Documentation (Complete Feature & Achievement Log)

This document is a **full end-to-end** walkthrough of what has been built in this repository, based strictly on **implemented code + existing docs** inside:

- Backend: \`ai_tutor_for_github_repositories/\`
- Frontend: \`frontend-nextjs/\`

It is written to capture **every small functionality and milestone** that exists in the repo, including "small fixes" and infrastructure work.

---

## 1) What GitGuide is (product definition)

GitGuide is an AI-powered learning platform that turns a GitHub repository into:

- A **structured learning roadmap** (days → concepts → tasks)
- A **repo-aware chatbot** (RAG) that answers questions using the repo's content
- A **hands-on workspace** powered by Docker containers (file operations + terminal + git + preview proxy)

---

## 2) High-level architecture (how the system is split)

### 2.1 Frontend

- **Next.js 16 / React 19 / TypeScript** app in \`frontend-nextjs/\`
- Uses **Clerk** for authentication
- Provides:
  - Dashboard + project creation
  - Roadmap UI (days/concepts/tasks + kanban)
  - Chat widget
  - Workspace "IDE" (Monaco editor + file explorer + terminal + git + verification UX)
- Includes **proxy routes** under \`frontend-nextjs/app/api/*\` to forward calls to the workspace service, avoiding mixed-content issues.

### 2.2 Backend

The backend is intentionally split into **3 runtime services** (mirrored locally via Docker Compose):

1. **Main API service** (\`app/main.py\`)
   - User + projects + roadmap read APIs
   - Progress tracking
   - Embedding pipeline (chunking → store chunks → embeddings → Qdrant upsert)
   - RAG chatbot (repo-grounded answers)
   - Delegates LangGraph roadmap generation to the roadmap service via HTTP

2. **Roadmap service** (\`app/roadmap_service.py\`)
   - Dedicated service for LLM-heavy roadmap generation workflows
   - Supports internal endpoints protected by internal auth tokens
   - Runs LangGraph workflows in isolation (documented as a verified migration)

3. **Workspaces service** (\`app/workspace_service.py\`)
   - Runs where Docker access exists (VM in prod, Docker Compose in local dev)
   - Manages per-user/per-project containers
   - File system CRUD in containers
   - Terminal sessions via WebSocket to containers
   - Git operations inside containers (status/diff/stage/commit/push/pull/branches/merge/conflicts/reset)
   - Preview proxy for running dev servers inside containers

---

## 3) Local development: end-to-end setup you enabled

### 3.1 Local backend matches prod topology

Documented in \`ai_tutor_for_github_repositories/LOCAL_DEVELOPMENT.md\`:

- Local Docker Compose mirrors GCP:
  - \`api\` → \`localhost:8000\`
  - \`roadmap\` → \`localhost:8001\`
  - \`workspaces\` → \`localhost:8002\`

### 3.2 Local frontend connects automatically

Documented in \`frontend-nextjs/QUICK_START_LOCAL.md\` + \`frontend-nextjs/LOCAL_BACKEND_CONNECTION.md\`:

- Frontend defaults (dev):
  - Main API → \`http://localhost:8000\`
  - Workspaces service → \`http://localhost:8002\`
- Next.js proxy routes forward:
  - \`app/api/workspaces/[...path]\` → workspaces service
  - \`app/api/terminal/[...path]\` → workspaces service
  - \`app/api/preview/[...path]\` → workspaces service
  - \`app/api/git/[...path]\` → workspaces service

---

## 4) Authentication and authorization: what's implemented

### 4.1 Clerk JWT verification

- Backend routes generally require Clerk auth via \`verify_clerk_token\`.
- Terminal WebSocket supports token auth via query param:
  - \`verify_clerk_token_from_string(token)\`

### 4.2 Ownership checks on every critical resource

Across APIs, ownership is checked by:

- Mapping Clerk user → Supabase \`User\` record (\`User.clerk_user_id\` → \`User.id\`)
- Verifying:
  - Project belongs to user
  - Workspace belongs to user
  - Task session belongs to user

---

## 5) Core user journey: Project → Embeddings → Roadmap → Learning

### 5.1 Create project (backend)

File: \`ai_tutor_for_github_repositories/app/api/projects.py\`

Implemented behavior:

- Validates GitHub URL format
- Inserts project with:
  - \`skill_level\` (beginner/intermediate/advanced)
  - \`target_days\` (7–30)
  - \`status = created\`
- Immediately initializes **Day 0** content (see 5.2)
- Schedules the embedding pipeline as a **background task**
- Extensive timing logs track how long each phase takes

### 5.2 Day 0 initialization (a concrete achievement)

File: \`ai_tutor_for_github_repositories/app/api/projects.py\`

Implemented behavior:

- Inserts Day 0 into \`roadmap_days\` if missing
- Inserts Day 0 concepts into \`concepts\` with:
  - content sanitized via \`sanitize_markdown_content\`
- Inserts Day 0 tasks into \`tasks\`
- Marks Day 0 as \`generated\`
- Has a dedicated endpoint: \`POST /api/projects/{project_id}/initialize-day0\`
- Guards to prevent re-initializing a fully generated Day 0

### 5.3 Embedding pipeline (end-to-end)

File: \`ai_tutor_for_github_repositories/app/services/embedding_pipeline.py\`

Pipeline steps you implemented:

1. Set project status → \`processing\`
2. Fetch repository files from GitHub (\`fetch_repository_files\`)
3. Chunk files into text chunks (\`chunk_files\`) using a threadpool to avoid blocking
4. Store chunks to Supabase (\`store_chunks\`) using a threadpool
5. Generate embeddings (\`embedding_service.embed_texts\`) using a threadpool
6. Upsert embeddings into Qdrant with metadata (file_path, language) using a threadpool
7. Set project status → \`ready\`
8. Trigger roadmap generation by delegating to the roadmap service

"Small achievements" inside this pipeline:

- Timing logs for each step and total "from user click"
- Repository size metrics (KB/MB) and throughput logs
- A time-estimation formula output based on observed speed
- Failure handling:
  - sets project \`status=failed\`
  - stores a truncated \`error_message\`

### 5.4 Roadmap generation delegation (service-to-service)

Files:

- \`ai_tutor_for_github_repositories/app/services/roadmap_client.py\`
- Roadmap service entry: \`ai_tutor_for_github_repositories/app/roadmap_service.py\`

Implemented behavior:

- Main API calls internal roadmap endpoints over HTTP:
  - Full generation: \`/api/roadmap/generate-internal\`
  - Incremental generation: \`/api/roadmap/incremental-generate\`
- Authentication:
  - Always uses \`X-Internal-Token\`
  - Attempts Cloud Run identity token via metadata server (best-effort; falls back in local dev)
- Deep logging around:
  - tokens present/length (masked)
  - 403 debug output

Notable "minute fix" documented in repo:

- **403 fix** for header normalization (Starlette lowercases headers)
  - Roadmap service checks multiple header variants (\`X-Internal-Token\`, \`x-internal-token\`, etc.)
  - Logged in \`AUTH_403_FIX.md\`

---

## 6) Roadmap reading APIs (what the frontend consumes)

File: \`ai_tutor_for_github_repositories/app/api/roadmap.py\`

Implemented endpoints:

- \`GET /api/roadmap/{project_id}\`
  - returns all days for the project (including estimated minutes + generated status)
- \`GET /api/roadmap/{project_id}/day/{day_id}\`
  - returns day metadata + concepts (including content if present)
  - includes retry wrapper \`execute_with_retry\` for stability
  - logs concept content presence/length for debugging
- \`GET /api/roadmap/{project_id}/concept/{concept_id}\`
  - returns concept + tasks
  - logs content presence/preview + task list debugging output
- \`GET /api/roadmap/{project_id}/generation-status\`
  - returns status counts (pending/generating/generated/failed), progress %, completion flags
- Debug utilities:
  - \`GET /api/roadmap/{project_id}/concept/{concept_id}/debug\`
  - \`GET /api/roadmap/task/{task_id}\` for joined task+concept+day+project details

---

## 7) Progress tracking + "event-driven" generation

### 7.1 Backend progress tracking

File: \`ai_tutor_for_github_repositories/app/api/progress.py\`

Implemented behaviors:

- Progress retrieval across:
  - day progress (\`user_day_progress\`)
  - concept progress (\`user_concept_progress\`)
  - task progress (\`user_task_progress\`)
- Auto-initialize Day 0 progress to \`todo\` when needed

Concept tracking:

- \`POST /api/progress/{project_id}/concept/{concept_id}/start\`
  - sets concept \`doing\` + \`started_at\`
- \`POST /api/progress/{project_id}/concept/{concept_id}/content-read\`
  - sets \`content_read=true\` (creates progress record if missing)
- \`POST /api/progress/{project_id}/concept/{concept_id}/complete\`
  - sets concept \`done\` + \`completed_at\`
  - updates \`projects.user_current_concept_id\`
  - triggers incremental generation (background task)
  - checks if day can be auto-completed

Day tracking:

- \`POST /api/progress/{project_id}/day/{day_id}/start\`
- \`POST /api/progress/{project_id}/day/{day_id}/complete\`
  - completes day + unlocks next day

Task tracking (including Day 0 custom fields):

- \`POST /api/progress/{project_id}/task/{task_id}/start\`
- \`POST /api/progress/{project_id}/task/{task_id}/complete\`
  - stores special fields for Day 0:
    - github username
    - user repo URL
    - commit SHA validation
  - auto-completes concept when:
    - all tasks done AND content read
    - (or no tasks + content read)
  - auto-completes day when all concepts completed

Lazy-loading / sliding window mechanics:

- \`PUT /api/progress/{project_id}/current-concept\`
- \`GET /api/progress/{project_id}/current-concept\`
- \`GET /api/progress/{project_id}/current\` (derives current day + concept)

### 7.2 Frontend progress event system

File: \`frontend-nextjs/app/components/roadmap/RoadmapPage.tsx\`

Implemented behaviors:

- Roadmap page listens for window events:
  - \`progress:task:completed\`
  - \`progress:concept:completed\`
  - \`progress:content:read\`
- Uses those events to trigger \`refetchProgress()\` (keeps UI consistent)
- Keeps selection aligned with "current concept/day" when progress updates

---

## 8) Repo-aware chatbot (RAG) end-to-end

### 8.1 Backend chatbot API

File: \`ai_tutor_for_github_repositories/app/api/chatbot.py\`

Implemented behaviors:

- \`POST /api/chatbot/{project_id}/chat\`
  - Requires project \`status == ready\` (embeddings exist)
  - Accepts:
    - user message
    - conversation history (validated roles)
    - roadmap context (day/theme/concept/subconcept)
  - Enhances query with roadmap context string
  - Calls \`generate_rag_response(project_id, query, conversation_history)\`
  - Returns:
    - response text
    - chunks used (for grounding/traceability)
- \`POST /api/chatbot/test\`
  - No auth test endpoint for direct Gemini connectivity validation

### 8.2 Frontend chatbot widget

File: \`frontend-nextjs/app/components/chatbot/ChatbotWidget.tsx\`

Implemented behaviors:

- Collapsible floating chat widget
- Uses Clerk token via \`useAuth().getToken()\`
- Sends:
  - message
  - conversation history
  - roadmap context (day/theme/concept)
- Shows:
  - typing indicator
  - error UI
  - auto-scroll to latest messages

---

## 9) Workspaces: "Cloud IDE" features implemented end-to-end

### 9.1 Workspace lifecycle

Backend:

- Workspaces are created and managed via the workspaces service (\`app/workspace_service.py\` + \`app/api/workspaces.py\`)
- \`POST /api/workspaces/create\` supports "get or create" semantics

Frontend:

- \`frontend-nextjs/app/components/workspace/CodeEditor.tsx\` calls:
  - \`getOrCreateWorkspace(projectId, token)\`
- Shows "Spawning your container…" loading state

### 9.2 File system operations inside containers (Phase 0)

Backend file APIs:

File: \`ai_tutor_for_github_repositories/app/api/files.py\`

Endpoints implemented:

- \`GET /api/workspaces/{workspace_id}/files?path=/workspace\`
- \`GET /api/workspaces/{workspace_id}/files/content?path=...\`
- \`PUT /api/workspaces/{workspace_id}/files/content\` (write file)
- \`POST /api/workspaces/{workspace_id}/files\` (create file or directory)
- \`DELETE /api/workspaces/{workspace_id}/files?path=...\`
- \`POST /api/workspaces/{workspace_id}/files/rename\` (rename/move)

Important behavior:

- Ownership checks per workspace
- Automatically starts container if stopped before file operations

Frontend file UX:

Files:

- \`frontend-nextjs/app/components/workspace/FileExplorer.tsx\`
- \`frontend-nextjs/app/components/workspace/MonacoEditor.tsx\`
- \`frontend-nextjs/app/components/workspace/CodeEditor.tsx\`

Implemented behaviors:

- Explorer lists \`/workspace\` root
- Folder expand/collapse with lazy child loading
- Create file/folder (root or inside folder)
- Rename file/folder
- Delete file/folder
- Drag-and-drop move (implemented as rename/move)
- Keeps open editor tabs consistent:
  - closes open files under deleted/moved paths
- Editor:
  - Monaco language detection based on extension
  - Ctrl/Cmd+S triggers save
- Save writes back to container + refreshes git status

### 9.3 Terminal system (WebSocket + xterm.js)

Backend terminal:

File: \`ai_tutor_for_github_repositories/app/api/terminal.py\`

Implemented capabilities:

- Create/list/delete terminal sessions
- WebSocket connection endpoint:
  - \`GET /api/terminal/{workspace_id}/connect?token=...&session_id=...\`
- Handles:
  - input messages
  - resize messages
  - output streaming
- Includes defensive container checks:
  - verifies actual Docker status
  - starts/recreates containers when needed

Frontend terminal:

File: \`frontend-nextjs/app/components/workspace/Terminal.tsx\`

Implemented behaviors:

- xterm.js + FitAddon + WebLinksAddon
- Dynamic imports to avoid SSR issues
- ResizeObserver to fit terminal on layout changes
- Auto reconnect with exponential backoff via \`useTerminal\` hook
- Writes output to xterm + forwards keystrokes to backend WebSocket

---

## 10) Preview proxy (run dev servers inside container and open a link)

Backend preview proxy:

File: \`ai_tutor_for_github_repositories/app/api/preview.py\`

Implemented behaviors:

- \`/{workspace_id}/{port}/{path}\` proxies to container internal server
- Supports multiple HTTP methods
- \`GET /{workspace_id}/info\` returns preview URLs based on environment:
  - Local: host ports like \`http://localhost:<mapped>\`
  - Production: proxy URLs derived from forwarded host/proto
- \`GET /{workspace_id}/servers\` lists detected servers and their preview URLs

Frontend preview UX:

Files:

- \`frontend-nextjs/app/components/workspace/PreviewPortsPanel.tsx\`
- \`frontend-nextjs/app/components/workspace/CodeEditor.tsx\` (Preview dialog + Open Preview button)

Implemented behaviors:

- Polls every 5 seconds for detected preview servers
- Displays "Open preview" buttons per detected server
- Includes a "Recreate container with port mappings" repair action

Infrastructure milestone (documented):

- \`ai_tutor_for_github_repositories/PREVIEW_PROXY_SETUP.md\`
- \`ai_tutor_for_github_repositories/SETUP_PREVIEW_PROXY.md\`
  - documents LB/SSL setup and the required env vars:
    - \`WORKSPACE_PUBLIC_BASE_URL=https://workspaces.gitguide.dev\`
    - \`ENVIRONMENT=production\`

---

## 11) Git integration inside workspace containers

Backend git API:

File: \`ai_tutor_for_github_repositories/app/api/git.py\`

Implemented features:

- Status:
  - \`GET /api/git/{workspace_id}/status\`
- Diffs:
  - \`GET /api/git/{workspace_id}/diff\`
  - \`GET /api/git/{workspace_id}/diff/{file_path}?staged=...\`
- Staging:
  - \`POST /api/git/{workspace_id}/stage\`
  - \`POST /api/git/{workspace_id}/unstage\`
- Commit:
  - \`POST /api/git/{workspace_id}/commit\`
- Push/Pull (with token):
  - \`POST /api/git/{workspace_id}/push\`
  - \`POST /api/git/{workspace_id}/pull\`
  - pull supports uncommitted-handling strategies:
    - commit | stash | discard
- Commit history:
  - \`GET /api/git/{workspace_id}/commits\`
  - \`GET /api/git/{workspace_id}/commits/graph\`
- Branch management:
  - list branches (optionally remote)
  - create, checkout, delete (supports branch names with slashes)
- Conflicts:
  - detect conflicts
  - fetch conflict content
  - resolve conflicts (ours/theirs/manual)
- Merge + abort merge
- Reset to commit (hard/soft)

Additional "small" but important achievements:

- Auto-clone/init repo if git errors indicate "not a git repository"
- Normalizes repo URL to strip auth fragments and \`.git\`
- Uses project GitHub token stored in DB (after consent) for push/pull
- Tracks "platform commit":
  - updates \`workspaces.last_platform_commit\` after push/merge/reset

Frontend git UX:

Files:

- \`frontend-nextjs/app/components/workspace/GitPanel.tsx\`
- \`frontend-nextjs/app/components/workspace/CodeEditor.tsx\` (integration)
- plus supporting components (history graph, staging area, branches, merge, conflicts)

Implemented UI behaviors:

- Pull / Push buttons
- Staging UI + file diff viewing
- Commit & push dialog (requires staged files)
- Commit history graph (clickable, supports reset)
- Branch create/checkout/delete
- Merge UI + abort merge + conflict UI
- External commits warning and "reset to platform" action

---

## 12) GitHub consent + safety checks around PAT usage

Backend consent API:

File: \`ai_tutor_for_github_repositories/app/api/github_consent.py\`

Implemented behaviors:

- Validates PAT via GitHub \`/user\`
- Enforces that PAT belongs to the same username verified earlier (Task 1)
- Verifies token access to repo URL (Task 2)
- Verifies push permissions + latest commit readable
- Enforces commit consistency with Task 3 ("latest commit must match submitted commit")
- Stores:
  - \`github_access_token\` (note: comment says encrypt in production)
  - consent accepted + timestamp

---

## 13) Task sessions (base commit tracking for verification)

Backend:

File: \`ai_tutor_for_github_repositories/app/api/task_sessions.py\`

Implemented behavior:

- Start a task session:
  - ensures container is running
  - ensures repo is cloned into workspace
  - records a base commit for later diff/verification
- Complete a session (optionally stores current commit)
- Get session diff for verification

Frontend:

File: \`frontend-nextjs/app/components/workspace/CodeEditor.tsx\`

Implemented behavior:

- Starts a task session when workspace becomes available
- Completes session when task verification passes

---

## 14) AI-powered task verification (agent system)

Backend verification:

File: \`ai_tutor_for_github_repositories/app/api/task_verification.py\`

Implemented capabilities:

- \`POST /api/tasks/{task_id}/verify\`
  - Uses a verification agent (Groq + function calling)
  - Pulls context from:
    - current task description
    - current concept + day info
    - previous concept summaries (up to 5)
    - previous task descriptions (up to 5, excluding GitHub-related tasks)
  - Determines base/head commits:
    - prefers task session base commit
    - head from workspace git if possible, else GitHub default-branch head
  - Saves verification results into \`task_verification_results\`
  - Returns a structured response including:
    - pass/fail
    - requirements check
    - leetcode-style hints on failure
    - issues found + suggestions
    - test status + pattern match status
    - code quality label

Frontend verification UX:

Files:

- \`frontend-nextjs/app/components/workspace/CodeEditor.tsx\` (Verify action)
- \`frontend-nextjs/app/components/workspace/VerificationResults.tsx\` (Rendering)

Implemented behaviors:

- "Verify task" triggers backend verification
- On pass:
  - marks task complete in backend progress
  - completes task session
  - shows success
- On failure:
  - displays structured feedback, hints, issues, suggestions, and status badges

---

## 15) "Small-but-real" reliability and DX improvements you implemented

### 15.1 Resilience / retries / debugging

- \`execute_with_retry\` usage for Supabase read stability
- Dedicated debug endpoints for concept/task details
- Extensive logging across:
  - embedding pipeline step-by-step + performance metrics
  - roadmap service internal auth debugging
  - roadmap client request/response debug (403)
  - roadmap read endpoints logging content presence/length

### 15.2 Container lifecycle guards

In multiple places (files API, terminal API, task sessions):

- If container is not running:
  - start it
  - re-check status
  - fail gracefully if it cannot start

### 15.3 Mixed content avoidance in production

Frontend proxy routes ensure HTTPS frontend can talk to workspace VM:

- \`frontend-nextjs/app/api/workspaces/[...path]/route.ts\`
- \`frontend-nextjs/app/api/git/[...path]/route.ts\`
- \`frontend-nextjs/app/api/terminal/[...path]/route.ts\`
- \`frontend-nextjs/app/api/preview/[...path]/route.ts\`

---

## 16) CI/CD and deployment milestones you completed

Backend CI/CD documentation:

- \`ai_tutor_for_github_repositories/CI_CD_SETUP_COMPLETE.md\`

Key achievements:

- Cloud Build triggers disabled (GitHub Actions becomes single deployment source)
- GitHub workflows:
  - deploy workflow builds images + runs CI (lint/tests) + deploys Cloud Run + deploys VM service
  - rollback workflow for Cloud Run revisions
- Ruff lint/format and test verification steps documented

Deployment verification:

- \`DEPLOYMENT_SUMMARY.md\`
- \`DEPLOYMENT_VERIFICATION.md\`
- \`BACKEND_AUDIT_REPORT.md\`

Key achievements:

- Verified separation: LangGraph workflows only in roadmap service
- Service-to-service auth and troubleshooting workflow documented

Frontend deployment:

- \`frontend-nextjs/VERCEL_QUICK_START.md\`
- \`frontend-nextjs/VERCEL_DEPLOYMENT.md\`
- \`frontend-nextjs/CUSTOM_DOMAIN_SETUP.md\`

Key achievements:

- Vercel deployment instructions (monorepo root config)
- Clerk domain + redirect configuration guidance
- CORS guidance for production domains

---

## 17) Feature index (quick checklist)

### Backend

- [x] Project creation + validation
- [x] Day 0 initialization (themes, concepts, tasks)
- [x] Embedding pipeline (GitHub → chunks → Supabase → embeddings → Qdrant)
- [x] Roadmap generation delegation (HTTP + internal auth + identity token best-effort)
- [x] Roadmap read APIs (days, day details, concept details, task details, generation status, debug endpoints)
- [x] Progress tracking (day/concept/task), auto-completion logic, unlock next day
- [x] Lazy-loading support via \`user_current_concept_id\` + incremental generation triggers
- [x] Chatbot RAG (project-scoped, conversation history, roadmap context)
- [x] GitHub consent workflow (PAT validation, repo access, commit validation, consent storage)
- [x] Workspaces: create/start/stop/status/recreate, container ownership checks
- [x] File system CRUD inside container
- [x] Terminal sessions + WebSocket streaming
- [x] Preview proxy (proxy HTTP to container servers + server detection info)
- [x] Git operations inside container (status/diff/stage/commit/push/pull/branches/merge/conflicts/reset)
- [x] Task sessions (base commit) for verification
- [x] Task verification agent + persistence of results
- [x] Cleanup on project delete: destroys workspaces, deletes terminal sessions, deletes Qdrant points, deletes Supabase project
- [x] CI/CD + deployment docs (Cloud Run + VM + rollback)

### Frontend

- [x] Clerk auth integration
- [x] Dashboard + project creation UI
- [x] Roadmap UI (days strip + kanban + details)
- [x] Event-driven progress refresh
- [x] Chatbot widget with roadmap context
- [x] Workspace "IDE":
  - Monaco editor + save shortcut
  - File explorer CRUD + drag/drop move
  - Terminal (xterm) + reconnect + fit
  - Preview link detection + open preview
  - Git panel (staging, diffs, history graph, branches, merge/conflicts, push/pull)
  - Task verification UX + rich results display
  - External commits notification + reset
- [x] Next.js proxy routes to workspaces service (avoid mixed content)
- [x] Vercel deployment + custom domain docs

---

## 18) Notes (scope + honesty)

- This document lists **implemented** features verified by reading the repository.
- Some docs describe "next phases" (future work). Those are intentionally not counted as completed achievements unless code exists.`
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
  },

  "SubsGen": {
    projectTitle: "SubsGen - Instagram Subtitle Generator",
    content: `# SubsGen - Instagram Subtitle Generator

🎬 **Generate viral Instagram-style subtitles for your talking head videos. Free, fast, and trendy with word-by-word highlighting (Hormozi/CapCut style).**

**Live Demo:** [https://subsgen-frontend.vercel.app/](https://subsgen-frontend.vercel.app/)

## ✨ Features

- **🎬 Word-by-Word Highlighting** - Viral Hormozi/CapCut style subtitles
- **🎨 6 Unique Styles** - Choose from Hormozi, Minimal, Neon, Fire, Karaoke, Purple
- **🤖 AI-Powered** - Automatic speech recognition using Whisper AI
- **⚡ Fast Processing** - Optimized for speed with faster-whisper
- **🆓 100% Free** - No watermarks, no sign-up required
- **📱 Mobile Friendly** - Works on all devices

## 🎨 Subtitle Styles

| Style | Description | Best For |
|-------|-------------|----------|
| **Hormozi** | Yellow highlights on white text | Business, motivational content |
| **Minimal** | Clean white text | Professional, corporate |
| **Neon Glow** | Cyan/magenta glowing effect | Gaming, tech content |
| **Fire** | Orange/red highlights | High energy, sports |
| **Karaoke** | Green word highlights | Music, entertainment |
| **Purple Vibes** | Purple aesthetic | Lifestyle, beauty |

## 🏗️ Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | FastAPI + Python |
| Speech-to-Text | OpenAI Whisper (base model) |
| Video Processing | FFmpeg |
| Frontend | Next.js 14 + Tailwind CSS |
| Backend Hosting | Hugging Face Spaces (Docker) |
| Frontend Hosting | Vercel |

## 📁 Project Structure

\`\`\`
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
\`\`\`

## 🎯 How It Works

1. **Upload** - User uploads a video file (MP4, MOV, WebM)
2. **Style Selection** - Choose from 6 subtitle styles
3. **Processing** - Backend transcribes audio and generates subtitles
4. **Download** - Get the video with burned-in subtitles

## 🔌 API Integration

The frontend communicates with a FastAPI backend hosted on Hugging Face Spaces.

### Endpoint
\`\`\`
POST /api/process
\`\`\`

### Request
\`\`\`javascript
const formData = new FormData();
formData.append("video", file);
formData.append("style", "hormozi");

const response = await fetch(\`\${API_URL}/api/process\`, {
  method: "POST",
  body: formData,
});
\`\`\`

## ⚙️ Configuration

### Supported Video Formats
- MP4 (.mp4)
- QuickTime (.mov)
- WebM (.webm)
- AVI (.avi)

### Limits
- **Max file size**: 100MB
- **Max duration**: ~3 minutes (recommended)
- **Language**: English only

## Project Highlights

- **Full-Stack Architecture**: Next.js frontend with FastAPI backend
- **AI-Powered Transcription**: OpenAI Whisper for accurate speech recognition
- **Multiple Styles**: 6 trendy subtitle styles for different content types
- **Production Deployment**: Backend on HF Spaces, frontend on Vercel
- **Modern UI**: Responsive design with drag-and-drop upload`
  }
};
