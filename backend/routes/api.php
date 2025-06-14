<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderDetailController;
use App\Http\Controllers\Api\UserController;
use App\Models\Category;
use App\Models\Product;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Tất cả route API sẽ đi qua middleware "api" theo mặc định.
| File này được load tự động bởi RouteServiceProvider.
*/

Route::get('/user', function () {
    return response()->json([
        'name' => 'John Doe',
        'email' => 'nhienn@gmail.com',
    ], 200);
});

// Authentication routes
Route::prefix('v1/auth')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('register', [AuthController::class, 'register'])->name('auth.register');
});

// Email verification routes
Route::middleware('auth:sanctum')->group(function () {
    // Xác minh email
    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        return response()->json(['message' => 'Email verified successfully']);
    })->middleware(['signed'])->name('verification.verify');

    // Gửi lại email xác minh
    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'Verification email sent']);
    })->name('verification.send');
});

//API routes custom products controller
Route::controller(ProductController::class)->prefix('v1/products')->group(function () {
    Route::get('search', 'search')->name('products.search');
    Route::get('slug/{slug}', 'findBySlug')->name('products.findBySlug');
    Route::get('filter-products', 'filterProduct')->name('products.filterProduct');
});

Route::controller(CategoryController::class) ->prefix('v1/categories')->group(function(){
    Route::get('names', 'getNames')->name('categories.getNames');
});

// API resources with versioning
Route::prefix('v1')->group(function () {
    Route::apiResource('products', ProductController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('order-details', OrderDetailController::class);
    Route::apiResource('users', UserController::class);
});

