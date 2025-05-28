<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_name',
        'description',
        'price',
        'quantity',
        'image',
        'is_active',
        
    ];
    protected $casts = [
        'price' => 'float',
        'quantity' => 'integer',
    ];

    protected static function booted(){
        parent::booted();

        static::creating(function ($product) {
            $product->is_active = true; // Set default value for is_active
        });
        static::created((function ($product) {
          \logger()->info('Product created: ', $product->toArray());
        }));
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }
}
