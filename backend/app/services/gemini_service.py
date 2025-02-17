import google.generativeai as genai
from app.config import GOOGLE_API_KEY

# Gemini API の設定
genai.configure(api_key=GOOGLE_API_KEY)
chat = genai.GenerativeModel("gemini-pro").start_chat()

def get_gemini_response(user_text: str) -> str:
    """Gemini API を使ってメッセージに応答"""
    response = chat.send_message(user_text)
    return response.text.strip()