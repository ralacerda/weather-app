// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [['@unocss/nuxt', { wind: true }], 'unplugin-icons/nuxt'],
  css: ['@/assets/reset.css'],
});
