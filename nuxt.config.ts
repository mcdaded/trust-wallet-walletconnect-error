// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {},
  routeRules: {
    "/*": { ssr: false, cors: true },
  },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
    },
  },
  css: ["~/assets/css/main.css"],
});
