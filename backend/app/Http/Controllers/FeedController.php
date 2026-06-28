<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FeedService;

class FeedController extends Controller
{
    public function feed(
        Request $request,
        FeedService $service
    ) {
        $page = max((int) $request->query('page', 1), 1);

        $limit = min(
            max((int) $request->query('limit', 10), 1),
            50
        );

        return response()->json(
            $service->feed(
                $request->user()->id,
                $page,
                $limit
            )
        );
    }
}
