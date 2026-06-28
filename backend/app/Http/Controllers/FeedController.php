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
        return response()->json([

            'data' =>

            $service->feed(

                $request->user()->id

            )

        ]);
    }
}
