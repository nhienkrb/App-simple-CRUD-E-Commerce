<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\OrderDetailService;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $orderDetailService;
    public function __construct(OrderDetailService $orderDetailService)
    {
        $this->orderDetailService = $orderDetailService;
    }

    public function index()
    {
        //
        $orderDetails = $this->orderDetailService->getAll();
        return response()->json($orderDetails);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'order_id' => 'required|integer',
            'product_id' => 'required|integer',
            'quantity' => 'required|integer',
            // Add other fields as needed
        ]);
        $orderDetail = $this->orderDetailService->create($validated);
        return response()->json([
            'message' => 'Order detail created successfully',
            'data' => $orderDetail,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $orderDetail = $this->orderDetailService->find($id);
        if (!$orderDetail) {
            return response()->json(['message' => 'Order detail not found'], 404);
        }
        return response()->json($orderDetail);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $orderDetail = $this->orderDetailService->find($id);
        if (!$orderDetail) {
            return response()->json(['message' => 'Order detail not found'], 404);
        }
        $validated = $request->validate([
            'order_id' => 'sometimes|required|integer',
            'product_id' => 'sometimes|required|integer',
            'quantity' => 'sometimes|required|integer',
            // Add other fields as needed
        ]);
        $this->orderDetailService->update($orderDetail, $validated);
        return response()->json([
            'message' => 'Order detail updated successfully',
            'data' => $orderDetail,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $orderDetail = $this->orderDetailService->find($id);
        if (!$orderDetail) {
            return response()->json(['message' => 'Order detail not found'], 404);
        }
        $this->orderDetailService->delete($orderDetail);
        return response()->json(['message' => 'Order detail deleted successfully']);
    }
}
