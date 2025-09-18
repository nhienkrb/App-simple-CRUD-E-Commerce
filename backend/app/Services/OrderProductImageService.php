<?php
namespace App\Services;

use App\Models\OrderProductImage;

class OrderProductImageService
{
    public function getImagesByProductId($productId)
    {
        return OrderProductImage::select("id","product_id","image_url","public_id")->where('product_id', $productId)->get();
    }
}