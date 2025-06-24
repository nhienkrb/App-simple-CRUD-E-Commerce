<?php

namespace App\Enums;

enum LoyaltyUsage: string
{
    case USE = 'use';
    case NOT_USE = 'not_use';

    public function label(): string
    {
        return match ($this) {
            self::USE => 'Dùng điểm tích lũy',
            self::NOT_USE => 'Không dùng điểm tích lũy',
        };
    }
}
