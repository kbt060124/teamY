<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserPostRecommendController;
use App\Http\Controllers\UserProfileController;
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
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home', function(){
    return Inertia::render('Home');
})->name('home');

Route::get('/ownrecommendationlist',  [UserController::class, 'index'])->middleware(['auth', 'verified'])->name('ownrecommendationlist');
Route::get('/getuser', [UserController::class,"getAllUser"])->middleware('auth')->name('get.user'); 
Route::get('/getuserInfo', [UserController::class,"getUserInfo"])->middleware('auth')->name('get.userInfo'); 

Route::post('/ownprofile-edit', [UserController::class,"update"])->middleware('auth')->name('edit'); 

Route::post('/ownrecommendations-edit', [UserPostRecommendController::class,"update"])->middleware('auth')->name('ownrecommendations.edit'); 
Route::post('/ownrecommendations-store', [UserPostRecommendController::class,"store"])->middleware('auth')->name('ownrecommendations.store'); 

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
