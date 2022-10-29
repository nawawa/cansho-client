import colors from 'vuetify/es5/util/colors'

const siteColor = `#5B6BA2`

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
      { name: 'format-detection', content: 'telephone=no' },
      { name: "theme-color", content: siteColor }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/scss/common.scss' },
    { src: '~/assets/scss/post.scss' },
  ],
  
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/sanitize-html'
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
    '/api/login': { 
      target: process.env.SERVER_ORIGIN, 
      pathRewrite: {'^/api/': '/'} 
    },
    '/api/': { 
      target: process.env.SERVER_ORIGIN, 
    },
  },
  publicRuntimeConfig: {
    AUTH_SCHEME: process.env.AUTH_SCHEME
  },

  auth: {
    redirect: {
      home: '/',
      login: '/login',
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
  },
  router: {
    middleware: ['auth'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-webfontloader',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'sanitize-html'
  ],

  // GoogleFont読み込み
  webfontloader: {
    google: {
      families: ['Oswald:400', 'Noto Sans JP:300'] 
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
          main: siteColor
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
