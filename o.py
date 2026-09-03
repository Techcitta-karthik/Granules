import requests
r = requests.post(
    "http://10.10.9.223:8000/ask",
    headers={"X-API-Key": "AQ.Ab8RN6K97QdBtCxpMQWYan1q6J6i9NSqYf0WgWBmZeMlQfvt0"},
    json={
        "question": "How many manufacturing facilities does Granules India have?",
        "top_k": 5,
    },
)
print(r.json()["answer"])