// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@vueuse/nuxt", "@nuxt/image", "nuxt-icons", '@pinia/nuxt',],
  srcDir: "src",
  css: ["/assets/global.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '/assets/styles/index.scss';`,
        },
      },
    },
  },
  image: {
    domains: ['image.tmdb.org']
  }
});