/** @type {import('tailwindcss').Config} */

export default {
    content: ['./src/**/*.{html,js,ts,jsx, tsx, css}', './index.html'],
    plugins: [
        // require('@tailwindcss/typography'), // needed for prose classes
        require('daisyui'),
        require('tailwindcss-react-aria-components'),
        require('@tailwindcss/line-clamp'),
    ],
};
