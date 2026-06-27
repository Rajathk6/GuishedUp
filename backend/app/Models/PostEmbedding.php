<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostEmbedding extends Model
{
    public $timestamps = false;

    protected $fillable = [

        'post_id',

        'embedding',

        'model_name',

        'model_version'

    ];

    protected $casts = [

        'embedding' => 'array'

    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}