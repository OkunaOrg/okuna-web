import { okunaContainer } from '~/services/inversify';
import { TYPES } from '~/services/inversify-types';
import { IUserService } from '~/services/user/IUser';
import { INavigationService } from '~/services/navigation-service/INavigationService';
import { Middleware } from '@nuxt/types'

/**
 * A middleware that ensures that the user has a no stored auth token, otherwise
 * sends it to the home page
 * @param context
 */
const ensureHasNoStoredAuthToken: Middleware = (context) => {
    const userService = okunaContainer.get<IUserService>(TYPES.UserService);

    if (userService.hasStoredAuthToken()) {
        const navigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);
        navigationService.navigateToHome({
            nuxtContext: context
        });
    }
};

export default ensureHasNoStoredAuthToken;