# GitGuide — End-to-End Project Documentation (Complete Feature & Achievement Log)

This document is a **full end-to-end** walkthrough of what has been built in this repository, based strictly on **implemented code + existing docs** inside:

- Backend: `ai_tutor_for_github_repositories/`
- Frontend: `frontend-nextjs/`

It is written to capture **every small functionality and milestone** that exists in the repo, including “small fixes” and infrastructure work.

---

## 1) What GitGuide is (product definition)

GitGuide is an AI-powered learning platform that turns a GitHub repository into:

- A **structured learning roadmap** (days → concepts → tasks)
- A **repo-aware chatbot** (RAG) that answers questions using the repo’s content
- A **hands-on workspace** powered by Docker containers (file operations + terminal + git + preview proxy)

---

## 2) High-level architecture (how the system is split)

### 2.1 Frontend

- **Next.js 16 / React 19 / TypeScript** app in `frontend-nextjs/`
- Uses **Clerk** for authentication
- Provides:
  - Dashboard + project creation
  - Roadmap UI (days/concepts/tasks + kanban)
  - Chat widget
  - Workspace “IDE” (Monaco editor + file explorer + terminal + git + verification UX)
- Includes **proxy routes** under `frontend-nextjs/app/api/*` to forward calls to the workspace service, avoiding mixed-content issues.

### 2.2 Backend

The backend is intentionally split into **3 runtime services** (mirrored locally via Docker Compose):

1. **Main API service** (`app/main.py`)
   - User + projects + roadmap read APIs
   - Progress tracking
   - Embedding pipeline (chunking → store chunks → embeddings → Qdrant upsert)
   - RAG chatbot (repo-grounded answers)
   - Delegates LangGraph roadmap generation to the roadmap service via HTTP

2. **Roadmap service** (`app/roadmap_service.py`)
   - Dedicated service for LLM-heavy roadmap generation workflows
   - Supports internal endpoints protected by internal auth tokens
   - Runs LangGraph workflows in isolation (documented as a verified migration)

3. **Workspaces service** (`app/workspace_service.py`)
   - Runs where Docker access exists (VM in prod, Docker Compose in local dev)
   - Manages per-user/per-project containers
   - File system CRUD in containers
   - Terminal sessions via WebSocket to containers
   - Git operations inside containers (status/diff/stage/commit/push/pull/branches/merge/conflicts/reset)
   - Preview proxy for running dev servers inside containers

---

## 3) Local development: end-to-end setup you enabled

### 3.1 Local backend matches prod topology

Documented in `ai_tutor_for_github_repositories/LOCAL_DEVELOPMENT.md`:

- Local Docker Compose mirrors GCP:
  - `api` → `localhost:8000`
  - `roadmap` → `localhost:8001`
  - `workspaces` → `localhost:8002`

### 3.2 Local frontend connects automatically

Documented in `frontend-nextjs/QUICK_START_LOCAL.md` + `frontend-nextjs/LOCAL_BACKEND_CONNECTION.md`:

- Frontend defaults (dev):
  - Main API → `http://localhost:8000`
  - Workspaces service → `http://localhost:8002`
- Next.js proxy routes forward:
  - `app/api/workspaces/[...path]` → workspaces service
  - `app/api/terminal/[...path]` → workspaces service
  - `app/api/preview/[...path]` → workspaces service
  - `app/api/git/[...path]` → workspaces service

---

## 4) Authentication and authorization: what’s implemented

### 4.1 Clerk JWT verification

- Backend routes generally require Clerk auth via `verify_clerk_token`.
- Terminal WebSocket supports token auth via query param:
  - `verify_clerk_token_from_string(token)`

### 4.2 Ownership checks on every critical resource

Across APIs, ownership is checked by:

- Mapping Clerk user → Supabase `User` record (`User.clerk_user_id` → `User.id`)
- Verifying:
  - Project belongs to user
  - Workspace belongs to user
  - Task session belongs to user

---

## 5) Core user journey: Project → Embeddings → Roadmap → Learning

### 5.1 Create project (backend)

File: `ai_tutor_for_github_repositories/app/api/projects.py`

Implemented behavior:

- Validates GitHub URL format
- Inserts project with:
  - `skill_level` (beginner/intermediate/advanced)
  - `target_days` (7–30)
  - `status = created`
