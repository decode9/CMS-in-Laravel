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
/*
Route::get('/news', 'frontend\NewsController@index')->name('news.front');
Route::get('news/show/{id}', 'frontend\NewsController@show')->name('notice.front');
*/
Route::get('/under', function(){
    return view('front.underconstruction');
});

Route::post('/mailcontact', 'Mail\MailController@contactMail')->name('contact.mail');

// BACKEND

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/profile', 'backend\ViewsController@profile')->name('profile')->middleware('auth.per:0');
Route::post('/dashboard/balance', 'backend\DashboardController@balance')->name('dashboard.balance')->middleware('auth.per:0');
Route::post('/dashboard/newsletter', 'backend\DashboardController@newsletter')->name('dashboard.newsletter')->middleware('auth.per:0');
Route::post('/dashboard/charts', 'backend\DashboardController@historyChart')->name('dashboard.chart')->middleware('auth.per:0');
Route::post('/dashboard/periods', 'backend\DashboardController@periods')->name('dashboard.periods')->middleware('auth.per:0');

//USER ADMINISTRATION BACKEND

Route::get('/users', 'backend\ViewsController@users')->name('users')->middleware('auth.per:0100');
Route::post('/users', 'backend\UserController@index')->name('users.list')->middleware('auth.per:0100');
Route::post('/users/create', 'backend\UserController@store')->name('users.create')->middleware('auth.per:0102');
Route::post('/users/update', 'backend\UserController@update')->name('users.update')->middleware('auth.per:0103');
Route::post('/users/delete', 'backend\UserController@destroy')->name('users.delete')->middleware('auth.per:0104');
Route::post('/users/roles', 'backend\UserController@userRoles')->name('users.roles')->middleware('auth.per:0102');
Route::post('/users/clients', 'backend\UserController@userClients')->name('users.clients')->middleware('auth.per:0102');
Route::post('/users/profile', 'backend\UserController@show')->name('users.show')->middleware('auth.per:0');
Route::post('/profile/upload/picture', 'backend\UserController@picture')->name('profile.upload')->middleware('auth.per:0');
Route::post('/users/profile/update', 'backend\UserController@updateProfile')->name('users.profileUpdate')->middleware('auth.per:0');

Route::get('/currencies', 'backend\ViewsController@currencies')->name('currencies')->middleware('auth.per:0250');
Route::post('/currencies', 'backend\CurrenciesController@index')->name('currencies.list')->middleware('auth.per:0251');
Route::post('/currencies/create', 'backend\CurrenciesController@store')->name('currencies.create')->middleware('auth.per:0252');
Route::post('/currencies/update', 'backend\CurrenciesController@update')->name('currencies.update')->middleware('auth.per:0253');
Route::post('/currencies/delete', 'backend\CurrenciesController@destroy')->name('currencies.delete')->middleware('auth.per:0254');

//FUNDS

Route::get('/funds', "backend\ViewsController@funds")->name('funds')->middleware('auth.per:0150');
Route::post('/funds/total', "backend\FundsController@total")->name('total.funds')->middleware('auth.per:0151');
Route::post('/funds/currency', "backend\FundsController@indexCurrency")->name('currency.funds')->middleware('auth.per:0151');
Route::post('/funds/periods', "backend\FundsController@periods")->name('periods.funds')->middleware('auth.per:0152');
Route::post('/funds/currencies', "backend\FundsController@currencies")->name('currencies.funds')->middleware('auth.per:0152');
Route::post('/funds/available', "backend\FundsController@available")->name('currencies.funds')->middleware('auth.per:0152');
Route::post('/funds/exchange', "backend\FundsController@exchange")->name('exchange.funds')->middleware('auth.per:0152');
Route::post('/funds/exchange/validate', "backend\FundsController@validateExchange")->name('exchange.funds')->middleware('auth.per:0153');
Route::post('/funds/transactions', "backend\FundsController@transactions")->name('trasactions.funds')->middleware('auth.per:0151');
Route::post('/funds/transactions/delete', "backend\FundsController@destroyOrder")->name('delete.funds')->middleware('auth.per:0154');
Route::post('/funds/transactions/pending', "backend\FundsController@pendingTransactions")->name('pending.funds')->middleware('auth.per:0151');

//Clients

Route::get('/clients', "backend\ViewsController@clients")->name('clients')->middleware('auth.per:0250');
Route::post('/periods', "backend\PeriodController@index")->name('clients.period')->middleware('auth.per:0251');
Route::post('/periods/create', "backend\PeriodController@create")->name('clients.period.create')->middleware('auth.per:0252');
Route::post('/periods/update', "backend\PeriodController@update")->name('clients.period.close')->middleware('auth.per:0253');
Route::post('/periods/delete', "backend\PeriodController@destroy")->name('clients.period.delete')->middleware('auth.per:0254');
Route::post('/clients/list', "backend\ClientsController@index")->name('clients.list')->middleware('auth.per:0251');
Route::post('/clients/total', "backend\ClientsController@total")->name('total.funds')->middleware('auth.per:0251');
Route::post('/clients/currency', "backend\ClientsController@indexCurrency")->name('currency.funds')->middleware('auth.per:0251');
Route::post('/clients/initials', "backend\ClientsController@initial")->name('crypto.funds')->middleware('auth.per:0252');

//NewsLetter
Route::get('/newsletter', "backend\ViewsController@newsletter")->name('newsletter')->middleware('auth.per:0350');
Route::post('/newsletter', 'backend\NewsletterController@index')->name('newsletter.list')->middleware('auth.per:0351');
Route::post('/newsletter/create', 'backend\NewsletterController@store')->name('newsletter.create')->middleware('auth.per:0352');
Route::post('/newsletter/update', 'backend\NewsletterController@update')->name('newsletter.update')->middleware('auth.per:0353');
Route::post('/newsletter/delete', 'backend\NewsletterController@destroy')->name('newsletter.delete')->middleware('auth.per:0354');
