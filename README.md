<a href="https://packagist.org/packages/dalholm/laravel-vuetify-spa-admin"><img src="https://poser.pugx.org/dalholm/laravel-vuetify-spa-admin/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/dalholm/laravel-vuetify-spa-admin"><img src="https://poser.pugx.org/dalholm/laravel-vuetify-spa-admin/v/stable.svg" alt="Latest Stable Version"></a>

# LVA Laravel Vuetifyjs Admin SPA 

A simple lightweight admin template based on laravel and vuetifyjs. Simple and clean

## Screenshot
<p align="center">
<img src="https://imgur.com/18BoKaO.png">
</p>

## Features

- Laravel 7.x + Vue + Vue Router + Vuex
- Frontend built with [Buefy](https://buefy.org/) UI framework
- Pages with custom layouts 
- Examples for login, register and password reset
- Integration with [vform](https://github.com/cretueusebiu/vform)
- Authentication with [sanctum](https://laravel.com/docs/7.x/sanctum)
- Webpack with [laravel-mix](https://github.com/JeffreyWay/laravel-mix)

## Installation
- `git clone git@github.com:dalholm/laravel-vuetify-spa-admin.git`
- `cd laravel-vuetify-spa-admin`
- `cp .env.example .env`
- Edit `.env` and set your database connection details
- `composer install`
- `php artisan key:generate`
- `php artisan migrate`
- `npm install` / `yarn`

#### Composer
- `composer create-project dalholm/laravel-vuetify-spa-admin && cd laravel-vuetify-spa-admin`
- `npm install` / `yarn`

## Usage

#### Development

```bash
# build and watch
npm run watch

# serve with hot reloading
npm run hot
```

#### Production

```bash
npm run production
```

## Changelog
Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.
