<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all products from the database
        $product = Product::all();

        // Return the products as a JSON response
        return response()->json($product);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'product_name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
        ]);
        // Create a new product instance
        $product =  Product::create($validateData);
        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product = Product::find($product->id);  // Dùng tìm kiếm theo ID

        if ($product == null) {
            // Trả về JSON với mã lỗi 404 khi không tìm thấy sản phẩm
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }

        // Trả về thông tin sản phẩm dưới dạng JSON
        return response()->json([
            'data' => $product,
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        // Validate dữ liệu yêu cầu
        $validatedData = $request->validate([
            'product_name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'quantity' => 'required|integer',
        ]);

        // Cập nhật sản phẩm với dữ liệu đã được xác thực
        $product->update($validatedData);

        // Trả về phản hồi JSON (hoặc có thể redirect)
        return response()->json([
            'message' => 'Product updated successfully.',
            'product' => $product
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Kiểm tra nếu sản phẩm tồn tại
        if ($product) {
            // Xóa sản phẩm
            $product->delete();

            // Trả về phản hồi JSON xác nhận xóa thành công
            return response()->json([
                'message' => 'Product deleted successfully.'
            ]);
        }

        // Nếu không tìm thấy sản phẩm, trả về lỗi 404
        return response()->json([
            'message' => 'Product not found.'
        ], 404);
    }
}