- Immediately initializes **Day 0** content (see 5.2)
- Schedules the embedding pipeline as a **background task**
- Extensive timing logs track how long each phase takes

### 5.2 Day 0 initialization (a concrete achievement)

File: `ai_tutor_for_github_repositories/app/api/projects.py`

Implemented behavior:

- Inserts Day 0 into `roadmap_days` if missing
- Inserts Day 0 concepts into `concepts` with:
  - content sanitized via `sanitize_markdown_content`
- Inserts Day 0 tasks into `tasks`
- Marks Day 0 as `generated`
- Has a dedicated endpoint: `POST /api/projects/{project_id}/initialize-day0`
- Guards to prevent re-initializing a fully generated Day 0

### 5.3 Embedding pipeline (end-to-end)

File: `ai_tutor_for_github_repositories/app/services/embedding_pipeline.py`

Pipeline steps you implemented:

1. Set project status → `processing`
2. Fetch repository files from GitHub (`fetch_repository_files`)
3. Chunk files into text chunks (`chunk_files`) using a threadpool to avoid blocking
4. Store chunks to Supabase (`store_chunks`) using a threadpool
5. Generate embeddings (`embedding_service.embed_texts`) using a threadpool
6. Upsert embeddings into Qdrant with metadata (file_path, language) using a threadpool
7. Set project status → `ready`
8. Trigger roadmap generation by delegating to the roadmap service

“Small achievements” inside this pipeline:

- Timing logs for each step and total “from user click”
- Repository size metrics (KB/MB) and throughput logs
- A time-estimation formula output based on observed speed
- Failure handling:
  - sets project `status=failed`
  - stores a truncated `error_message`

### 5.4 Roadmap generation delegation (service-to-service)

Files:

- `ai_tutor_for_github_repositories/app/services/roadmap_client.py`
- Roadmap service entry: `ai_tutor_for_github_repositories/app/roadmap_service.py`

Implemented behavior:

- Main API calls internal roadmap endpoints over HTTP:
  - Full generation: `/api/roadmap/generate-internal`
  - Incremental generation: `/api/roadmap/incremental-generate`
- Authentication:
  - Always uses `X-Internal-Token`
  - Attempts Cloud Run identity token via metadata server (best-effort; falls back in local dev)
- Deep logging around:
  - tokens present/length (masked)
  - 403 debug output

Notable “minute fix” documented in repo:

- **403 fix** for header normalization (Starlette lowercases headers)
  - Roadmap service checks multiple header variants (`X-Internal-Token`, `x-internal-token`, etc.)
  - Logged in `AUTH_403_FIX.md`

---

## 6) Roadmap reading APIs (what the frontend consumes)

File: `ai_tutor_for_github_repositories/app/api/roadmap.py`

Implemented endpoints:

- `GET /api/roadmap/{project_id}`
  - returns all days for the project (including estimated minutes + generated status)
- `GET /api/roadmap/{project_id}/day/{day_id}`
  - returns day metadata + concepts (including content if present)
  - includes retry wrapper `execute_with_retry` for stability
  - logs concept content presence/length for debugging
- `GET /api/roadmap/{project_id}/concept/{concept_id}`
  - returns concept + tasks
  - logs content presence/preview + task list debugging output
- `GET /api/roadmap/{project_id}/generation-status`
  - returns status counts (pending/generating/generated/failed), progress %, completion flags
- Debug utilities:
  - `GET /api/roadmap/{project_id}/concept/{concept_id}/debug`
  - `GET /api/roadmap/task/{task_id}` for joined task+concept+day+project details

---

## 7) Progress tracking + “event-driven” generation

### 7.1 Backend progress tracking

File: `ai_tutor_for_github_repositories/app/api/progress.py`

Implemented behaviors:

- Progress retrieval across:
  - day progress (`user_day_progress`)
  - concept progress (`user_concept_progress`)
  - task progress (`user_task_progress`)
- Auto-initialize Day 0 progress to `todo` when needed

Concept tracking:

- `POST /api/progress/{project_id}/concept/{concept_id}/start`
  - sets concept `doing` + `started_at`
