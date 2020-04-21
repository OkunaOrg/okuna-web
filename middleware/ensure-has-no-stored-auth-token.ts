import { okunaContainer } from '~/services/inversify';
import { TYPES } from '~/services/inversify-types';
import { IUserService } from '~/services/user/IUserService';
import { INavigationService } from '~/services/navigation/INavigationService';
import { Middleware } from '@nuxt/types'

/**
 * A middleware that ensures that the user has a no stored auth token, otherwise
 * sends it to the home page
 * @param context
 */
const ensureHasNoStoredAuthToken: Middleware = (context) => {
    const userService = okunaContainer.get<IUserService>(TYPES.UserService);
    return userService.hasStoredAuthToken().then(hasStoredAuthToken => {
        if (!hasStoredAuthToken) return;

        const navigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);
        return navigationService.navigateToHome({
            nuxtContext: context
        });
    });
};

export default ensureHasNoStoredAuthToken;