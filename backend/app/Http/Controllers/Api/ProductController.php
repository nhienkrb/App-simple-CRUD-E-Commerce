<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $productService;
    public final function __construct(ProductService $productService)
    {
        // Inject the ProductService into the controller
        $this->productService = $productService;
    }
    public function index()
    {
        // Fetch all products from the database
        $products = $this->productService->getAll();

        // Return the products as a JSON response
        return response()->json([
            'data' => $products,
            'message' => 'Product All',
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request`
        return $this->productService->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product = $this->productService->find($product->id);

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
            'data' => $product
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
            $this->productService->delete($product->id);

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

    public function findBySlug($slug)
    {

        // Kiểm tra xem slug có được cung cấp hay không
        if (empty($slug)) {
            return response()->json([
                'message' => 'Slug is required',
            ], 400);
        }
        // Tìm sản phẩm theo slug
        $product = $this->productService->findBySlug($slug);
        if ($product == null) {
            // Trả về JSON với mã lỗi 404 khi không tìm thấy sản phẩm
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }

        // Trả về thông tin sản phẩm dưới dạng JSON
        return response()->json([
            'message' => 'Product found',

            'data' => $product,
        ], 200);
    }


    public function filterProduct(Request $request)
    {
        $filters = $request->only(['page', 'limit', 'sort']);
        $product = $this->productService->filterProduct($filters);
        return response()->json([
            'message' => 'Product filtered successfully',
            'data' => $product,
        ], 200);
    }

    public function recommend(Request $request)
    {
        $user = $request->user();

        if ($user) {
            // Đã đăng nhập → dựa theo lịch sử mua hàng
            $boughtProductIds = DB::table('order_details')
                ->join('orders', 'orders.id', '=', 'order_details.order_id')
                ->where('orders.user_id', $user->id)
                ->where('orders.created_at', '>=', now()->subDays(15))
                ->pluck('order_details.product_id')
                ->unique();

            $categoryIds = Product::whereIn('id', $boughtProductIds)->pluck('category_id')->unique();

            $recommended = Product::whereIn('category_id', $categoryIds)
                ->whereNotIn('id', $boughtProductIds)
                ->limit(10)
                ->get();

            return response()->json([
                'products' => $recommended,
                'message' => "Gợi ý theo lịch sử mua hàng"
            ]);
        }

        $cartProductIds = $request->input('cart_product_ids', []);

        if (empty($cartProductIds)) {
            return response()->json([
                'products' => [],
                'message' => 'Không có dữ liệu giỏ hàng'
            ]);
        }

        $categoryIds = Product::whereIn('id', $cartProductIds)->pluck('category_id')->unique();

        $recommended = Product::whereIn('category_id', $categoryIds)
            ->whereNotIn('id', $cartProductIds)
            ->limit(10)
            ->get();

        return response()->json([
            'products' => $recommended,
            'message' => "Gợi ý theo giỏ hàng"
        ]);
    }
}
