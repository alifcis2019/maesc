import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
        './resources/css/**/*.css',
        "./node_modules/flowbite/**/*.js"
    ],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                primary: '#0067D1',
                secondary: '#01249F',
            },
            fontFamily: {
                tajawal: ['Tajawal', 'sans-serif'], // For Arabic
                inter: ['Inter', 'sans-serif'], // For English
            },
        },
    },
    plugins: [
        require('flowbite/plugin')({
            charts: true,
        }),
    ],
};
