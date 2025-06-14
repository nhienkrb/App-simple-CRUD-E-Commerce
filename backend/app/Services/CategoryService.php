<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\CategoryRepository;

class CategoryService
{

    protected $categoryRepository;

    public function __construct(CategoryRepository $_categoryRepository)
    {
        $this->categoryRepository = $_categoryRepository;
    }

    public function getAll()
    {
        return $this->categoryRepository->getAll();
    }

    public function create(array $data)
    {
        return $this->categoryRepository->create($data);
    }

    public function find(int $id)
    {
        return $this->categoryRepository->find($id);
    }

    public function update(int $id, array $data)
    {
        return $this->categoryRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->categoryRepository->delete($id);
    }


    public function getAllNames()
    {
        return $this->categoryRepository->getAllCategories_Name();
    }

   // App/Services/CategoryService.php

public function getCategoryName_ProductTagName()
{
    $data = $this->categoryRepository->getCategoryName_ProductTagName();

    // Group theo category_id (tránh group theo tên trùng lặp)
    $grouped = $data->groupBy('category_id');
    // Biến kết quả về dạng array rõ ràng
    $result = [];

    foreach ($grouped as $category_id => $items) {
        $first = $items->first(); // lấy thông tin category

        $result[] = [
            'category_id' => $category_id,
            'category_name' => $first->category_name,
            'slug' => $first->slug,
            'tag_name' => $items->pluck('tag_name')->unique()->values(), // loại trùng tag
            'tag' => $items->pluck('tag')->unique()->values(), // nếu cần
        ];
    }

    return $result;
}

}
