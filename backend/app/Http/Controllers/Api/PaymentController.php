<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function createPayment(Request $request)
    {
        $vnp_TmnCode = "IYM5Y1BF";
        $vnp_HashSecret = "96GI08C5WR15N9LDIRIXRWAVERVCJ1Z9";
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_ReturnUrl = "http://localhost:3000/vnpay-return";

         $order_id = time();
    $amount = (int) $request->input('amount', 100000);
    $client_ip = $request->ip();

    $inputData = [
        "vnp_Version" => "2.1.0",
        "vnp_TmnCode" => $vnp_TmnCode,
        "vnp_Amount" => $amount * 100,
        "vnp_Command" => "pay",
        "vnp_CreateDate" => now()->format('YmdHis'),
        "vnp_CurrCode" => "VND",
        "vnp_IpAddr" => $client_ip,
        "vnp_Locale" => "vn",
        "vnp_OrderInfo" => "DonHang-{$order_id}",
        "vnp_OrderType" => "other",
        "vnp_ReturnUrl" => $vnp_ReturnUrl,
        "vnp_TxnRef" => $order_id,
        "vnp_ExpireDate" => now()->addMinutes(60)->format('YmdHis'),
    ];

    ksort($inputData);

    $hashData = '';
    $query = [];
    foreach ($inputData as $key => $value) {
        $hashData .= $key . '=' . $value . '&';
        $query[] = urlencode($key) . '=' . urlencode($value);
    }
    $hashData = rtrim($hashData, '&');

    $vnpSecureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

    $paymentUrl = $vnp_Url . '?' . implode('&', $query) . '&vnp_SecureHash=' . $vnpSecureHash;

    Log::info("HashData: " . $hashData);
    Log::info("SecureHash: " . $vnpSecureHash);

    return response()->json([
        'payment_url' => $paymentUrl,
        'vnp_TxnRef' => $order_id,
    ]);
    }
}
