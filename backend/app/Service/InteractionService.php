<?php

namespace App\Services;

use App\Models\Interaction;
use App\Models\User;

class InteractionService
{
    public function create(array $data, User $user): Interaction
    {
        return Interaction::create([
            'user_id' => $user->id,
            'post_id' => $data['post_id'],
            'type' => $data['type'],
        ]);
    }
}