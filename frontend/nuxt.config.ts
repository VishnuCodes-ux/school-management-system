
import { fileURLToPath } from 'node:url'
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt',],
  alias: {
    '@store': fileURLToPath(new URL('./store', import.meta.url)),
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:5000'
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
