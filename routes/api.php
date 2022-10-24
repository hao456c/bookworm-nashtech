<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/  
Route::post('session', [LoginController::class, 'login'])->name('api.login');
Route::post('/review/create',[ReviewController::class,'createReview']);
Route::middleware(['auth:sanctum'])->group(function () {

    Route::delete('session', [LoginController::class, 'logout'])->name('api.logout');

    Route::get('/author/{id}',[AuthorController::class,'getAuthorByBook']);
});
    Route::get('/author',[AuthorController::class,'getAuthor']);
    Route::get('/book/detail/{id}',[BookController::class,'getBookByID']); 
    Route::get('/home/onsale',[BookController::class,'showHomeBookOnSale']);
    Route::get('/home/popular',[BookController::class,'showHomeBookPopular']); 
    Route::get('/home/recommended',[BookController::class,'showHomeBookRecommended']); 
    Route::get('/book/shop',[BookController::class,'indexshop']);
    Route::post('/order',[OrderController::class,'createorder']);
    Route::get('/category',[CategoryController::class,'index']);
    Route::get('/review',[ReviewController::class,'getReviewByBook']);