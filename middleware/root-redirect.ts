import { Middleware } from '@nuxt/types'

const rootRedirectMiddleware: Middleware = (context) => {
    if (context.route.path === '/') {
        context.redirect('/home');
    }
};

export default rootRedirectMiddleware;