<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\OrderProductImageService;

class OrderProductImageControllor extends Controller
{
    protected $orderProductImageService;

    public function __construct(OrderProductImageService $orderProductImageService)
    {
        $this->orderProductImageService = $orderProductImageService;
    }

    /**
     * Lấy tất cả ảnh theo id sản phẩm
     *
     * @param int $productId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getImagesByProductId($productId)
    {
        $images = $this->orderProductImageService->getImagesByProductId($productId);
        return response()->json([
            'success' => true,
            'data' => $images
        ]);
    }
}