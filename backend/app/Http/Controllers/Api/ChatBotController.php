<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Http;

class ChatBotController extends Controller
{
    public function chat(Request $request)
    {
        $userMessage = $request->input('message');

        // Lấy danh sách sản phẩm từ DB
        $products = Product::select('product_name', 'description', 'price')->get();

        // Biến thành nội dung để gửi vào prompt
        $productList = $products->map(function ($p) {
            return "{$p->product_name} - {$p->price}đ: {$p->description}";
        })->implode("\n");

        // Prompt gửi đến Gemini
        $prompt = <<<EOT
Tôi là một trợ lý tư vấn trà. Dưới đây là các sản phẩm hiện có:

$productList

Người dùng hỏi: "$userMessage"

Dựa trên các sản phẩm trên, gợi ý cho người dùng loại trà phù hợp.
Chỉ trả lời tên sản phẩm + giá. Không nói linh tinh.
EOT;

        $response = Http::withHeaders([
            'X-goog-api-key' =>env("GEMINI_API_KEY","AIzaSyDa4DBH6zCmEKX1HYzRp5QjTvBcOkAsepw"),
            'Content-Type' => 'application/json',
        ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ]
        ]);

      return response()->json([
            'reply' => $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? 'Không có phản hồi từ AI.'
        ]);
     
   }
}
