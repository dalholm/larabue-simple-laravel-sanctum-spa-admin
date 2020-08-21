<a href="https://packagist.org/packages/dalholm/larabue"><img src="https://poser.pugx.org/dalholm/larabue/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/dalholm/larabue"><img src="https://poser.pugx.org/dalholm/larabue/v/stable.svg" alt="Latest Stable Version"></a>

# Larabue Laravel vuejs buefy Admin SPA 

A simple lightweight admin template based on laravel, vuejs and buefy. Implemented with Sanctum and makes everything just simple and clean.

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
- `git clone git@github.com:dalholm/larabue-simple-laravel-sanctum-spa-admin.git`
- `cd laravel-vuetify-spa-admin`
- `cp .env.example .env`
- Edit `.env` and set your database connection details
- Edit `SANCTUM_STATEFUL_DOMAINS=` to your domain.com
- Edit `SESSION_DOMAIN` to your `.domain.com`
- `composer install`
- `php artisan key:generate`
- `php artisan migrate`
- `php artisan db:seed`
- `npm install` / `yarn`

### Composer
- `composer create-project dalholm/larabue && cd larabue`
- `npm install` / `yarn`

### Usage
- login: yourdomain.test/login
- Username: admin@admin.com
- Password: admin

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
