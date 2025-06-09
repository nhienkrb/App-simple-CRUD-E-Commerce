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
}