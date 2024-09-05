/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'light-red': '#8c0b23',
                'dark-red': '#59041b',
                gold: '#bb7133',
                skin: '#d9c7b8',
                'light-grey': '#f2f2f2',
                dark: '#0d0d0d',
                'visited-link': '#e38b44',
            },
            breakpoints: {
                'breakpoint-s': '480px',
                'breakpoint-m': '768px',
                'breakpoint-l': '1024px',
                'breakpoint-desktop-s': '1224px',
                'breakpoint-desktop-m': '1440px',
                'breakpoint-desktop-l': '1600px',
                'custom-dark-red': '#59041b',
                'custom-beige': '#D9C7B8',
            },
        },
    },
    plugins: [],
};
