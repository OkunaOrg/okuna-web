const envVars = require('./.env');

export default {
    mode: 'spa',
    env: envVars,
    head: {
        title: 'okuna-web',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'The Okuna social network web version'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    loading: {color: '#000000'},
    css: [
        '~/assets/styles/index.scss'
    ],
    buildModules: [
        ['@nuxtjs/dotenv', {systemvars: true}],
        '@nuxt/typescript-build',
        '@nuxtjs/router-extras'
    ],
    modules: [
        '@nuxtjs/sentry',
        '@nuxtjs/axios',
        'localforage-nuxt',
        'nuxt-i18n',
    ],
    axios: {},
    plugins: [
        '~/plugins/buefy',
        {src: '~/plugins/line-clamp', ssr: false},
        '~/plugins/directives',
        '~/plugins/vuelidate',
        '~/plugins/di-vue',
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

        strategy: 'prefix_except_default',
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
    render: {
        bundleRenderer: {
            runInNewContext: false
        }
    }
}
