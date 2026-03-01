from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
import random

app = FastAPI()

# CORS configuration to allow React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"status": "AI Service Online"}

@app.post("/api/chat")
def chat(request: ChatRequest):
    # Mock LLM Logic: Indonesia vs Abroad study advice
    user_msg = request.message.lower()
    
    response_text = ""
    
    if "abroad" in user_msg or "luar negeri" in user_msg:
        response_text = "Studying abroad offers global exposure, cultural diversity, and often access to cutting-edge research facilities. Popular destinations include UK (Oxford, Cambridge), US (Ivy League), and Australia. Consider looking into scholarships like LPDP."
    elif "indonesia" in user_msg or "dalam negeri" in user_msg:
        response_text = "Studying in Indonesia is cost-effective and allows you to build a strong local network. Top universities like UI, ITB, and UGM offer world-class education with increasing international partnerships."
    else:
        response_text = "I am your Academic AI Consultant. Ask me about studying in Indonesia vs Abroad, choosing major, or scholarship opportunities!"

    # Simulate streaming "thinking" delay
    return {
        "response": response_text,
        "timestamp": time.time()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
