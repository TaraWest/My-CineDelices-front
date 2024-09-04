/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'custom-dark-red': '#59041b',
                'custom-beige': '#D9C7B8',
            },
        },
    },
    plugins: [],
};
