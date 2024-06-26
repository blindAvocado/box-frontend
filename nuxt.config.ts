import { join } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@vueuse/nuxt", "@nuxt/image", "nuxt-icons", '@pinia/nuxt', 'floating-vue/nuxt', '@nuxtjs/svg-sprite'],
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  svgSprite: {
    input: '~/src/assets/icons',
    output: '~/src/assets/gen',
  },
  alias: {
		'~/src/assets/gen': join(__dirname, 'src/assets/gen'),
	},
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
    domains: ['image.tmdb.org', '127.0.0.1:8000'],
    format: ["avif", "webp"],
  },
});