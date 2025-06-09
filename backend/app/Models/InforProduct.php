<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InforProduct extends Model
{
    use HasFactory;

     protected $table = 'infor_products';

    protected $fillable = [
        'brand',
        'origin',
        'TeaQuality',
        'weight',
        'expiration_date',
        'note',
        'prepare',
        'description_infoProduct',
        'product_id',
    ];

    // Quan hệ 1-1 với Product
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

}
