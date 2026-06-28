<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostEmbedding;

use App\Services\EmbeddingService;

use App\Http\Requests\CreatePostRequest;

use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    public function store(
        CreatePostRequest $request,
        EmbeddingService $embeddingService
    ) {
        return DB::transaction(function () use ($request, $embeddingService) {

            $post = Post::create([

                'user_id' => $request->user()->id,

                'content' => $request->content,

                'image_url' => $request->image_url,

                'authenticity_score' => 0.8

            ]);

            $embedding = $embeddingService
                ->generate($post->content);

            DB::insert(
                "
            INSERT INTO post_embeddings
            (
                post_id,
                embedding,
                model_name,
                model_version,
                created_at
            )

            VALUES
            (?, ?::vector, ?, ?, NOW())
            ",
                [

                    $post->id,

                    '[' . implode(',', $embedding) . ']',

                    'all-MiniLM-L6-v2',

                    '1.0'

                ]
            );

            return response()->json([

                'message' => 'Post created successfully',

                'data' => $post

            ], 201);
        });
    }
}
