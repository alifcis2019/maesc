<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ app()->getLocale() == 'ar' ? 'rtl' : 'ltr' }}">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8" name="lang" content="{{App::getLocale()}}">
    @include('layouts.header')
    <title>@yield('title')</title>
</head>

<body>
    <!-- include navbar -->
    @include('layouts.navbar')

    <main class="bd-main order-1 mt-0" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="500">
        @yield('content')
    </main>

    <!-- start footer -->
    @include('layouts.footer')

    <!-- include blade scripts -->
    @include('layouts.footerjs')
</body>

</html>