<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Auth\AuthService;
use App\Services\Auth\LoginService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{

  protected $authService;
  public function __construct(AuthService $authService)
  {
    $this->authService = $authService;
  }

  public function login(Request $request)
  {
    $isLogin = $this->authService->login($request->all());
    return response()->json($isLogin);
  }

  public function logout(Request $request)
  {
    $user = $request->user();
    if ($user) {
      $user->tokens()->delete();
      return response()->json(['message' => 'Logout successful'], 200);
    }
    return response()->json(['message' => 'User not authenticated'], 401);
  }

  public function register(Request $request)
  {
    try {
      DB::beginTransaction();
      $user = $this->authService->register($request->all());
      DB::commit(); // Commit the transaction if everything is successful
      return response()->json($user, 201);
    } catch (\Throwable $th) {
      DB::rollBack(); // Rollback the transaction if there is an error
      return response()->json([
        'message' => 'Registration failed',
        'error' => $th->getMessage(),
      ], 400);
    }
  }
}
