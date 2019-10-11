export default {
    mode: 'universal',
    env: {},
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
    build: {},
    buildModules: ['@nuxt/typescript-build'],
    modules: [
        '@nuxtjs/axios',
    ],
    axios: {},
    plugins: [
        '~/plugins/buefy',
        {src: '~/plugins/line-clamp', ssr: false},
        '~/plugins/directives',
        '~/plugins/vuelidate',
    ],
}
