# from fastapi import APIRouter, Depends, HTTPException, status
# from fastapi.responses import JSONResponse


# router = APIRouter()



# @router.get("/")
# def food():
#     return {"Hello":"World!"}
# # (省略)



# import time
# import os
# import requests
# from dotenv import load_dotenv
# import google.generativeai as genai

# # .envファイルの読み込み
# load_dotenv()

# # API-KEYの設定
# GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
# RAKUTEN_API_KEY = os.getenv('RAKUTEN_API_KEY')  # 楽天APIキーを環境変数から取得
# genai.configure(api_key=GOOGLE_API_KEY)

# # チャットセッションの作成
# chat = genai.GenerativeModel("gemini-pro").start_chat()


# def get_category_id(keyword):
#     """楽天レシピのカテゴリ一覧を取得し、キーワードに合うカテゴリIDを3つ探す"""
#     time.sleep(1.5)  # 1.5秒の遅延
#     url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426"
#     params = {
#         "format": "json",
#         "applicationId": RAKUTEN_API_KEY,
#     }
    
#     response = requests.get(url, params=params)
    
#     if response.status_code == 200:
#         data = response.json()
#         categories = data.get("result", {}).get("medium", [])  
        
#         matched_categories = []
        
#         for category in categories:
#             if keyword in category["categoryName"]:  # キーワードがカテゴリ名に含まれるか
#                 matched_categories.append((category["parentCategoryId"], category["categoryId"]))
                
#             if len(matched_categories) == 3:  # 上位3つ取得
#                 break
        
#         return matched_categories
    
#     return []  # 見つからなかった場合


# def get_recipe(keyword):
#     """カテゴリIDを使って楽天レシピのランキングを取得（上位3つのカテゴリで検索）"""
#     print(f"入力されたキーワード: {keyword}")
#     category_ids = get_category_id(keyword)
    
#     if not category_ids:
#         return "レシピのカテゴリが見つかりませんでした。"

#     recipes_by_category = []
    
#     for parent_id, category_id in category_ids:
#         full_category_id = f"{parent_id}-{category_id}"
#         print(f"取得したカテゴリID: {full_category_id}")

#         url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426"
#         params = {
#             "format": "json",
#             "applicationId": RAKUTEN_API_KEY,
#             "categoryId": full_category_id,
#         }

#         response = requests.get(url, params=params)
#         time.sleep(1)  # API制限回避のため1秒待機

#         if response.status_code == 429:
#             print("429エラー: API制限に達しました。5秒待機します...")
#             time.sleep(5)
#             return get_recipe(keyword)  # 再試行
        
#         if response.status_code == 200:
#             data = response.json()
#             recipes = data.get("result", [])

#             if not recipes:
#                 recipes_by_category.append(f"カテゴリ {full_category_id}: レシピが見つかりませんでした。")
#                 continue

#             # 最初の3つのレシピ情報を取得
#             recipe_texts = [f"{recipe['recipeTitle']}: {recipe['recipeUrl']}" for recipe in recipes[:3]]
#             recipes_by_category.append(f"カテゴリ {full_category_id} のおすすめレシピ:\n" + "\n".join(recipe_texts))
#         else:
#             recipes_by_category.append(f"カテゴリ {full_category_id}: レシピを取得できませんでした。")

#     return "\n\n".join(recipes_by_category)


# # 会話ループ
# while True:
#     user_input = input("あなた: ")
#     if user_input.lower() in ["exit", "quit", "bye"]:  # 終了コマンド
#         print("会話を終了します。")
#         break
    
#     # レシピを求めているかチェック
#     if "レシピ" in user_input or "作り方" in user_input:
#         message = user_input + "という文章から食べ物の単語だけを抽出して出力して"
#         response = chat.send_message(message)
#         recipe_info = get_recipe(response.text.strip())
#         print("Gemini:", recipe_info)
#     else:
#         response = chat.send_message(user_input)
#         print("Gemini:", response.text)

