import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - cansho',
    title: 'cansho',
    htmlAttrs: {
      lang: 'ja'
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],
  
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],
  
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  
  ssr: true,

  axios: {
    prefix: '/api/',
    https: process.env.AXIOS_HTTPS,
    proxy: true,
    credentials: true,
  },
  proxy: {
    '/laravel': {
      target: process.env.NODE_URL,
      pathRewrite: { '^/laravel': '/' }
    },
    '/api/': { 
      target: process.env.SERVER_ORIGIN, 
      pathRewrite: {'^/api/': '/'} 
    }
  },
  publicRuntimeConfig: {
    AUTH_SCHEME: process.env.AUTH_SCHEME
  },

  auth: {
    redirect: {
      home: '/',
      login: '/auth/login',
      logout: '/',
      callback: false,
    },
    strategies: {
      local: {
        token: {
          required: false,
          type: false
        },
        endpoints: {
          login: { url: `/login`, method: 'post' },
          logout: false,
          user: false
        }
      },
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.SERVER_ORIGIN,
        cookie: {
          name: 'XSRF-TOKEN',
        },
        endpoints: {
          csrf: {
            url: '/sanctum/csrf-cookie'
          },
          login: { url: '/login', method: 'post' },
          logout: false,
        }
      }
    },
    router: {
      middleware: ['auth'],
    },
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-webfontloader'
  ],

  // GoogleFont読み込み
  webfontloader: {
    google: {
      families: ['Oswald:400'] 
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: true,
      options: {
        customProperties: true
      },
      themes: {
        dark: {
          main: '#6D7BAA'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
