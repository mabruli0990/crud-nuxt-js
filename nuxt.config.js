const pkg = require('./package')


module.exports = {
  mode: 'universal',

  router: {
    base: '/crud-nuxt-js/'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  server : {
    port : 8000,
    host : 'localhost'
  },

  /*
  ** Global CSS
  */
  css: [
  ],

  


  /*
  ** Plugins to load before mounting the App
  */
  // plugins: [
  // {src: '@/plugins/axios.js', ssr: false}
  // ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    vendor : ['axios'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
