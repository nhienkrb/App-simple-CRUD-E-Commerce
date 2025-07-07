<?php

namespace App\Services;

use App\Enums\LoyaltyUsage;
use App\Models\Product;
use App\Repositories\LoyaltyPointRepository;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Repositories\OrderRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Enum;

class OrderService
{
    protected OrderRepository $orderRepository;
    protected LoyaltyPointRepository $loyaltyPointRepository;

    public function __construct(
        OrderRepository $orderRepository,
        LoyaltyPointRepository $loyaltyPointRepository
    ) {
        $this->orderRepository = $orderRepository;
        $this->loyaltyPointRepository = $loyaltyPointRepository;
    }


    // Lấy tất cả đơn hàng
    public function getAllTableOrders()
    {
        return $this->orderRepository->getAll();
    }

    // Tạo đơn hàng mới
    public function createOrder(array $data)
    {
        $validation = Validator::make($data, [
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
            'total' => 'required|numeric',
        ]);
        if ($validation->failed()) {
            throw new ValidationException($validation);
        }
        return $this->createOrder($data);
    }

    // Tìm đơn hàng theo ID
    public function findOrder($id)
    {
        return $this->orderRepository->find($id);
    }

    // Cập nhật đơn hàng
    public function updateOrder($id, array $data)
    {
        return $this->orderRepository->update($id, $data);
    }

    // Xóa đơn hàng
    public function deleteOrder($id)
    {
        return $this->orderRepository->delete($id);
    }

    // Ví dụ xử lý logic nghiệp vụ thêm sản phẩm vào đơn hàng

    // public function orderItem(array $data)
    // {
    //     try {
    //         $user = auth()->user();
    //         $loyalty = $user->loyaltyPoints;

    //         $currentPoints = ($loyalty?->points_earned ?? 0) - ($loyalty?->points_redeemed ?? 0);
    //         $discountAmount = 0;
    //         $usage = LoyaltyUsage::from($data['loyalty_usage']);

    //         switch ($usage) {
    //             case LoyaltyUsage::USE:
    //                 $discountAmount = floor($currentPoints / 100) * 10000;
    //                 break;

    //             case LoyaltyUsage::NOT_USE:
    //                 $discountAmount = 0;
    //                 break;
    //         }

    //         return [
    //             'user' => $user->id,
    //             'discountAmount' => $discountAmount,
    //         ];
    //     } catch (\Exception $e) {
    //         Log::error("Order failed: " . $e->getMessage());
    //         return null;
    //     }
    // }

    public function orderItem(array $data): array|null
    {
        $validator = Validator::make($data, [
            'address' => 'required|string|max:255',
            'loyalty_usage' => ['required', new Enum(LoyaltyUsage::class)],
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return [
                'status' => false,
                'errors' => $validator->errors(),
            ];
        }

        $validated = $validator->validated();
        $user = auth()->user();

        DB::beginTransaction();

        try {
            $loyalty = $user->loyaltyPoints;
            $earned = $loyalty?->points_earned ?? 0;
            $redeemed = $loyalty?->points_redeemed ?? 0;
            $availablePoints = $earned - $redeemed;

            $discountAmount = 0;
            $pointsToRedeem = 0;

            if ($validated['loyalty_usage'] === LoyaltyUsage::USE->value && $availablePoints >= 100) {
                $pointsToRedeem = floor($availablePoints / 100) * 100;
                $discountAmount = $pointsToRedeem * 100; // 1 điểm = 100đ
            }

            $order = $this->orderRepository->create([
                'user_id' => $user->id,
                'address' => $validated['address'],
                'status' => 1
            ]);
            $totalAmount = 0;

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $subtotal = $product->price * $item['quantity'];
                $totalAmount += $subtotal;

                $order->orderDetails()->create([
                    'product_id' => $product->id,
                    'price' => $product->price * $item['quantity'],
                    'quantity' => $item['quantity'],
                ]);
            }

            // Update loyalty points
            if ($loyalty) {
                if ($pointsToRedeem > 0) {
                    $loyalty->points_redeemed += $pointsToRedeem;
                }

                $newPoints = floor($totalAmount / 10000) * 100;
                $loyalty->points_earned += $newPoints;
                $loyalty->save();
            }

            DB::commit();

            return [
                'status' => true,
                'message' => 'Order successful',
                'order_id' => $order->id,
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Order failed: ' . $e->getMessage());

            return [
                'status' => false,
                'message' => 'Order failed',
            ];
        }
    }



    public function getAllOrders()
    {
        $orders = $this->orderRepository->getAllOrdersWithDetails();
        
        return $orders->map(function ($order) {
            return $this->formatOrderData($order);
        });
    }

    public function getUserOrders($userId)
    {
        $orders = $this->orderRepository->getUserOrdersWithDetails($userId);

        return $orders->map(function ($order) {
            return $this->formatOrderData($order);
        });
    }

  protected function formatOrderData($order)
    {
        return [
            'username' => $order->user->name,
            'imageUrl' => $order->user->image ?? null,
            'orderDate' => $order->created_at->toDateString(),
            'status' => $this->getStatusText($order->status),
            'price' => $order->orderDetails->sum(function ($detail) {
                return $detail->price * $detail->quantity;
            }),
            'orderCode' => 'ORD-' . str_pad($order->id, 4, '0', STR_PAD_LEFT),
            'history' => $order->orderDetails->map(function ($detail) {
                return [
                    'date' => $detail->created_at->toDateString(),
                    'customerId' => $detail->order->user_id,
                    'amount' => $detail->quantity,
                    'productName' => $detail->product->product_name,
                    'productImage' => $detail->product->image
                ];
            })
        ];
    }

    protected function getStatusText($status)
    {
        $statuses = [
            0 => 'Pending',
            1 => 'Completed',
        ];

        return $statuses[$status] ?? 'Unknown';
    }
}
