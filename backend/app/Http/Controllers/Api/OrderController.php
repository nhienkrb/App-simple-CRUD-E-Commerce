<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
      protected $orderService;
    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }
    // Display a listing of the resource.
    public function index()
    {
        $orders = $this->orderService->getAllOrders();
        return response()->json($orders);
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $dataRequest =  $request->all();

        $order = $this->orderService->createOrder($dataRequest);
        return response()->json([
            'message' => 'Order created successfully',
            'data' => $order,
        ], 201);
    }

    // Display the specified resource.
    public function show($id)
    {
        $order = $this->orderService->findOrder($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        return response()->json($order);
    }

    // Update the specified resource in storage.
    public function update(Request $request , string $id)
    {
        $order = $this->orderService->findOrder($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $validated = $request->validate([
            'customer_name' => 'sometimes|required|string|max:255',
            'customer_email' => 'sometimes|required|email',
            'total' => 'sometimes|required|numeric',
            // Add other fields as needed
        ]);
        $this->orderService->updateOrder($order, $validated);
        return response()->json([
            'message' => 'Order updated successfully',
            'data' => $order,
        ]);
    }

    // Remove the specified resource from storage.
    public function destroy(string $id)
    {
        $order = $this->orderService->findOrder($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }

    public function orderItems(Request $request){

        return response()->json(["data"=> $this->orderService->orderItem($request->all())]);
    }
}
