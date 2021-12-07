export default {
  head: {
    title: 'Poker Planning',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: ['assets/styles/main.scss'],

  styleResources: {
    scss: [
      '~assets/styles/vars/colors.scss',
      '~assets/styles/vars/animations.scss',
    ]
  },

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxtjs/style-resources',
  ],

  modules: [
    'bootstrap-vue/nuxt',
  ],

  build: {
  }
}
