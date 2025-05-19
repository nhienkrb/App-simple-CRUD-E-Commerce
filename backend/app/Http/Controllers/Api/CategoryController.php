<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    protected $categoryService;
    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $categories = $this->categoryService->getAll();
        return response()->json([
            'data' => $categories,
            'message' => 'Categories retrieved successfully',
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'category_name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
        ]);

        // Create a new category
        $category = $this->categoryService->create($validatedData);

        // Return a response
        return response()->json([
            'message' => 'Category created successfully',
            'data' => $category,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = $this->categoryService->find($id);
        if ($category == null) {
            // Return a JSON response with a 404 error code when the category is not found
            return response()->json([
                'data' => [],
                'message' => 'Category not found',
            ], 404);
        }
        return response()->json([
            'data' => $category,
            'message' => 'Category found',
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $validateData = $request->validate([
            'category_name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
        ]);

        // Find the category by ID
        $category = Category::find($id);
        // Check if the category exists
        $checkCategory = Category::where('slug', $validateData['slug'])->first();
        if (!$category) {
            return response()->json([
                'message' => 'Category not found',
            ], 404);
        }
        // Update the category
        $category->update($validateData);
        return response()->json([
            'message' => 'Category updated successfully',
            'data' => $category,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       $category = $this->categoryService->delete($id);
        if ($category == null) {
            // Return a JSON response with a 404 error code when the category is not found
            return response()->json([
                'data' => [],
                'message' => 'Category not found',
            ], 404);
        }
        return response()->json([
            'data' => $category,
            'message' => 'Category deleted successfully',
        ], 200);
    }
}
