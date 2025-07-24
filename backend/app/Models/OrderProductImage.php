<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProductImage extends Model
{
    protected $fillable = [
        'product_id', 'image_url', 'public_id'
    ];
    protected $table = 'order_product_images';

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
    use HasFactory;
}
