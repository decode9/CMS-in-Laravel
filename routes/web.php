<?php

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

//Authentication routes
Auth::routes();

// FrontEnd Routes

Route::get('/', 'WebController@index')->name('index');

Route::get('/news', 'frontend\NewsController@index')->name('news.front');
Route::get('news/show/{id}', 'frontend\NewsController@show')->name('notice.front');

Route::get('/under', function(){
    return view('front.underconstruction');
});

Route::post('/mailcontact', 'Mail\MailController@contactMail')->name('contact.mail');
// BACKEND
Route::get('/home', 'HomeController@index')->name('home');

//USER ADMINISTRATION BACKEND
Route::get('/users', 'backend\UserController@index')->name('users');
Route::get('/users/new', 'backend\UserController@create')->name('create.user');
Route::post('/users/new', "backend\UserController@store")->name('store.user');
Route::get('/users/edit/{id}', 'backend\UserController@edit')->name('edit.user');
Route::post('/users/edit/{id}', 'backend\UserController@update')->name('update.user');
Route::get('/users/delete/{id}', 'backend\UserController@destroy')->name('destroy.user');

//NEWS ADMINISTRATION BACKEND
Route::get('/news/admin', "backend\NewsController@index")->name('news');
Route::get('/news/new', "backend\NewsController@create")->name('create.news');
Route::post('/news/new', "backend\NewsController@store")->name('store.news');
Route::get('/news/edit/{id}', 'backend\NewsController@edit')->name('edit.news');
Route::post('/news/edit/{id}', 'backend\NewsController@update')->name('update.news');
Route::get('/news/delete/{id}', 'backend\NewsController@destroy')->name('destroy.news');