- `POST /api/progress/{project_id}/concept/{concept_id}/content-read`
  - sets `content_read=true` (creates progress record if missing)
- `POST /api/progress/{project_id}/concept/{concept_id}/complete`
  - sets concept `done` + `completed_at`
  - updates `projects.user_current_concept_id`
  - triggers incremental generation (background task)
  - checks if day can be auto-completed

Day tracking:

- `POST /api/progress/{project_id}/day/{day_id}/start`
- `POST /api/progress/{project_id}/day/{day_id}/complete`
  - completes day + unlocks next day

Task tracking (including Day 0 custom fields):

- `POST /api/progress/{project_id}/task/{task_id}/start`
- `POST /api/progress/{project_id}/task/{task_id}/complete`
  - stores special fields for Day 0:
    - github username
    - user repo URL
    - commit SHA validation
  - auto-completes concept when:
    - all tasks done AND content read
    - (or no tasks + content read)
  - auto-completes day when all concepts completed

Lazy-loading / sliding window mechanics:

- `PUT /api/progress/{project_id}/current-concept`
- `GET /api/progress/{project_id}/current-concept`
- `GET /api/progress/{project_id}/current` (derives current day + concept)

### 7.2 Frontend progress event system

File: `frontend-nextjs/app/components/roadmap/RoadmapPage.tsx`

Implemented behaviors:

- Roadmap page listens for window events:
  - `progress:task:completed`
  - `progress:concept:completed`
  - `progress:content:read`
- Uses those events to trigger `refetchProgress()` (keeps UI consistent)
- Keeps selection aligned with “current concept/day” when progress updates

---

## 8) Repo-aware chatbot (RAG) end-to-end

### 8.1 Backend chatbot API

File: `ai_tutor_for_github_repositories/app/api/chatbot.py`

Implemented behaviors:

- `POST /api/chatbot/{project_id}/chat`
  - Requires project `status == ready` (embeddings exist)
  - Accepts:
    - user message
    - conversation history (validated roles)
    - roadmap context (day/theme/concept/subconcept)
  - Enhances query with roadmap context string
  - Calls `generate_rag_response(project_id, query, conversation_history)`
  - Returns:
    - response text
    - chunks used (for grounding/traceability)
- `POST /api/chatbot/test`
  - No auth test endpoint for direct Gemini connectivity validation

### 8.2 Frontend chatbot widget

File: `frontend-nextjs/app/components/chatbot/ChatbotWidget.tsx`

Implemented behaviors:

- Collapsible floating chat widget
- Uses Clerk token via `useAuth().getToken()`
- Sends:
  - message
  - conversation history
  - roadmap context (day/theme/concept)
- Shows:
  - typing indicator
  - error UI
  - auto-scroll to latest messages

---

## 9) Workspaces: “Cloud IDE” features implemented end-to-end

### 9.1 Workspace lifecycle

Backend:

- Workspaces are created and managed via the workspaces service (`app/workspace_service.py` + `app/api/workspaces.py`)
- `POST /api/workspaces/create` supports “get or create” semantics

Frontend:

- `frontend-nextjs/app/components/workspace/CodeEditor.tsx` calls:
  - `getOrCreateWorkspace(projectId, token)`
- Shows “Spawning your container…” loading state

### 9.2 File system operations inside containers (Phase 0)

Backend file APIs:

File: `ai_tutor_for_github_repositories/app/api/files.py`

Endpoints implemented:

- `GET /api/workspaces/{workspace_id}/files?path=/workspace`
- `GET /api/workspaces/{workspace_id}/files/content?path=...`
- `PUT /api/workspaces/{workspace_id}/files/content` (write file)
- `POST /api/workspaces/{workspace_id}/files` (create file or directory)
- `DELETE /api/workspaces/{workspace_id}/files?path=...`
- `POST /api/workspaces/{workspace_id}/files/rename` (rename/move)

Important behavior:

- Ownership checks per workspace
- Automatically starts container if stopped before file operations

Frontend file UX:

Files:

- `frontend-nextjs/app/components/workspace/FileExplorer.tsx`
- `frontend-nextjs/app/components/workspace/MonacoEditor.tsx`
- `frontend-nextjs/app/components/workspace/CodeEditor.tsx`

Implemented behaviors:

- Explorer lists `/workspace` root
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

