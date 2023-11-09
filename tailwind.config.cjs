/** @type {import('tailwindcss').Config}*/
const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            colors: {
                "mastodon-purple": "#595aff",
            }
        }
    },

    plugins: []
};

module.exports = config;
