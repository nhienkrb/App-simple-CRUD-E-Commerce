<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderDetailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/user', function () {
    return response()->json(
        data: [
            'name' => 'John Doe',
            'email' => 'nhienn@gmail.com'
        ],
        status: 200
    );
});

Route::prefix('v1')->group(function(){
    Route::apiResource('products', ProductController::class);
    Route::get('products/search', [ProductController::class, 'search'])->name('products.search');
});

Route::prefix('v1')->group(function(){
    Route::apiResource('categories',CategoryController::class);
});

Route::prefix('v1')->group(function(){
    Route::apiResource('orders', OrderController::class);
});

Route::prefix('v1')->group(function(){
    Route::apiResource('order-details', OrderDetailController::class);
});

Route::prefix('v1')->group(function(){
    Route::apiResource('users', UserController::class);
});