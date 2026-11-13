import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset paths, so the build works both at username.github.io
  // and at a project URL like username.github.io/portfolio/
  base: './',
});
