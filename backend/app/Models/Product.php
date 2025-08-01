<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_id', 'product_name', 'slug', 'description', 'tag',
        'tag_name', 'price', 'quantity', 'image', 'is_active'
    ];
    protected $table = 'products';
    protected $casts = [
        'price' => 'float',
        'quantity' => 'integer',
    ];
protected $with = ['orderProductImages', 'variants', 'inforProduct', 'category'];

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

    public function inforProduct()
{
    return $this->hasOne(InforProduct::class, 'product_id');
}
    public function orderProductImages()
    {
        return $this->hasMany(OrderProductImage::class, 'product_id');
    }
}
