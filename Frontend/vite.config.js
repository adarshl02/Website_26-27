import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically update the service worker
      injectRegister: 'auto', // Automatically inject the service worker in the index.html
      manifest: {
        name: 'Pratibimb', // Replace with your app's name
        short_name: 'Pratibimb', // Replace with your app's short name
        description: 'Official WebApp of Pratibimb SGSITS', // Replace with a description of your app
        theme_color: '#000000', // Set the background color for the app
        background_color: '#000000', // Set the background color for the splash screen
        display: 'standalone', // Display type for PWA (standalone is common)
        start_url: '/', // The URL to start your PWA from
        icons: [
          {
            src: '/icons/logo_192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/logo_512.png', 
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
