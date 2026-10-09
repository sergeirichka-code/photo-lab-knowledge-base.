import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/photo-lab-knowledge-base/',
  plugins: [tailwindcss()],
});
