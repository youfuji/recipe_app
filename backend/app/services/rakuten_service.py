import time
import requests
from app.config import RAKUTEN_API_KEY

def get_category_id(keyword: str):
    """楽天レシピのカテゴリ一覧を取得し、キーワードに合うカテゴリIDを3つ探す"""
    time.sleep(1.5)  # 1.5秒の遅延
    url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426"
    params = {"format": "json", "applicationId": RAKUTEN_API_KEY}

    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        categories = data.get("result", {}).get("medium", [])

        matched_categories = [
            (category["parentCategoryId"], category["categoryId"])
            for category in categories if keyword in category["categoryName"]
        ]

        return matched_categories[:3]  # 上位3つ取得

    return []

def get_recipe(keyword: str):
    """カテゴリIDを使って楽天レシピのランキングを取得"""
    print(f"入力されたキーワード: {keyword}")
    category_ids = get_category_id(keyword)

    recipes_by_category = []

    if not category_ids:
        recipes_by_category.append({"message": "レシピのカテゴリが見つかりませんでした。","url": "",
        "image": ""})

    for parent_id, category_id in category_ids:
        full_category_id = f"{parent_id}-{category_id}"
        print(f"取得したカテゴリID: {full_category_id}")

        url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426"
        params = {"format": "json", "applicationId": RAKUTEN_API_KEY, "categoryId": full_category_id}

        response = requests.get(url, params=params)
        time.sleep(1)  # API制限回避

        if response.status_code == 429:
            print("429エラー: API制限に達しました。5秒待機...")
            time.sleep(5)
            return get_recipe(keyword)

        if response.status_code == 200:
            data = response.json()
            recipes = data.get("result", [])

            if not recipes:
                recipes_by_category.append({"message": "レシピが見つかりませんでした。","url": "","image": ""})
                continue

            print(recipes[0]['recipeUrl'])
            # recipe_texts = [f"{recipe['recipeTitle']}: {recipe['recipeUrl']}: {recipe['foodImageUrl']}" for recipe in recipes[:3]]
            # recipes_by_category.append(f"カテゴリ {full_category_id} のおすすめレシピ:\n" + "\n".join(recipe_texts))
            recipes_by_category.append({
                "message": f"{recipes[0]['recipeTitle']}",
                "url": recipes[0]['recipeUrl'],
                "image": recipes[0]['foodImageUrl']
            })

        else:
            recipes_by_category.append({"message": "レシピを取得できませんでした。"})

    #print(recipes_by_category)
    return recipes_by_category