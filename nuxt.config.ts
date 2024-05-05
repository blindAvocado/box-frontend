// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@vueuse/nuxt', '@nuxt/image', 'nuxt-icons'],
  alias: {
    '@': '../',
    '@components': '../components',
    '@common': '../components/common',
    '@types': '../types',
  },
  css: ['@/assets/global.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '/assets/styles/index.scss';`,
        }
      }
    }
  }
});
