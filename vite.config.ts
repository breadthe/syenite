import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    plugins: [
        sveltekit(),

        // Copy assets (images) from src/article-vault/_assets to assets for the production build
        viteStaticCopy({
            targets: [
                {
                    src: 'src/article-vault/_assets/**/*',
                    dest: 'assets'
                }
            ]
        }),
    ],
    resolve: {
        alias: {
            $components: '/src/components',
            $css: '/src/css',
        },
    },
});
