import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://pages.dev', // <-- Cambiá esto por la URL real de tu blog
  integrations: [
    react(),
    mdx(),
    sitemap(),
    ...(isDev ? [keystatic()] : []),
  ],
  vite: {
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client'],
    },
  },
});
