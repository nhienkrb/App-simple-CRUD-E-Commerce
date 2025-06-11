<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Str;

class ProductService
{
    public function getAll()
    {
        return Product::all();
    }

    public function create(array $data)
    {
        $data['slug'] = Str::slug($data['name'], '-');
        return Product::create($data);
    }

    public function find($id)
    {
        return Product::find($id);
    }

    public function findBySlug($slug)
    {
        return Product::with('inforProduct')->where('slug', $slug)->first();
    }

    public function update($id, array $data)
    {
        $product = Product::find($id);
        if ($product) {
            $product->update($data);
        }
        return $product;
    }

    public function delete($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->delete();
        }
        return $product;
    }

public function filterProduct(array $filters)
{
    $query = Product::query();

    // Sắp xếp
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

    // Phân trang
    $limit = $filters['limit'] ?? 10;
    return $query->paginate($limit);
}
}
