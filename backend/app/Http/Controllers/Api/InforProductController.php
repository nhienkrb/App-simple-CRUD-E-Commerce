<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\InforProductService;
use Illuminate\Http\Request;

class InforProductController extends Controller
{

    protected $inforProductService;

    public function __construct(InforProductService $_inforProductService)
    {
        $this->inforProductService = $_inforProductService;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inforProducts = $this->inforProductService->getAll();
        return response()->json([
            'message' => 'InforProduct All',
            'data' => $inforProducts,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    // Validate the request data
    $validated = $request->validate([
        'brand'            => 'nullable|string|max:225',
        'origin'           => 'nullable|string|max:225',
        'TeaQuality'       => 'nullable|string|max:225',
        'weight'           => 'nullable|string|max:225',
        'expiration_date'  => 'nullable|date',
        'note'             => 'nullable|string',
        'prepare'          => 'nullable|string',
        'product_id'       => 'required|integer|exists:products,id|unique:infor_products,product_id',
    ]);
    $this->inforProductService->create($validated);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $inforProduct = $this->inforProductService->find($id);
        if (!$inforProduct) {
            return null;
        }
        return response()->json([
            'message' => 'InforProduct found',
            'data' => $inforProduct,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $inforProduct = $this->inforProductService->find($id);
        if (!$inforProduct) {
            return response()->json([
                'message' => 'InforProduct not found',
            ], 404);
        }
        // Validate the request data
        $validated = $request->validate([
            'brand'            => 'nullable|string|max:225',
            'origin'           => 'nullable|string|max:225',
            'TeaQuality'       => 'nullable|string|max:225',
            'weight'           => 'nullable|string|max:225',
            'expiration_date'  => 'nullable|date',
            'note'             => 'nullable|string',
            'prepare'          => 'nullable|string',
        ]);
        // Update the InforProduct with the validated data
        $this->inforProductService->update($inforProduct, $validated);
        return response()->json([
            'message' => 'InforProduct updated successfully',
            'data' => $inforProduct,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the InforProduct by ID
        $inforProduct = $this->inforProductService->find($id);
        if (!$inforProduct) {
            return response()->json([
                'message' => 'InforProduct not found',
            ], 404);
        }
        $this->inforProductService->delete($id);
        return response()->json([
            'message' => 'InforProduct deleted successfully',
        ], 200);
    }
}
