/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    daisyui: {
        themes: [
            {
                light: {
                    primary: '#111827',
                    secondary: '#d1d5db',
                    accent: '#8000b6',
                    neutral: '#EFF309',
                    'base-100': '#f3f4f6',
                    info: '#fdd85d',
                    success: '#22c55e',
                    warning: '#f87171',
                    error: '#e11d48'
                }
            },
            {
                dark: {
                    primary: '#f3f4f6',
                    secondary: '#4b5563',
                    accent: '#EFF309',
                    neutral: '#8000b6',
                    'base-100': '#111827',
                    info: '#fdd85d',
                    success: '#22c55e',
                    warning: '#f87171',
                    error: '#e11d48'
                }
            },

            {
                themeA: {
                    primary: '#fdd85d',
                    secondary: '#99d6ea',
                    accent: '#FFE695',
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
