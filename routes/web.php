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
Route::post('/users/create', 'backend\UserController@store')->name('users.create')->middleware('auth.per:0100');
Route::post('/users/update', 'backend\UserController@update')->name('users.update')->middleware('auth.per:0100');
Route::post('/users/delete', 'backend\UserController@destroy')->name('users.delete')->middleware('auth.per:0100');
Route::post('/users/roles', 'backend\UserController@userRoles')->name('users.roles')->middleware('auth.per:0100');
Route::post('/users/clients', 'backend\UserController@userClients')->name('users.clients')->middleware('auth.per:0100');

Route::get('/currencies', 'backend\ViewsController@currencies')->name('currencies')->middleware('auth.per:0100');
Route::post('/currencies', 'backend\CurrenciesController@index')->name('currencies.list')->middleware('auth.per:0100');
Route::post('/currencies/create', 'backend\CurrenciesController@store')->name('currencies.create')->middleware('auth.per:0100');
Route::post('/currencies/update', 'backend\CurrenciesController@update')->name('currencies.update')->middleware('auth.per:0100');
Route::post('/currencies/delete', 'backend\CurrenciesController@destroy')->name('currencies.delete')->middleware('auth.per:0100');

//NEWS ADMINISTRATION BACKEND

Route::get('/news/admin', "backend\NewsController@index")->name('news');
Route::get('/news/new', "backend\NewsController@create")->name('create.news');
Route::post('/news/new', "backend\NewsController@store")->name('store.news');
Route::get('/news/edit/{id}', 'backend\NewsController@edit')->name('edit.news');
Route::post('/news/edit/{id}', 'backend\NewsController@update')->name('update.news');
Route::get('/news/delete/{id}', 'backend\NewsController@destroy')->name('destroy.news');

//FUNDS

Route::get('/funds', "backend\ViewsController@funds")->name('funds')->middleware('auth.per:0150');
Route::post('/funds/currency', "backend\FundsController@indexCurrency")->name('currency.funds')->middleware('auth.per:0150');
Route::post('/funds/crypto', "backend\FundsController@indexCrypto")->name('crypto.funds')->middleware('auth.per:0150');
Route::post('/funds/token', "backend\FundsController@indexToken")->name('crypto.funds')->middleware('auth.per:0150');
Route::post('/funds/currencies', "backend\FundsController@currencies")->name('currencies.funds')->middleware('auth.per:0150');
Route::post('/funds/available', "backend\FundsController@available")->name('currencies.funds')->middleware('auth.per:0150');
Route::post('/funds/exchange', "backend\FundsController@exchange")->name('exchange.funds')->middleware('auth.per:0150');

/*
Route::post('/deposit', "backend\FundsController@deposits")->name('deposit.funds')->middleware('auth.per:0151');
Route::post('/deposit/create', "backend\FundsController@store")->name('store.deposit')->middleware('auth.per:0152');
Route::post('/withdraw', "backend\FundsController@withdraws")->name('withdraw.funds')->middleware('auth.per:0151');
Route::post('/withdraw/create', "backend\FundsController@update")->name('update.withdraw')->middleware('auth.per:0153');
Route::get('/funds/return', "backend\FundsController@destroy")->name('destroy.funds')->middleware('auth.per:0154');
*/
//Orders

Route::get('/orders', "backend\ViewsController@orders")->name('orders')->middleware('auth.per:0200');
Route::post('/orders', "backend\OrdersController@orders")->name('orders.list')->middleware('auth.per:0201');
Route::post('/orders/buySell', "backend\OrdersController@buySell")->name('orders.buySell')->middleware('auth.per:0202');
Route::post('/orders/balance', "backend\OrdersController@balance")->name('orders.balance')->middleware('auth.per:0202');

//Clients

Route::get('/clients', "backend\ViewsController@clients")->name('clients')->middleware('auth.per:0250');
Route::post('/clients/list', "backend\ClientsController@index")->name('clients.list')->middleware('auth.per:0251');
Route::post('/clients/currency', "backend\ClientsController@indexCurrency")->name('currency.funds')->middleware('auth.per:0150');
Route::post('/clients/crypto', "backend\ClientsController@indexCrypto")->name('crypto.funds')->middleware('auth.per:0150');
Route::post('/clients/token', "backend\ClientsController@indexToken")->name('crypto.funds')->middleware('auth.per:0150');
Route::post('/clients/initials', "backend\ClientsController@initial")->name('crypto.funds')->middleware('auth.per:0150');

//Accounts

Route::post('/account', "backend\AccountController@index")->name('account.list')->middleware('auth.per:0151');
Route::post('/account/create', "backend\AccountController@store")->name('account.create')->middleware('auth.per:0152');

//TRANSACTIONS

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
