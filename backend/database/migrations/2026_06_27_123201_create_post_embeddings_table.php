<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('post_embeddings', function (Blueprint $table) {
            $table->foreignId('post_id')
                ->primary()
                ->constrained('posts')
                ->cascadeOnDelete();

            $table->text('embedding');

            $table->string('model_name');

            $table->string('model_version');
            
            $table->timestamp('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_embeddings');
    }
};
