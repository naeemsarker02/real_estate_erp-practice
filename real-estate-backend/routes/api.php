<?php

use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UnitController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DocumentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{project}', [ProjectController::class, 'show']);

    Route::middleware('role:admin')->group(function () {
        Route::post('/projects', [ProjectController::class, 'store']);
        Route::put('/projects/{project}', [ProjectController::class, 'update']);
        Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
    });

    Route::get('/units', [UnitController::class, 'index']);
    Route::get('/units/{unit}', [UnitController::class, 'show']);

    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{booking}', [BookingController::class, 'show']);

    Route::get('/bookings/{booking}/documents', [DocumentController::class, 'index']);
    Route::post('/bookings/{booking}/documents', [DocumentController::class, 'store']);
    Route::delete('/documents/{document}', [DocumentController::class, 'destroy']);

    Route::middleware('role:admin')->group(function () {
        Route::post('/units', [UnitController::class, 'store']);
        Route::put('/units/{unit}', [UnitController::class, 'update']);
        Route::delete('/units/{unit}', [UnitController::class, 'destroy']);
    });

    Route::middleware('role:admin,employee')->group(function () {
        Route::put('/bookings/{booking}', [BookingController::class, 'update']);
    });
});