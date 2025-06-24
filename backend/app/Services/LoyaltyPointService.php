<?php

namespace App\Services;

use App\Repositories\LoyaltyPointRepository;

class LoyaltyPointService
{

    protected $loyaltyPoint;

    public function __construct(LoyaltyPointRepository $loyalty_point)
    {
        $this->loyaltyPoint = $loyalty_point;
    }
    public function updateLoyalPoint(int $userId): bool
    {
        $loyalty = $this->loyaltyPoint->find($userId);
        if (!$loyalty) {
            return false;
        }
        $newPoints = $loyalty->points_earned + 100;

        $this->loyaltyPoint->update($userId, [
            'points_earned' => $newPoints
        ]);
        return true;
    }
}
