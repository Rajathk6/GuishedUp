<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [

        'user_id',

        'content',

        'image_url',

        'authenticity_score'

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function embedding()
    {
        return $this->hasOne(PostEmbedding::class);
    }
}