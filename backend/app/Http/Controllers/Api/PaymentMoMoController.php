<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentMoMoController extends Controller
{
    public function createPayment(Request $request)
    {

        $payload = $request->all();
        $orderKey = uniqid('order_', true);
        cache()->put("order_payload_$orderKey", $payload, 1000); // Lưu 10 phút

        $endpoint = env("ENDPOINT");
        $partnerCode = env("PARTNERCODE");
        $accessKey = env("ACCESSKEY");
        $secretKey = env("SECRETKEY");

        $orderInfo = "Thanh toán qua MoMo";
        $amount = (int)  $payload['amount'];
        $orderId = time() . "";
        $redirectUrl =  env("REDIRECT_URL") . "?resultCode=0&order_key=" . $orderKey;;
        $ipnUrl = "as";
        $extraData = "";
        $requestId = time() . "";
        $requestType = "payWithATM";
        $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;

        $signature = hash_hmac("sha256", $rawHash, $secretKey);

        $data = array(
            'partnerCode' => $partnerCode,
            'partnerName' => "MoMo Payment",
            "storeId" => "MomoTestStore",
            'requestId' => $requestId,
            'amount' => $amount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature
        );
        $ch = curl_init($endpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        $result = curl_exec($ch);
        curl_close($ch);
        $jsonResult = json_decode($result, true);  // Decode JSON
        return response()->json([
            'payUrl' => $jsonResult['payUrl'] ?? null
        ]);
    }



    // function execPostRequest($url, $data)
    // {
    //     $ch = curl_init($url);
    //     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    //     curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //     curl_setopt(
    //         $ch,
    //         CURLOPT_HTTPHEADER,
    //         array(
    //             'Content-Type: application/json',
    //             'Content-Length: ' . strlen($data)
    //         )
    //     );
    //     curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    //     curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    //     //execute post
    //     $result = curl_exec($ch);
    //     //close connection
    //     curl_close($ch);
    //     return $result;
    // }
}
