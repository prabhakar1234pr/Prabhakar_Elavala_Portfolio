# job-search-mcp

MCP server for searching AI/ML jobs across multiple job boards (Greenhouse, Lever, and Adzuna).

## Features

- **Greenhouse Search**: Search jobs on Greenhouse boards across multiple AI/ML companies
- **Lever Search**: Search jobs on Lever boards across multiple companies
- **Adzuna Search**: Search across all major job boards (Indeed, Monster, company sites, etc.)
- **Job Details**: Fetch full job descriptions from any URL
- **Resume Tailoring**: AI-powered analysis that extracts job requirements and suggests how to tailor your resume
- **Referral Helper**: Generate personalized outreach messages and strategies for getting referrals

## Installation

This project uses `uv` as the package manager.

```bash
# Install uv if you haven't already
pip install uv

# Initialize and sync dependencies
uv sync
```

## Configuration

### Get Adzuna API Credentials (Free)

1. Sign up at https://developer.adzuna.com/
2. Get your App ID and API Key
3. Add them to your Claude Desktop configuration (see below)

### Adding to Claude Desktop

Add this configuration to your Claude Desktop config file:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`  
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "job-search-mcp": {
      "command": "uv",
      "args": ["run", "python", "-m", "mcp_server.server"],
      "cwd": "C:\\apply_jobs",
      "env": {
        "ADZUNA_APP_ID": "your_app_id_here",
        "ADZUNA_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

**Note**: Replace `your_app_id_here` and `your_api_key_here` with your actual Adzuna credentials.

After configuration, restart Claude Desktop.

## MCP Tools

### `search_greenhouse_jobs`

Search for jobs on Greenhouse job boards across multiple AI/ML companies.

**Parameters:**
- `keywords` (required): Job title keywords (e.g., "AI Engineer", "Machine Learning")
- `location` (optional): Location filter (e.g., "San Francisco", "Remote")
- `companies` (optional): List of company board names to search

**Default companies searched:**
- anthropic, scale, perplexity, cohere, wandb, huggingface, replicate, modal

**Example:**
```
Search for "AI Engineer" jobs at Anthropic and Scale
```

### `search_lever_jobs`

Search for jobs on Lever job boards across multiple companies.

**Parameters:**
- `keywords` (required): Job title keywords
- `location` (optional): Location filter
- `companies` (optional): List of company names to search

**Default companies searched:**
- cohere, together, runwayml, pinecone

**Example:**
```
Search for "Machine Learning" jobs on Lever boards
```

### `search_adzuna_jobs`

Search across all major job boards using Adzuna aggregator (searches Indeed, Monster, company sites, etc.).

**Parameters:**
- `keywords` (required): Job search query (e.g., "AI Engineer Python")
- `location` (optional): Location (e.g., "San Francisco", "New York", "Remote")
- `results_per_page` (optional): Number of results (default 20, max 50)
- `page` (optional): Page number for pagination (default 1)
- `salary_min` (optional): Minimum salary filter (annual)
- `max_days_old` (optional): Only jobs posted within this many days (default 7)

**Example:**
```
Search Adzuna for "AI Engineer" jobs in "Boston" with minimum salary $120,000
```

### `get_job_details`

Fetch full job description from any job posting URL.

**Parameters:**
- `job_url` (required): Full URL of the job posting

**Example:**
```
Get details for https://boards.greenhouse.io/anthropic/jobs/12345
```

### `tailor_resume_for_job`

Analyze a job posting and get personalized recommendations for tailoring your resume. Extracts key requirements, matches against your skills, and provides specific suggestions.

**Parameters:**
- `job_url` (required): URL of the job posting
- `your_skills` (required): Array of your skills (e.g., ["Python", "Machine Learning", "AWS"])
- `your_experience_years` (optional): Your years of relevant experience

**What it does:**
- Extracts required skills and keywords from job description
- Matches your skills against job requirements
- Identifies skills you should highlight
- Suggests keywords to add to your resume
- Provides specific resume tailoring recommendations
- Flags experience level mismatches

**Example:**
```
Tailor my resume for this AI Engineer job: [URL]
My skills: Python, TensorFlow, AWS, Docker
Experience: 3 years
```

### `find_referrals`

Generate personalized outreach message templates for requesting referrals. Provides strategies for finding connections and crafting effective messages.

**Parameters:**
- `company_name` (required): Name of the company
- `job_title` (required): Job title you're applying for
- `your_background` (required): Brief description of your background (e.g., "ML Engineer with 3 years experience in NLP")
- `connection_name` (optional): Name of specific person you want to reach out to

**What it provides:**
- Step-by-step strategy for finding connections on LinkedIn
- 4 different message templates (for different scenarios)
- Best practices and timing tips
- Pro tips and red flags to avoid
- Action items checklist

**Example:**
```
Help me find referrals at Anthropic for the AI Engineer role
My background: ML Engineer with 3 years experience in LLMs and PyTorch
```

## Running Standalone

You can also run the MCP server directly:

```bash
uv run python -m mcp_server.server
```

## Supported Job Boards

### Direct API Access
- **Greenhouse**: Public job boards API (no auth required)
- **Lever**: Public job boards API (no auth required)

### Aggregated Search
- **Adzuna**: Aggregates jobs from Indeed, Monster, CareerBuilder, company sites, and more (requires free API key)

## Project Structure

```
.
├── mcp_server/
│   └── server.py          # Main MCP server implementation
├── pyproject.toml         # uv package config
├── README.md              # This file
└── data/                  # User data (profile, snippets)
```

## Example Usage with Claude

Once configured, you can ask Claude:

**Job Search:**
- "Search for AI Engineer jobs at Anthropic and OpenAI"
- "Find Machine Learning jobs in San Francisco with salary over $150k"
- "Show me remote Data Scientist positions posted in the last 3 days"
- "Get details for this job: [URL]"

**Resume Tailoring:**
- "Analyze this job posting and tell me how to tailor my resume: [URL]"
- "What skills should I highlight for this AI Engineer role?"
- "Compare my skills [Python, ML, AWS] against this job: [URL]"

**Getting Referrals:**
- "Help me find referrals at Anthropic for the AI Engineer position"
- "Generate an outreach message for someone at OpenAI"
- "I want to reach out to John Doe at Google for a referral, help me craft a message"

## Notes

- Greenhouse and Lever searches target specific AI/ML companies
- Adzuna provides broader search across all job boards
- All searches respect rate limits and ToS
- Results are limited to 20 per request to avoid overwhelming output

## Troubleshooting

### "Adzuna API credentials not configured"
- Make sure you've added `ADZUNA_APP_ID` and `ADZUNA_API_KEY` to your Claude Desktop config
- Restart Claude Desktop after updating the config
- Get credentials at https://developer.adzuna.com/

### No results returned
- Try broader keywords (e.g., "engineer" instead of "senior staff engineer")
- Increase `max_days_old` parameter for Adzuna searches
- Check if the company boards are active (some companies may not use Greenhouse/Lever)

### Server not appearing in Claude Desktop
- Verify the `cwd` path points to your project directory
- Check that Python and uv are properly installed
- Restart Claude Desktop completely (quit and reopen)
- Check Claude Desktop logs for errors

## License

Proprietary - Personal use only
