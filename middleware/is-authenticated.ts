import { okunaContainer } from '~/services/inversify';
import { TYPES } from '~/services/inversify-types';
import { IUserService } from '~/services/user/IUser';
import { INavigationService } from '~/services/navigation-service/INavigationService';
import { Middleware } from '@nuxt/types'

const isAuthenticatedMiddleware: Middleware = (context) => {
    const userService = okunaContainer.get<IUserService>(TYPES.UserService);

    if (!userService.isLoggedIn()) {
        const navigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);
        navigationService.navigateToLogin({
            nuxtContext: context
        });
    }
};

export default isAuthenticatedMiddleware;