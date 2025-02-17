from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import chat, recipe

app = FastAPI()

# CORSの設定
origins = ["http://localhost:5173"]  # フロントエンドのURLを指定

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーター登録
app.include_router(chat.router)
app.include_router(recipe.router)


# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from .routers import food
# #from app.database.database import Base, engine

# app = FastAPI()

# origins = [
#     "http://localhost:5173",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# #Base.metadata.create_all(bind=engine)

# app.include_router(food.router)

