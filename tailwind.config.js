/** @type {import('tailwindcss').Config} */

export default {
    content: ['./src/**/*.{html,js,ts,jsx, tsx, css}', './index.html'],
    plugins: [
        require('daisyui'),
        require('tailwindcss-react-aria-components'),
    ],
};
