const result = require('dotenv').config();

export default {
    mode: 'spa',
    env: result.parsed,
    head: {
        title: 'okuna-web',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
            {hid: 'description', name: 'description', content: 'The Okuna social network web version'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
    },
    loading: {color: '#000000'},
    css: [
        '~/assets/styles/index.scss'
    ],
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/router',
    ],
    modules: [
        '@nuxtjs/sentry',
        '@nuxtjs/axios',
        'localforage-nuxt',
        'nuxt-i18n',
        '@nuxtjs/style-resources',
    ],
    sentry: {
        dsn: process.env.SENTRY_DSN,
    },
    axios: {
        proxy: true
    },
    plugins: [
        '~/plugins/buefy',
        {src: '~/plugins/line-clamp', ssr: false},
        '~/plugins/directives',
        '~/plugins/vuelidate',
        '~/plugins/di-vue',
        '~/plugins/material-design-icons',
        '~/plugins/vue-infinite-loading',
        '~/plugins/vue-scroll',
        '~/plugins/vue-scroll-to',
        '~/plugins/vue-sticky',
        '~/plugins/scroll-behavior',
        '~/plugins/vue-moment',
        '~/plugins/vue-progressive-image',
        '~/plugins/vue-video-player',
        '~/plugins/vue-highlight',
        '~/plugins/vue-tooltip',
        '~/plugins/vue-rx',
        '~/plugins/vue-not-visible',
    ],
    router: {
        middleware: ['post-redirect'],
        //mode: 'hash'
    },
    i18n: {
        baseUrl: 'https://okuna.io',

        lazy: true,

        langDir: 'static/i18n/',

        locales: [
            {
                code: 'en',
                iso: 'en-US',
                file: 'en.js',
                name: 'English'
            },
            {
                code: 'es',
                iso: 'es-ES',
                file: 'es.js',
                name: 'Spanish'
            },
        ],

        // The app's default locale, URLs for this locale won't have a prefix if
        // strategy is prefix_except_default
        defaultLocale: 'en',

        strategy: 'no_prefix',
        // Enable browser language detection to automatically redirect user
        // to their preferred language as they visit your app for the first time
        detectBrowserLanguage: {
            // If enabled, a cookie is set once a user has been redirected to his
            // preferred language to prevent subsequent redirections
            // Set to false to redirect every time
            useCookie: true,
            // Cookie name
            cookieKey: 'i18n',
            // Set to always redirect to value stored in the cookie, not just once
            alwaysRedirect: false,
            // If no locale for the browsers locale is a match, use this one as a fallback
            fallbackLocale: 'en'
        },

        // We followed steps of https://nuxt-community.github.io/nuxt-i18n/seo.html#improving-performance
        seo: false,
    },
    proxy: {
        '/local/': {target: 'https://api.openbook.social', pathRewrite: {'^/local/': ''}},
    },
    styleResources: {
        scss: [
            'assets/styles/helpers/index.scss',
        ]
    },
    render: {
        bundleRenderer: {
            runInNewContext: false
        }
    },
    build: {
        devtools: true,
        extend(config, {isDev, isClient}) {
            config.node = {
                fs: 'empty'
            }
        }
    },
    generate: {
        routes: [
            '/'
        ]
    }
}