File: `ai_tutor_for_github_repositories/app/api/terminal.py`

Implemented capabilities:

- Create/list/delete terminal sessions
- WebSocket connection endpoint:
  - `GET /api/terminal/{workspace_id}/connect?token=...&session_id=...`
- Handles:
  - input messages
  - resize messages
  - output streaming
- Includes defensive container checks:
  - verifies actual Docker status
  - starts/recreates containers when needed

Frontend terminal:

File: `frontend-nextjs/app/components/workspace/Terminal.tsx`

Implemented behaviors:

- xterm.js + FitAddon + WebLinksAddon
- Dynamic imports to avoid SSR issues
- ResizeObserver to fit terminal on layout changes
- Auto reconnect with exponential backoff via `useTerminal` hook
- Writes output to xterm + forwards keystrokes to backend WebSocket

---

## 10) Preview proxy (run dev servers inside container and open a link)

Backend preview proxy:

File: `ai_tutor_for_github_repositories/app/api/preview.py`

Implemented behaviors:

- `/{workspace_id}/{port}/{path}` proxies to container internal server
- Supports multiple HTTP methods
- `GET /{workspace_id}/info` returns preview URLs based on environment:
  - Local: host ports like `http://localhost:<mapped>`
  - Production: proxy URLs derived from forwarded host/proto
- `GET /{workspace_id}/servers` lists detected servers and their preview URLs

Frontend preview UX:

Files:

- `frontend-nextjs/app/components/workspace/PreviewPortsPanel.tsx`
- `frontend-nextjs/app/components/workspace/CodeEditor.tsx` (Preview dialog + Open Preview button)

Implemented behaviors:

- Polls every 5 seconds for detected preview servers
- Displays “Open preview” buttons per detected server
- Includes a “Recreate container with port mappings” repair action

Infrastructure milestone (documented):

- `ai_tutor_for_github_repositories/PREVIEW_PROXY_SETUP.md`
- `ai_tutor_for_github_repositories/SETUP_PREVIEW_PROXY.md`
  - documents LB/SSL setup and the required env vars:
    - `WORKSPACE_PUBLIC_BASE_URL=https://workspaces.gitguide.dev`
    - `ENVIRONMENT=production`

---

## 11) Git integration inside workspace containers

Backend git API:

File: `ai_tutor_for_github_repositories/app/api/git.py`

Implemented features:

- Status:
  - `GET /api/git/{workspace_id}/status`
- Diffs:
  - `GET /api/git/{workspace_id}/diff`
  - `GET /api/git/{workspace_id}/diff/{file_path}?staged=...`
- Staging:
  - `POST /api/git/{workspace_id}/stage`
  - `POST /api/git/{workspace_id}/unstage`
- Commit:
  - `POST /api/git/{workspace_id}/commit`
- Push/Pull (with token):
  - `POST /api/git/{workspace_id}/push`
  - `POST /api/git/{workspace_id}/pull`
  - pull supports uncommitted-handling strategies:
    - commit | stash | discard
- Commit history:
  - `GET /api/git/{workspace_id}/commits`
  - `GET /api/git/{workspace_id}/commits/graph`
- Branch management:
  - list branches (optionally remote)
  - create, checkout, delete (supports branch names with slashes)
- Conflicts:
  - detect conflicts
  - fetch conflict content
  - resolve conflicts (ours/theirs/manual)
- Merge + abort merge
- Reset to commit (hard/soft)

Additional “small” but important achievements:

- Auto-clone/init repo if git errors indicate “not a git repository”
- Normalizes repo URL to strip auth fragments and `.git`
- Uses project GitHub token stored in DB (after consent) for push/pull
- Tracks “platform commit”:
  - updates `workspaces.last_platform_commit` after push/merge/reset

Frontend git UX:

Files:

- `frontend-nextjs/app/components/workspace/GitPanel.tsx`
- `frontend-nextjs/app/components/workspace/CodeEditor.tsx` (integration)
- plus supporting components (history graph, staging area, branches, merge, conflicts)

Implemented UI behaviors:

- Pull / Push buttons
- Staging UI + file diff viewing
- Commit & push dialog (requires staged files)
- Commit history graph (clickable, supports reset)
- Branch create/checkout/delete
- Merge UI + abort merge + conflict UI
- External commits warning and “reset to platform” action

