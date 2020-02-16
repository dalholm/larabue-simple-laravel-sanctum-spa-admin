<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Larabue</title>

        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    </head>
    <body>
        <div id="app"></div>



        {{-- Global configuration object --}}
        @php
            $config = [
                'appName' => config('app.name'),
                'locale' => $locale = app()->getLocale(),
            ];
        @endphp
        <script>window.config = {!! json_encode($config); !!};</script>

        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
