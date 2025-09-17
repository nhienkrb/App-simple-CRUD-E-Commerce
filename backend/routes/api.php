<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ChatBotController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderDetailController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\PaymentMoMoController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Tất cả route API sẽ đi qua middleware "api" theo mặc định.
| File này được load tự động bởi RouteServiceProvider.
*/


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
    Route::get('category/{slug}?isProduct=', 'findByCategorySlug')->name('products.findByCategorySlug');
    Route::get('featured', 'getAllFeaturedProducts')->name('products.getAllFeaturedProducts');
});

Route::controller(CategoryController::class)->prefix('v1/categories')->group(function () {
    Route::get('names', 'getNames')->name('categories.getNames');
});

Route::middleware('auth:sanctum')
    ->prefix('v1/orders')
    ->controller(OrderController::class)
    ->group(function () {
        Route::post('order-items', 'orderItems')->name('order.orderItems');
    });

Route::prefix('v1/orders/')->group(function () {
    Route::get('order-manager', [OrderController::class, 'index']);
    Route::get('orders/{id}', [OrderController::class, 'show']);
    Route::get('user/orders', [OrderController::class, 'userOrders']);
});

Route::post('/chatbot', [ChatBotController::class, 'chat']);
// routes/api.php
Route::post('/v1/payment/vnpay', [PaymentController::class, 'createPayment']);
Route::post('/v1/payment/momo', [PaymentMoMoController::class, 'createPayment']);
Route::middleware('auth:sanctum')->get('/v1/payment/order-temp', function (Request $request) {
    $key = $request->query('key');
    $payload = cache()->get("order_payload_$key");
    Log::info($payload);
    if (!$payload) {
        return response()->json(['message' => 'Dữ liệu hết hạn hoặc không hợp lệ'], 404);
    }

    return response()->json(['payload' => $payload]);
});

Route::post('/v1/recommend-products', [ProductController::class, 'recommend']);
Route::prefix('/v1/dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index']);
    Route::get('/top3-products', [DashboardController::class, 'getTop3ProductsController']);
    Route::get('/top3-products/month', [DashboardController::class, 'getTop3ProductsByMonth']);
});
// API resources with versioning
Route::prefix('v1')->group(function () {
    Route::apiResource('products', ProductController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('order-details', OrderDetailController::class);
    Route::apiResource('users', UserController::class);
});
