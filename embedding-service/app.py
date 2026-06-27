from fastapi import FastAPI
from pydantic import BaseModel

from services import generate_embedding

app = FastAPI()


class EmbeddingRequest(BaseModel):
    text: str


@app.post("/embed")
def embed(request: EmbeddingRequest):

    embedding = generate_embedding(request.text)

    return {
        "embedding": embedding
    }