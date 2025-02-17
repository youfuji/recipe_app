from fastapi import APIRouter, HTTPException
from app.services.gemini_service import get_gemini_response
from app.services.rakuten_service import get_recipe

router = APIRouter()

@router.post("/chat")
def chat_with_gemini(user_message: dict):
    """Gemini とのチャットAPI"""
    user_text = user_message.get("message", "")

    if not user_text:
        raise HTTPException(status_code=400, detail="メッセージが空です。")

    if "レシピ" in user_text or "作り方" in user_text:
        extract_food_message = f"{user_text}という文章から食べ物の単語だけを抽出して出力して"
        keyword = get_gemini_response(extract_food_message)
        recipe_info = get_recipe(keyword)
        print(recipe_info)
        return recipe_info

    else :
        response = get_gemini_response(user_text)
        messages = [{
        "message": response,
        "url": "",
        "image": ""
        }]
        print(messages)
        print(type(messages))
        return messages