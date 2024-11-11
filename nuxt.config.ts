import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  modules: [
      '@primevue/nuxt-module',
      '@nuxtjs/tailwindcss'
  ],

  primevue: {
      /* Configuration */
      options: {
        theme: {
            preset: Aura
        }
    }
  },

  css: [
   '@/assets/css/tailwind.css'
  ],

  compatibilityDate: '2024-11-03',
})