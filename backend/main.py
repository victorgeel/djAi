from fastapi import FastAPI, HTTPException
import requests
import os

app = FastAPI()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

@app.get("/")
def home():
    return {"message": "Gemini Image Processing API is running"}

@app.post("/process-image")
def process_image(image_url: str, prompt: str):
    if not image_url or not prompt:
        raise HTTPException(status_code=400, detail="Missing image_url or prompt")

    headers = {"Authorization": f"Bearer {GEMINI_API_KEY}"}
    response = requests.post(
        "https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent",
        json={"image_url": image_url, "prompt": prompt},
        headers=headers
    )

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Gemini API request failed")

    return response.json()
