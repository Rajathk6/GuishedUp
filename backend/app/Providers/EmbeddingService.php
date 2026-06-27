<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Exception;

class EmbeddingService
{
    private string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.embedding.url');
    }

    public function generate(string $text): array
    {
        $response = Http::timeout(30)
            ->post($this->baseUrl . '/embeddings', [
                'text' => $text
            ]);

        if (!$response->successful()) {
            throw new Exception('Embedding service failed.');
        }

        return $response->json()['embedding'];
    }
}