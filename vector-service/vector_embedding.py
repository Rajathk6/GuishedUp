from sentence_transformers import SentenceTransformer

# Load once when the application starts
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")


def generate_embedding(text: str):
    embedding = model.encode(text)

    return embedding.tolist()