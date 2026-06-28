from fastapi import FastAPI
from pydantic import BaseModel

from vector_embedding import generate_embedding

app = FastAPI()


class EmbeddingRequest(BaseModel):
    text: str


@app.post("/embeddings")
def embed(request: EmbeddingRequest):

    embedding = generate_embedding(request.text)

    return {
        "embedding": embedding
    }