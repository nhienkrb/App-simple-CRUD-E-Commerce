<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoyaltyPoints extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $table = 'loyalty_points';
    protected $fillable = [
        'user_id',
        'points_earned',
        'points_redeemed',
        'last_updated',
    ];
    protected $casts = [
        'last_updated' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
