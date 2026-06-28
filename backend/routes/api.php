<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\InteractionController;
use App\Http\Controllers\FeedController;
use App\Services\EmbeddingService;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/posts', [PostController::class, 'store']);

    Route::post('/interactions', [InteractionController::class, 'store']);

    Route::get('/search', [SearchController::class, 'search']);

    Route::get('/feed', [FeedController::class, 'feed']);
});

Route::get('/test-embeddings', function (EmbeddingService $service) {

    return $service->generate(
        "Hello there, my name is Rajath."
    );
});
