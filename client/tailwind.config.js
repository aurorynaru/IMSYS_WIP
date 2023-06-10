/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    daisyui: {
        themes: [
            'light',
            'dark',
            'night',

            {
                themeA: {
                    primary: '#fdd85d',
                    secondary: '#fdc921',
                    accent: '#99d6ea',
                    neutral: '#6798c0',
                    'base-100': '#fffdf7',
                    info: '#fdd85d',
                    success: '#99d6ea',
                    warning: '#f87171',
                    error: '#e11d48'
                }
            }
        ]
    },
    theme: {
        extend: {
            colors: {
                black: '#021015',
                dark: '#00a7e1',
                body: '#fafafa',
                'blue-light': '#05B9F5',
                'white-blue': '#fafafa',
                grey: '#ececec',
                'dark-grey': 'ececec'
            }
        }
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')]
}
