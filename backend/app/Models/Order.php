<?php

namespace App\Models;

use App\Enums\LoyaltyUsage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    public $timestamps = true;
    protected $dateFormat = 'Y-m-d H:i:s';
    protected $casts = [
        'loyalty_usage' => LoyaltyUsage::class,

    ];
    protected $fillable = [
        'user_id',
        'address',
        'status',
    ];

    protected $with = ['orderDetails'];

    // Khi có một row mới tự động set status = 1;
    // C1:
    protected $attribute  = [
        'status' => 1 //Set mặc định nếu chưa có
    ];

    // C2:
    // protected static function boot(){
    
    //     parent::boot();
    //     static::creating(function($order){
    //         if(is_null($order->status)){
    //             $order->status = 1; // Pending
    //         }
    //     });

    // }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
    public function getStatusAttribute($value)
    {
        return $value === 1 ? 'Pending' : 'Completed';
    }
}
