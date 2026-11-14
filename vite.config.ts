import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

/**
 * GitHub Pages answers addresses it has no file for, like /experience, with 404.html.
 * Making 404.html a copy of index.html loads the app there, and the router shows the right page.
 */
function githubPagesFallback(): Plugin {
  return {
    name: 'github-pages-fallback',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      if (index?.type === 'asset') {
        this.emitFile({ type: 'asset', fileName: '404.html', source: index.source });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), githubPagesFallback()],
  // The base path defaults to "/". The deploy workflow passes the Pages address with --base, e.g. /portfolio/
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
