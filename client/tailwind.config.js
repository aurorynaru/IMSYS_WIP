/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
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
    plugins: []
}
