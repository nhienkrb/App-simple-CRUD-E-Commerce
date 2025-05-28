<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_id',
        'sku',
        'stock_quantity',
        'specifications',
    ];
    protected $casts = [
        'stock_quantity' => 'integer',
        'specifications' => 'array', // Assuming specifications is a JSON field
    ];
}
