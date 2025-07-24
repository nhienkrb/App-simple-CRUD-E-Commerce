<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\CategoryRepository;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

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
        try {
            $validator = Validator::make($data, [
                'category_name' => 'required|string|max:255',
                'slug' => 'required|string|max:255',
                'category_image' => 'required|file|image|max:10240', // thêm validate ảnh
            ]);
            if ($validator->fails()) {
                return [
                    'status' => false,
                    'errors' => $validator->errors()
                ];
            }
            $validated = $validator->validated();
            DB::beginTransaction();
            $cloudinary = new Cloudinary();
            $upload =   $cloudinary->uploadApi()->upload(
                $validated['category_image']->getRealPath(),
                [
                    'folder' => 'categories',
                    'public_id' => $validated['slug'], // sử dụng slug làm public_id
                ]
            );
            $category = $this->categoryRepository->create([
                'category_name' => $validated['category_name'],
                'slug' => $validated['slug'],
                'category_image' => $upload['secure_url'],
            ]);
            DB::commit();
            return [
                'status' => true,
                'message' => 'Tạo danh mục thành công',
                'category_id' => $category->id
            ];
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('Tạo sản danh mục bại: ' . $th->getMessage());
            return [
                'status' => false,
                'message' => 'Tạo danh mục thất bại',
                'error' => $th->getMessage(),
            ];
        }
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
