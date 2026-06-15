import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    // Must run before @vitejs/plugin-react so it can generate the route tree.
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@/app':        path.resolve(__dirname, './src/app'),
      '@/pages':      path.resolve(__dirname, './src/pages'),
      '@/widgets':    path.resolve(__dirname, './src/widgets'),
      '@/shared':     path.resolve(__dirname, './src/shared'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib':        path.resolve(__dirname, './src/lib'),
    },
  },
});
