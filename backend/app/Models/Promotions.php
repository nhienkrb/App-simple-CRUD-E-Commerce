<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotions extends Model
{
    use HasFactory;

    public $timestamps = true;
    protected $table = 'promotions';
    protected $fillable = [
        'promotion_name',
        'description',
        'discount_percentage',
        'start_date',
        'end_date',
        'is_active',
        'product_id',
    ];  
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_active' => 'boolean',
    ];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
}
