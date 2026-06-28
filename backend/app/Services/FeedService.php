<?php

namespace App\Services;

use App\Models\Interaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class FeedService
{
    public function feed(
        int $userId,
        int $page = 1,
        int $limit = 10
    ): array {
        $userEmbedding = $this->getUserEmbedding($userId);
        $offset = ($page - 1) * $limit;

        $isColdStart = $userEmbedding === null;

        $posts = $this->getCandidatePosts($userId);
        $totalPosts = count($posts);

        foreach ($posts as $post) {

    if ($isColdStart) {

        $post->score =
            (0.70 * $post->authenticity_score)
            +
            (0.30 * $this->timeDecay($post->created_at));

    } else {

        $post->score = $this->calculateFeedScore(
            $userId,
            $userEmbedding,
            $post
        );

    }

}

        usort($posts, fn($a, $b) => $b->score <=> $a->score);

        $items = array_slice(
            $posts,
            $offset,
            $limit
        );

        return [

            'data' => $items,

            'pagination' => [

                'page' => $page,

                'limit' => $limit,

                'total' => $totalPosts,

                'total_pages' => (int) ceil(
                    $totalPosts / $limit
                ),

                'has_next' => ($offset + $limit) < $totalPosts,

                'has_previous' => $page > 1

            ]

        ];
    }

    /**
     * Fetch all candidate posts with embeddings.
     */
    private function getCandidatePosts(int $userId): array
{
    return DB::select("
        SELECT
            p.*,
            pe.embedding::text AS embedding
        FROM posts p
        JOIN post_embeddings pe
            ON pe.post_id = p.id
        WHERE p.user_id <> ?
    ", [
        $userId
    ]);
}

    /**
     * Build the user's interest vector.
     */
    private function getUserEmbedding(int $userId): ?array
    {
        $rows = DB::select("
            SELECT
                pe.embedding::text AS embedding
            FROM interactions i
            JOIN post_embeddings pe
                ON pe.post_id = i.post_id
            JOIN posts p
                ON p.id = pe.post_id
            WHERE i.user_id = ?
            AND p.user_id <> ?
        ", [$userId, $userId]);

        if (empty($rows)) {
            return null;
        }

        $vectors = [];

        foreach ($rows as $row) {
            $vectors[] = $this->parseVector($row->embedding);
        }

        return $this->averageVectors($vectors);
    }

    /**
     * Parse pgvector text into PHP array.
     */
    private function parseVector(string $vector): array
    {
        return array_map(
            'floatval',
            explode(',', trim($vector, '[]'))
        );
    }

    /**
     * Average multiple vectors.
     */
    private function averageVectors(array $vectors): array
    {
        $dimensions = count($vectors[0]);

        $average = array_fill(0, $dimensions, 0);

        foreach ($vectors as $vector) {
            for ($i = 0; $i < $dimensions; $i++) {
                $average[$i] += $vector[$i];
            }
        }

        $count = count($vectors);

        for ($i = 0; $i < $dimensions; $i++) {
            $average[$i] /= $count;
        }

        return $average;
    }

    /**
     * Calculate the final weighted score.
     */
    private function calculateFeedScore(
        int $userId,
        array $userEmbedding,
        object $post
    ): float {

        $semantic = $this->semanticScore(
            $userEmbedding,
            $post->embedding
        );

        $relationship = $this->relationshipScore(
            $userId,
            $post->id
        );

        $time = $this->timeDecay(
            $post->created_at
        );

        return (0.40 * $relationship) +
            (0.35 * $semantic) +
            (0.15 * $post->authenticity_score) +
            (0.10 * $time);
    }

    /**
     * Semantic similarity using pgvector.
     */
    private function semanticScore(
        array $userVector,
        string $postVector
    ): float {

        $userVector = '[' . implode(',', $userVector) . ']';

        $result = DB::selectOne("
            SELECT
                1 - (
                    ?::vector
                    <=>
                    ?::vector
                ) AS similarity
        ", [
            $userVector,
            $postVector
        ]);

        return (float) $result->similarity;
    }

    /**
     * Simple relationship score.
     */
    private function relationshipScore(
        int $userId,
        int $postId
    ): float {

        $count = Interaction::where('user_id', $userId)
            ->where('post_id', $postId)
            ->count();

        return min($count / 5, 1);
    }

    /**
     * Exponential time decay.
     */
    private function timeDecay(string $createdAt): float
    {
        $days = Carbon::parse($createdAt)
            ->diffInDays(now());

        return exp(-0.1 * $days);
    }
}
