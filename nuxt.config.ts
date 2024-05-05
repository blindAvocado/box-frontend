// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxt/image"],
  alias: {
    "@": '../',
    "@components": "../components",
    "@common": "../components/common",
  }
});
