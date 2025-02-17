from fastapi import APIRouter, HTTPException
from app.services.rakuten_service import get_recipe

router = APIRouter()

@router.get("/chat/recipe")
def fetch_recipe(keyword: str):
    """楽天レシピの検索API"""
    recipes = get_recipe(keyword)
    if not recipes:
        raise HTTPException(status_code=404, detail="レシピが見つかりませんでした。")
    return {"keyword": keyword, "results": recipes}
