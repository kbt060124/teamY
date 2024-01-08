<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserPostController;
use App\Http\Controllers\UserPostNewsController;
use App\Http\Controllers\UserPostRecommendController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
});

Route::get('/home', [UserPostController::class, 'index'])->name('home');
Route::get('/owntimeline/{id}', [UserPostController::class, 'show'])->name('owntimeline');
Route::get('/ownrecommendationlist', [UserController::class, 'index'])->middleware(['auth', 'verified'])->name('ownrecommendationlist');
Route::get('/recommendationlist/{id}', [UserController::class, 'recommendationList'])->middleware(['auth', 'verified'])->name('recommendationlist');
Route::get('/search', [UserController::class, 'show'])->middleware(['auth', 'verified'])->name('search');

Route::get('/getuser', [UserController::class, "getAllUser"])->middleware('auth')->name('get.user');
Route::post('/ownprofile-edit', [UserController::class, "update"])->middleware('auth')->name('edit');

Route::post('/ownrecommendations-edit', [UserPostRecommendController::class, "update"])->middleware('auth')->name('ownrecommendations.edit');
Route::post('/ownrecommendations-store', [UserPostRecommendController::class, "store"])->middleware('auth')->name('ownrecommendations.store');

Route::post('/ownnews-store', [UserPostNewsController::class, "store"])->middleware('auth')->name('ownnews.store');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
