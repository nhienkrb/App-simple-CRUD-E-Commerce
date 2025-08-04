<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\DashboardRepository;

class DashboardController extends Controller
{
    protected $dashboardRepository;

    public function __construct(DashboardRepository $dashboardRepository)
    {
        $this->dashboardRepository = $dashboardRepository;
    }

    public function index()
    {
        $data = $this->dashboardRepository->getDashboardData();
        return response()->json(['data' => $data, 'message' => "Dashboard data retrieved successfully"], 200);
    }
    public function getTop3ProductsController()
    {
        $topProducts = $this->dashboardRepository->getTop3ProductDataDashboard();
        return response()->json(['data' => $topProducts, 'message' => "Top 3 products retrieved successfully"], 200);
    }
    public function getTop3ProductsByMonth(){
        $data = $this->dashboardRepository->GetTop3ProductsByMonth();
        return response()->json(['data' => $data, 'message' => "Top 3 products by month retrieved successfully"], 200);
    }
}
