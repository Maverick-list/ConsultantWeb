from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
import os
import google.generativeai as genai

app = FastAPI()

# CORS configuration to allow React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for Vercel deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
genai.configure(api_key=os.environ.get("GEMINI_API_KEY", "Your defaults API Key"))
model = genai.GenerativeModel('gemini-1.5-flash')

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"status": "AI Service Online"}

@app.post("/api/chat")
def chat(request: ChatRequest):
    user_msg = request.message
    
    prompt = f"""
    Kamu adalah seorang AI Consultant ahli yang ramah dan berpengetahuan luas tentang pendidikan, beasiswa, dan universitas baik di dalam maupun luar negeri. 
    Kamu bertugas membantu pelajar (student) yang menggunakan platform 'StudentPro', sebuah Web Konsultasi Hukum dan Akademik, untuk menjawab berbagai pertanyaan mengenai pendidikan mereka.
    Berikan jawaban yang ringkas, membantu, terstruktur dengan baik (menggunakan bullet points jika perlu), dan gunakan bahasa Indonesia yang asik, suportif, dan mudah dipahami.
    
    Pertanyaan user: "{user_msg}"
    """
    
    try:
        response = model.generate_content(prompt)
        response_text = response.text
    except Exception as e:
        print(f"Gemini API Error: {str(e)}")
        response_text = "Mohon maaf, saya tidak dapat merespon saat ini karena batas limit (quota) API telah habis atau model belum tersedia untuk akun ini. Silakan periksa pengaturan Google AI Studio Anda."

    return {
        "response": response_text,
        "timestamp": time.time()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
