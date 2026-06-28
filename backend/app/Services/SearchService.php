<?php

namespace App\Services;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use App\Services\EmbeddingService;

class SearchService
{
    public function __construct(
        private EmbeddingService $embeddingService
    ) {}

    public function search(string $query)
    {
        $embedding = $this
            ->embeddingService
            ->generate($query);

        $vector =
            '[' .
            implode(',', $embedding) .
            ']';

        return DB::select(
            "
        SELECT

            p.*,

            1 - (
                pe.embedding
                <=>
                ?::vector
            ) AS similarity

        FROM posts p

        JOIN post_embeddings pe

        ON p.id = pe.post_id

        ORDER BY similarity DESC

        LIMIT 20
        ",
            [
                $vector
            ]
        );
    }
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
