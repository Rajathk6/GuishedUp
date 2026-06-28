<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('post_embeddings', function (Blueprint $table) {

            $table->foreignId('post_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('model_name');

            $table->string('model_version');

            $table->timestamp('created_at');
        });

        DB::statement("
        ALTER TABLE post_embeddings
        ADD COLUMN embedding vector(384)
    ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_embeddings');
    }
};
