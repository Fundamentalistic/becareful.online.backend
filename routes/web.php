<?php

use Illuminate\Support\Facades\Route;
use App\Models\Site;
use Illuminate\Http\Request;
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


// Route::get('/', [\App\Http\Controllers\ReviewController::class, 'index']);
Route::get('/', function(){
    return view('index');
});

Route::get('/new', function(){
    return view('newsite');
});

Route::get('/site', function(){
    return view('main');
});

Route::get('/review/list', [\App\Http\Controllers\ReviewController::class, "index"]);

Route::get('/site/{id}/detail', [\App\Http\Controllers\SiteController::class, "detail"]); // Сделать представление

Route::post('/review/new', [\App\Http\Controllers\ReviewController::class, 'create']); // Сделать фронт

Route::get('/main/{site_id}', [\App\Http\Controllers\SiteController::class, 'main']); // Выполнено
Route::post('/site/new', [\App\Http\Controllers\SiteController::class, 'create']);

Route::middleware('cors')->group(function(){

    Route::post('/new', [\App\Http\Controllers\SiteController::class, 'create'])
        ->name('site_creation_route');

    Route::get('/test', function(Request $request){
        var_dump($request->toArray());
    });
});






