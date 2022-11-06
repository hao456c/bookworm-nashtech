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

Route::middleware(['auth:sanctum'])->group(function () {    

    Route::delete('session', [LoginController::class, 'logout'])->name('api.logout');

    //order routing
    Route::post('/order',[OrderController::class,'createorder']);
});

    //login routing
    Route::post('session', [LoginController::class, 'login'])->name('api.login');

    //author routing
    Route::get('/author',[AuthorController::class,'getAuthor']);

    
    // book routing
    Route::get('/book/detail',[BookController::class,'getBookByID']); 
    Route::get('/book/shop',[BookController::class,'indexshop']);
    Route::get('/home/onsale',[BookController::class,'showHomeBookOnSale']);
    Route::get('/home/popular',[BookController::class,'showHomeBookPopular']); 
    Route::get('/home/recommended',[BookController::class,'showHomeBookRecommended']); 

    // category routing
    Route::get('/category',[CategoryController::class,'index']);


    // review routing
    Route::get('/review',[ReviewController::class,'getReviewByBook']);
    Route::post('/review/create',[ReviewController::class,'createReview']);
    Route::get('/review/rating', [ReviewController::class, 'getRating']);