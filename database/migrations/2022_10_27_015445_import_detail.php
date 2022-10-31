<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('import_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('import_bill_id')->constrained('import_bill');
            $table->foreignId('book_id')->constrained('book');
            $table->unsignedTinyInteger('quantity');
            $table->decimal('price', 5, 2, true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('import_detail');
    }
};
