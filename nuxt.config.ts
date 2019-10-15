const envVars = require('./env.json');

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
    buildModules: ['@nuxt/typescript-build', '@nuxtjs/router-extras'],
    modules: [
        '@nuxtjs/axios',
    ],
    axios: {},
    plugins: [
        '~/plugins/bootstrap-services',
        '~/plugins/buefy',
        {src: '~/plugins/line-clamp', ssr: false},
        '~/plugins/directives',
        '~/plugins/vuelidate',
    ],
    router: {
        middleware: ['post-redirect'],
        //mode: 'hash'
    }
}
