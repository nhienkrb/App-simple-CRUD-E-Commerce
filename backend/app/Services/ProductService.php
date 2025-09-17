<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Str;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ProductService
{
    public function getAll()
    {
        return Product::all();
    }

    public function create(array $data): array
    {

        if (isset($data['variants']) && is_string($data['variants'])) {
            $decodedVariants = json_decode($data['variants'], true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return [
                    'status' => false,
                    'message' => 'Dữ liệu variants không hợp lệ (JSON sai cú pháp)',
                ];
            }

            $data['variants'] = $decodedVariants;
        }

        $validator = Validator::make($data, [
            'product_name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required|integer|exists:categories,id',
            'quantity' => 'required|integer|min:0',
            'image' => 'required|image|max:10240',
            'description' => 'nullable|string',
            'tag' => 'nullable|string',
            'tag_name' => 'nullable|string',

            // InforProduct
            'brand' => 'nullable|string',
            'origin' => 'nullable|string',
            'TeaQuality' => 'nullable|string',
            'weight' => 'nullable|string',
            'expiration_date' => 'nullable|date',
            'note' => 'nullable|string',
            'prepare' => 'nullable|string',
            'description_infoProduct' => 'nullable|string',

            // Variants
            'variants' => 'nullable|array',
            'variants.*.sku' => 'required_with:variants|string',
            'variants.*.stock_quantity' => 'required_with:variants|integer',
            'variants.*.specifications' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return [
                'status' => false,
                'errors' => $validator->errors()
            ];
        }

        $validated = $validator->validated();

        DB::beginTransaction();

        try {
            $cloudinary = new Cloudinary();
            $upload = $cloudinary->uploadApi()->upload(
                $validated['image']->getRealPath(),
                ['folder' => 'products']
            );

            $product = Product::create([
                'product_name' => $validated['product_name'],
                'slug' => Str::slug($validated['product_name']),
                'price' => $validated['price'],
                'quantity' => $validated['quantity'],
                'category_id' => $validated['category_id'],
                'description' => $validated['description'] ?? null,
                'tag' => $validated['tag'] ?? null,
                'tag_name' => $validated['tag_name'] ?? null,
                'image' => $upload['secure_url'],
                'public_id' => $upload['public_id'],
                'is_active' => true,
            ]);

            // Infor Product
            $product->inforProduct()->create([
                'brand' => $validated['brand'] ?? null,
                'origin' => $validated['origin'] ?? null,
                'TeaQuality' => $validated['TeaQuality'] ?? null,
                'weight' => $validated['weight'] ?? null,
                'expiration_date' => $validated['expiration_date'] ?? null,
                'note' => $validated['note'] ?? null,
                'prepare' => $validated['prepare'] ?? null,
                'description_infoProduct' => $validated['description_infoProduct'] ?? null,
            ]);

            // Product Variants
            if (!empty($validated['variants'])) {
                foreach ($validated['variants'] as $variant) {
                    $product->variants()->create([
                        'sku' => $variant['sku'],
                        'stock_quantity' => $variant['stock_quantity'],
                        'specifications' => json_encode($variant['specifications'] ?? []),
                    ]);
                }
            }

            DB::commit();

            return [
                'status' => true,
                'message' => 'Tạo sản phẩm thành công',
                'product_id' => $product->id
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Tạo sản phẩm thất bại: ' . $e->getMessage());

            return [
                'status' => false,
                'message' => 'Tạo sản phẩm thất bại',
                'error' => $e->getMessage(),
            ];
        }
    }

    public function find($id)
    {
        return Product::find($id);
    }

    public function findBySlug($slug)
    {
        return Product::where('slug', $slug)->with('inforProduct')->first();
    }

    public function getProductBySlug($slug, $withProducts = false)
    {
        $category = Category::select("id", "category_name", "slug", "category_image")->where('slug', $slug)->firstOrFail();
        // dd($category->products()->get());
        if ($withProducts) {
            $products = $category->products()
                ->select('id', 'product_name', 'slug', 'image')
                ->where('is_active', 'true')
                ->limit(10)
                ->get();

            return [
                'category' => $category,
                'products' => $products,
            ];
        }

        return $category;
    }


    public function getFeaturedProducts()
    {
        $products = Product::select('id', 'product_name', 'price', 'image', 'created_at', 'is_active')
            ->where('is_active', true)
            ->limit(10)
            ->get();

        return $products;
    }

    public function getSearchProducts($productsName)
    {
        $products = Product::select('id', 'product_name', 'price', 'image', 'created_at', 'is_active')
            ->where('product_name', 'like', "%{$productsName}%")
            ->get();
        return $products;
    }






    public function delete(int $id): array
    {
        $product = Product::with('variants', 'inforProduct')->find($id);

        if (!$product) {
            return [
                'status' => false,
                'message' => 'Không tìm thấy sản phẩm'
            ];
        }

        DB::beginTransaction();

        try {
            $cloudinary = new Cloudinary();
            if ($product->public_id) {
                $cloudinary->uploadApi()->destroy($product->public_id);
            }

            $product->variants()->delete();
            $product->inforProduct()->delete();
            $product->delete();

            DB::commit();

            return [
                'status' => true,
                'message' => 'Xóa sản phẩm thành công'
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Xóa sản phẩm thất bại: ' . $e->getMessage());

            return [
                'status' => false,
                'message' => 'Xóa sản phẩm thất bại',
                'error' => $e->getMessage()
            ];
        }
    }

    public function update(int $id, array $data): array
    {
        $product = Product::with('variants', 'inforProduct')->find($id);

        if (!$product) {
            return [
                'status' => false,
                'message' => 'Không tìm thấy sản phẩm'
            ];
        }

        if (isset($data['variants']) && is_string($data['variants'])) {
            $decodedVariants = json_decode($data['variants'], true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $data['variants'] = $decodedVariants;
            }
        }

        $validator = Validator::make($data, [
            'product_name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric',
            'category_id' => 'sometimes|integer|exists:categories,id',
            'quantity' => 'sometimes|integer|min:0',
            'image' => 'nullable|image|max:10240',
            'description' => 'nullable|string',
            'tag' => 'nullable|string',
            'tag_name' => 'nullable|string',
            'brand' => 'nullable|string',
            'origin' => 'nullable|string',
            'TeaQuality' => 'nullable|string',
            'weight' => 'nullable|string',
            'expiration_date' => 'nullable|date',
            'note' => 'nullable|string',
            'prepare' => 'nullable|string',
            'description_infoProduct' => 'nullable|string',
            'variants' => 'nullable|array',
            'variants.*.sku' => 'required_with:variants|string|max:255',
            'variants.*.stock_quantity' => 'required_with:variants|integer|min:0',
            'variants.*.specifications' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return [
                'status' => false,
                'errors' => $validator->errors()
            ];
        }

        $validated = $validator->validated();

        DB::beginTransaction();

        try {
            $cloudinary = new Cloudinary();

            if (!empty($validated['image'])) {
                if ($product->public_id) {
                    $cloudinary->uploadApi()->destroy($product->public_id);
                }

                $upload = $cloudinary->uploadApi()->upload(
                    $validated['image']->getRealPath(),
                    ['folder' => 'products']
                );

                $validated['image'] = $upload['secure_url'];
                $validated['public_id'] = $upload['public_id'];
            }

            $product->update($validated);

            if ($product->inforProduct) {
                $product->inforProduct()->update([
                    'brand' => $validated['brand'] ?? $product->inforProduct->brand,
                    'origin' => $validated['origin'] ?? $product->inforProduct->origin,
                    'TeaQuality' => $validated['TeaQuality'] ?? $product->inforProduct->TeaQuality,
                    'weight' => $validated['weight'] ?? $product->inforProduct->weight,
                    'expiration_date' => $validated['expiration_date'] ?? $product->inforProduct->expiration_date,
                    'note' => $validated['note'] ?? $product->inforProduct->note,
                    'prepare' => $validated['prepare'] ?? $product->inforProduct->prepare,
                    'description_infoProduct' => $validated['description_infoProduct'] ?? $product->inforProduct->description_infoProduct,
                ]);
            }

            if (isset($validated['variants'])) {
                $product->variants()->delete();
                foreach ($validated['variants'] as $variant) {
                    $product->variants()->create([
                        'sku' => $variant['sku'],
                        'stock_quantity' => $variant['stock_quantity'],
                        'specifications' => json_encode($variant['specifications'] ?? []),
                    ]);
                }
            }

            DB::commit();

            return [
                'status' => true,
                'message' => 'Cập nhật sản phẩm thành công'
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Cập nhật sản phẩm thất bại: ' . $e->getMessage());

            return [
                'status' => false,
                'message' => 'Cập nhật sản phẩm thất bại',
                'error' => $e->getMessage()
            ];
        }
    }

    public function filterProduct(array $filters)
    {
        $query = Product::query();

        // ✅ Lọc theo category (slug)
        if (!empty($filters['category'])) {
            $query->whereHas('category', function ($q) use ($filters) {
                $q->where('slug', $filters['category']);
            });
        }

        // ✅ Sắp xếp
        if (isset($filters['sort'])) {
            switch ($filters['sort']) {
                case 'name_asc':
                    $query->orderBy('product_name', 'asc');
                    break;
                case 'name_desc':
                    $query->orderBy('product_name', 'desc');
                    break;
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
            }
        }

        // ✅ Phân trang
        $limit = $filters['limit'] ?? 10;
        return $query->paginate($limit);
    }
}
