import { Middleware } from '@nuxt/types'

const rootRedirectMiddleware: Middleware = (context) => {
    if(context.route.name === 'auth'){
        context.redirect(`/a/login`);
    }
};

export default rootRedirectMiddleware;