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
        Schema::create('infor_products', function (Blueprint $table) {
            $table->id();
            $table->string('brand', 225)->nullable();
            $table->string('origin', 225)->nullable();
            $table->string('TeaQuality', 225)->nullable();
            $table->string('weight', 225)->nullable();
            $table->date('expiration_date')->nullable();
            $table->text('note')->nullable();
            $table->text('prepare')->nullable();
            $table->timestamps();
            $table->foreignId('product_id')->unique()->constrained('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('infor_products');
    }
};
