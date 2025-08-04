<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Support\Facades\DB;

class DashboardRepository
{

    public function __construct() {}
    public function getDashboardData()
    {
        return DB::select('Call GetDashboardStats()');
    }
    public function getTop3ProductDataDashboard()
    {
        return Product::select('products.id as product_id', 'products.product_name', DB::raw('SUM(order_details.quantity) as total_sold'))
            ->join('order_details', 'products.id', '=', 'order_details.product_id')
            ->groupBy('products.id', 'products.product_name')
            ->orderByDesc('total_sold')
            ->limit(3)
            ->get();
    }

     public function GetTop3ProductsByMonth()
    {
        return DB::select('Call GetTop3ProductSoldByMonth()');
    }
}
