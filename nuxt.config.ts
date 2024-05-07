// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@vueuse/nuxt", "@nuxt/image", "nuxt-icons"],
  srcDir: "src",
  // alias: {
  //   "@": "/<srcDir>",
  //   "~": "/<srcDir>",
  //   "@assets": "/<srcDir>/assets",
  //   "@components": "/<srcDir>/components",
  //   "@utils": "/<srcDir>/utils",
  //   "@types": "/<srcDir>/types",
  // },
  // typescript: {
  //   tsConfig: {
  //     compilerOptions: {
  //       paths: {
  //         "@": ["./src"],
  //         "@/*": ["./src/*"],
  //       },
  //     },
  //   },
  // },
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