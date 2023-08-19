export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:4000',
    },
  },
  build: {
    transpile: ['vuetify'],
  },
})
