<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateInteractionRequest;
use App\Services\InteractionService;

class InteractionController extends Controller
{
    public function store(
        CreateInteractionRequest $request,
        InteractionService $service
    ) {
        $interaction = $service->create(
            $request->validated(),
            $request->user()
        );

        return response()->json([
            'message' => 'Interaction recorded successfully.',
            'data' => $interaction
        ], 201);
    }
}
