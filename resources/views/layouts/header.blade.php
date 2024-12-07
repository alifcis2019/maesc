<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Global Font Awesome CDN V6.4.2  -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
    crossorigin="anonymous" />

<!-- aos animation -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

@if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
@vite(['resources/css/app.css', 'resources/js/app.js'])
@else
<link href="{{ mix('css/app.css') }}" rel="stylesheet">
@endif

<!-- Global main css file for ltr  -->
@if (App::getLocale() == 'en')
<link rel="stylesheet" href="{{ asset('endUserAssets/content/css/main-ltr.css') }}">
@else
<link rel="stylesheet" href="{{ asset('endUserAssets/content/css/main-rtl.css') }}">
@endif

@stack('css')