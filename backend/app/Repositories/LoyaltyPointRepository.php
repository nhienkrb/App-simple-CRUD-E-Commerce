<?php

namespace App\Repositories;

use App\Models\LoyaltyPoints;
use Ramsey\Uuid\Type\Integer;

class LoyaltyPointRepository
{

    public function find(int $id)
    {
        $userLoyal = LoyaltyPoints::where("user_id", $id)->first();
        return $userLoyal;
    }

    
    public function update(int $userId, array $data)
    {
        $loyalty = $this->find($userId);
        if (!$loyalty) return false;

        $loyalty->update([
            'points_earned' => $data['points_earned'] ?? $loyalty->points_earned,
            'points_redeemed' => $data['points_redeemed'] ?? $loyalty->points_redeemed,
        ]);

        return $loyalty;
    }
}
