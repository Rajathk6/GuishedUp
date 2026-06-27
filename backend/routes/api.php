<?php

use App\Http\Controllers\AuthController;
use App\Services\EmbeddingService;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/me', [AuthController::class, 'me']);

});

Route::get('/test-embeddings', function (EmbeddingService $service) {

    return $service->generate(
        "Hello there, my name is Rajath."
    );

});