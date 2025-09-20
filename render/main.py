from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class AssistantRequest(BaseModel):
    messages: list[dict]

@app.get("/")
async def root():
    return {"ok": True, "service": "assistant-proxy"}

@app.post("/api/assistant")
async def assistant(req: AssistantRequest):
    last = req.messages[-1]["content"] if req.messages else ""
    if "song popularity" in last.lower():
        content = "The Song Popularity pipeline uses features + gradient models + FastAPI."
    else:
        content = "Hello from FastAPI mock assistant."
    return {"ok": True, "message": {"role": "assistant", "content": content}}