---

## 12) GitHub consent + safety checks around PAT usage

Backend consent API:

File: `ai_tutor_for_github_repositories/app/api/github_consent.py`

Implemented behaviors:

- Validates PAT via GitHub `/user`
- Enforces that PAT belongs to the same username verified earlier (Task 1)
- Verifies token access to repo URL (Task 2)
- Verifies push permissions + latest commit readable
- Enforces commit consistency with Task 3 (“latest commit must match submitted commit”)
- Stores:
  - `github_access_token` (note: comment says encrypt in production)
  - consent accepted + timestamp

---

## 13) Task sessions (base commit tracking for verification)

Backend:

File: `ai_tutor_for_github_repositories/app/api/task_sessions.py`

Implemented behavior:

- Start a task session:
  - ensures container is running
  - ensures repo is cloned into workspace
  - records a base commit for later diff/verification
- Complete a session (optionally stores current commit)
- Get session diff for verification

Frontend:

File: `frontend-nextjs/app/components/workspace/CodeEditor.tsx`

Implemented behavior:

- Starts a task session when workspace becomes available
- Completes session when task verification passes

---

## 14) AI-powered task verification (agent system)

Backend verification:

File: `ai_tutor_for_github_repositories/app/api/task_verification.py`

Implemented capabilities:

- `POST /api/tasks/{task_id}/verify`
  - Uses a verification agent (Groq + function calling)
  - Pulls context from:
    - current task description
    - current concept + day info
    - previous concept summaries (up to 5)
    - previous task descriptions (up to 5, excluding GitHub-related tasks)
  - Determines base/head commits:
    - prefers task session base commit
    - head from workspace git if possible, else GitHub default-branch head
  - Saves verification results into `task_verification_results`
  - Returns a structured response including:
    - pass/fail
    - requirements check
    - leetcode-style hints on failure
    - issues found + suggestions
    - test status + pattern match status
    - code quality label

Frontend verification UX:

Files:

- `frontend-nextjs/app/components/workspace/CodeEditor.tsx` (Verify action)
- `frontend-nextjs/app/components/workspace/VerificationResults.tsx` (Rendering)

Implemented behaviors:

- “Verify task” triggers backend verification
- On pass:
  - marks task complete in backend progress
  - completes task session
  - shows success
- On failure:
  - displays structured feedback, hints, issues, suggestions, and status badges

---

## 15) “Small-but-real” reliability and DX improvements you implemented

### 15.1 Resilience / retries / debugging

- `execute_with_retry` usage for Supabase read stability
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

- `frontend-nextjs/app/api/workspaces/[...path]/route.ts`
- `frontend-nextjs/app/api/git/[...path]/route.ts`
- `frontend-nextjs/app/api/terminal/[...path]/route.ts`
- `frontend-nextjs/app/api/preview/[...path]/route.ts`

---

## 16) CI/CD and deployment milestones you completed

Backend CI/CD documentation:

- `ai_tutor_for_github_repositories/CI_CD_SETUP_COMPLETE.md`

Key achievements:

- Cloud Build triggers disabled (GitHub Actions becomes single deployment source)
- GitHub workflows:
  - deploy workflow builds images + runs CI (lint/tests) + deploys Cloud Run + deploys VM service
  - rollback workflow for Cloud Run revisions
- Ruff lint/format and test verification steps documented

Deployment verification:

- `DEPLOYMENT_SUMMARY.md`
- `DEPLOYMENT_VERIFICATION.md`
- `BACKEND_AUDIT_REPORT.md`

Key achievements:

- Verified separation: LangGraph workflows only in roadmap service
- Service-to-service auth and troubleshooting workflow documented

Frontend deployment:

- `frontend-nextjs/VERCEL_QUICK_START.md`
- `frontend-nextjs/VERCEL_DEPLOYMENT.md`
- `frontend-nextjs/CUSTOM_DOMAIN_SETUP.md`

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
- [x] Lazy-loading support via `user_current_concept_id` + incremental generation triggers
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
- [x] Workspace “IDE”:
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
- Some docs describe “next phases” (future work). Those are intentionally not counted as completed achievements unless code exists.

