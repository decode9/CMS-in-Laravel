let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .styles('resources/assets/css/mainBack.css', 'public/css/mainBack.css')
   .styles('resources/assets/css/mainFront.css', 'public/css/mainFront.css')
   .js('resources/assets/js/mainFront.js', 'public/js/mainFront.js')
   .js('resources/assets/js/mainbackEnd.js', 'public/js/mainbackEnd.js');
