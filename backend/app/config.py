import os
from dotenv import load_dotenv

# .envの読み込み
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
RAKUTEN_API_KEY = os.getenv("RAKUTEN_API_KEY")
