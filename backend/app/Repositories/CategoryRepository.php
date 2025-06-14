<?php

namespace App\Repositories;

use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategoryRepository
{
    public function getAll()
    {
        return Category::all();
    }

    public function create(array $data)
    {
        return Category::create($data);
    }

    public function find($id)
    {
        return Category::find($id);
    }

    public function update($id, array $data)
    {
        $category = Category::find($id);
        if ($category) {
            $category->update($data);
        }
        return $category;
    }

    public function delete($id)
    {
        $category = Category::find($id);
        if ($category) {
            $category->delete();
        }
        return $category;
    }
    public function getAllCategories_Name()
    {
        return Category::select('category_name')->distinct()->pluck('category_name');
    }

    public function getCategoryName_ProductTagName(){
       return DB::table('categories')
        ->leftJoin('products', 'categories.id', '=', 'products.category_id')
        ->select('categories.id as category_id', 'categories.category_name','categories.slug', 'products.tag_name', 'products.tag')
        ->get();
    }
}
