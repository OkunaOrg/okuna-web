import { Middleware } from '@nuxt/types'

const rootRedirectMiddleware: Middleware = (context) => {
    if(context.route.name === 'post'){
        const postUuid = context.route.params['postUuid'];
        context.redirect(`/p/${postUuid}/c`);
    }
};

export default rootRedirectMiddleware;