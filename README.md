# GuisedUp – AI-Powered Personalized Social Feed

## Overview

GuisedUp is a social media prototype that demonstrates semantic search and personalized feed ranking using AI-generated text embeddings.

The application consists of three services:

- **Laravel 13** – REST API, authentication, business logic, feed ranking
- **FastAPI (Python)** – Sentence Transformer embedding service
- **React Native (Expo)** – Mobile client

Embeddings are generated using the `all-MiniLM-L6-v2` Sentence Transformer model and stored inside PostgreSQL using the **pgvector** extension. These embeddings power semantic search and personalized feed recommendations.

---

# Tech Stack

### Backend

- Laravel 13
- PHP 8.3+
- PostgreSQL
- pgvector
- Laravel Sanctum
- Composer

### Embedding Service

- Python 3.11+
- FastAPI
- Sentence Transformers
- Uvicorn

### Frontend

- React Native
- Expo SDK 54
- Axios
- AsyncStorage

---

# Features

- User Authentication
- Create Posts
- Semantic Search
- AI-generated Embeddings
- Personalized Feed Ranking
- Infinite Scrolling Feed
- Interaction Tracking
  - View
  - Reaction
  - Reply

---

# Project Structure

```text
GuisedUp/

backend/
    Laravel API

python-service/
    FastAPI Embedding Service

frontend/
    React Native Expo App
```

---

# Prerequisites

Install the following:

- PHP 8.3+
- Composer
- PostgreSQL
- pgvector extension
- Python 3.11+
- Node.js 20+
- npm
- Expo Go (Android/iOS)

---

# Backend Setup

```bash
cd backend

composer install
```

Copy environment variables

```bash
cp .env.example .env
```

Generate application key

```bash
php artisan key:generate
```

Configure PostgreSQL credentials inside `.env`.

Run migrations

```bash
php artisan migrate
```

(Optional)

```bash
php artisan db:seed
```

Run the server

```bash
php artisan serve --host=0.0.0.0
```

Backend will run on

```
http://localhost:8000
```

---

# Python Embedding Service Setup

```bash
cd python-service
```

Create virtual environment

```bash
python -m venv venv
```

Activate

Linux

```bash
source venv/bin/activate
```

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run

```bash
uvicorn app.main:app --reload
```

Embedding service runs on

```
http://localhost:8001
```

---

# React Native Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Update the backend URL inside

```
src/api/axios.ts
```

Replace

```text
http://YOUR_LOCAL_IP:8000/api
```

with your machine's local IP address.

Example

```text
http://192.168.1.10:8000/api
```

Run

```bash
npx expo start
```

Open the application using Expo Go.

---

### Environment Variables

# .env.example

```env
APP_NAME=GuisedUp
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

EMBEDDING_SERVICE_URL=http://127.0.0.1:8001
```

---

# API Endpoints

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| POST   | `/api/login`        | User Login         |
| POST   | `/api/logout`       | User Logout        |
| GET    | `/api/feed`         | Personalized Feed  |
| GET    | `/api/search`       | Semantic Search    |
| POST   | `/api/posts`        | Create Post        |
| POST   | `/api/interactions` | Record Interaction |

---

# AI Pipeline

```
Create Post

↓

Laravel

↓

FastAPI

↓

Sentence Transformer

↓

Embedding

↓

pgvector

↓

PostgreSQL
```

Search requests generate an embedding for the query and perform cosine similarity search using pgvector.

Feed ranking combines semantic similarity, interaction history, authenticity score, and time decay.

---

# Notes

- Images are referenced using URLs and are not uploaded or stored by the application.
- Feed personalization uses interaction history. New users receive a cold-start feed ranked using authenticity and recency until sufficient interaction history is available.
- The application is intended as a technical assessment and prioritizes architectural clarity over production-scale optimizations.
