import constitutionOverview from './data/constitution-overview';
import { getTopicsByCategoryId } from './utils/strapi';
import { server } from './mocks/server';

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'elect-constitution',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/fonts/typography.css', '~/assets/style.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/msw.server.ts'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@aceforth/nuxt-optimized-images',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: `${process.env.BASE_PATH || ''}/_nuxt/`,
  },

  env: {
    STRAPI_ENDPOINT: process.env.STRAPI_ENDPOINT,
  },

  router: {
    base: process.env.BASE_PATH || '/',
  },

  optimizedImages: {
    optimizeImages: true,
  },

  generate: {
    async routes() {
      if (!process.env.STRAPI_ENDPOINT) {
        server.listen();
      }

      const routes = await Promise.all(
        constitutionOverview.categories
          .map(async (category) => {
            const categoryPage = {
              route: `/category/${category.id}`,
            };

            const topics = await getTopicsByCategoryId(category.id);

            const topicPages = topics.map((topic) => ({
              route: `/topic/${topic.id}`,
            }));

            return [categoryPage, ...topicPages];
          })
          .flat()
      );

      if (!process.env.STRAPI_ENDPOINT) {
        server.close();
      }

      return routes;
    },
  },
};
