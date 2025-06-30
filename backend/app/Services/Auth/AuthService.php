<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthService
{
    public function login(array $credentials)
    {
        // Validate the request data
        $validated = validator($credentials, [
            'email' => 'required|email',
            'password' => 'required',
        ])->validate();

        // Find the user by email
        $user = User::where('email', $validated['email'])->first();

        // Check if user exists and password is correct
        if (!$user || !password_verify($validated['password'], $user->password)) {
            return [
                'status' => 401, // Unauthorized
                'token' => null,
                'message' => 'Invalid credentials',
                'user' => null
            ];
        }

        // Generate a token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return the token in the response
        return [
            'status' => 200, // OK
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user->makeHidden('password') // Hide sensitive data
        ];
    }

    public function register(array $data)
    {
        // Validate the request data
        $validated = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|',
        ]);

        if ($validated->fails()) {
            throw new \Illuminate\Validation\ValidationException($validated);
        };
        $validated = $validated->validated();
        // Hash the password
        $validated['password'] = Hash::make($validated['password']);
        // Create the user
        $user = User::create($validated);
        $user->sendEmailVerificationNotification();
        // Generate a token for the user
        $token = $user->createToken('auth_token')->plainTextToken;
        return [
            'message' => 'User registered successfully',
            'token' => $token,
            'user' => $user,
        ];
    }
}
