from fastapi import FastAPI
import os.path
import sqlite3
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "RestuarntInfo.db")

@app.get("/my-first-api")
def hello():
  return {"Hello world!"}

@app.get("/get-search-result")
def get_search_(search, searchText: str = ""):
  conn = sqlite3.connect(db_path)
  cursor = conn.cursor()
  if(searchText == ""):
    cursor.execute("SELECT * FROM 'AllInfo' ORDER BY " + search + " ASC")
    record = cursor.fetchall()
    cursor.close()
    return record
  else:
    query = "SELECT * FROM 'AllInfo' where " + search + "='" + searchText+"'"
    cursor.execute(query)
    record = cursor.fetchall()
    cursor.close()
    return record