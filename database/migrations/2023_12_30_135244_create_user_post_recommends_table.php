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
        Schema::create('user_post_recommends', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('recommended_user_id')->nullable();
            $table->string('title')->nullable();
            $table->text('text')->nullable();
            $table->integer('accept_flg')->default(0);
            $table->integer('things_flg')->default(0);
            $table->string('recommended_guest_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_post_recommends');
    }
};
