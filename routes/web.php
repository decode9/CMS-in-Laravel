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

Route::get('/users', 'backend\ViewsController@users')->name('users')->middleware('auth.per:0100');
Route::post('/users', 'backend\UserController@index')->name('users.list')->middleware('auth.per:0100');


//NEWS ADMINISTRATION BACKEND

Route::get('/news/admin', "backend\NewsController@index")->name('news');
Route::get('/news/new', "backend\NewsController@create")->name('create.news');
Route::post('/news/new', "backend\NewsController@store")->name('store.news');
Route::get('/news/edit/{id}', 'backend\NewsController@edit')->name('edit.news');
Route::post('/news/edit/{id}', 'backend\NewsController@update')->name('update.news');
Route::get('/news/delete/{id}', 'backend\NewsController@destroy')->name('destroy.news');

//FUNDS

Route::get('/funds', "backend\ViewsController@funds")->name('funds')->middleware('auth.per:0150');
Route::get('/funds/transactions', "backend\FundsController@index")->name('transactions.funds')->middleware('auth.per:0150');
Route::post('/deposit', "backend\FundsController@deposits")->name('deposit.funds')->middleware('auth.per:0151');
Route::post('/deposit/create', "backend\FundsController@store")->name('store.deposit')->middleware('auth.per:0152');
Route::post('/withdraw', "backend\FundsController@withdraws")->name('withdraw.funds')->middleware('auth.per:0151');
Route::post('/withdraw/create', "backend\FundsController@update")->name('update.withdraw')->middleware('auth.per:0153');
Route::get('/funds/return', "backend\FundsController@destroy")->name('destroy.funds')->middleware('auth.per:0154');

//Orders

Route::get('/orders', "backend\ViewsController@orders")->name('orders')->middleware('auth.per:0200');
Route::post('/orders', "backend\OrdersController@orders")->name('orders.list')->middleware('auth.per:0201');
Route::post('/orders/buySell', "backend\OrdersController@buySell")->name('orders.buySell')->middleware('auth.per:0202');
Route::post('/orders/balance', "backend\OrdersController@balance")->name('orders.balance')->middleware('auth.per:0202');

//Clients

Route::get('/clients', "backend\ViewsController@clients")->name('clients')->middleware('auth.per:0250');
Route::post('/clients/data', "backend\OrdersController@orders")->name('clients.list')->middleware('auth.per:0251');

//Accounts

Route::post('/account', "backend\AccountController@index")->name('account.list')->middleware('auth.per:0151');
Route::post('/account/create', "backend\AccountController@store")->name('account.create')->middleware('auth.per:0152');

//TRANSACTIONS
