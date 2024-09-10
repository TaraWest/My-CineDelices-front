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
            screens: {
                'bp-s': '480px',
                'bp-m': '768px',
                'bp-l': '1024px',
                'bp-desktop-s': '1224px',
                'bp-desktop-m': '1440px',
                'bp-desktop-l': '1600px',
            },
            spacing: {
                '0.5em': '0.5em',
                '1em': '1em',
                '1.2em': '1.2em',
                '1.5em': '1.5em',
                '2em': '2em',
                '2.5em': '2.5em',
                '3em': '3em',
                '4em': '4em',
                '5em': '5em',
                '90%': '90%',
            },
            fontFamily: {
                cinzel: ['Cinzel', 'serif'],
                body: ['Merriweather Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
