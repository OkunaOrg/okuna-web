import { NavigationGuard } from 'vue-router';
import { okunaContainer } from '~/services/inversify';
import { TYPES } from '~/services/inversify-types';
import { IUserService } from '~/services/user/IUser';

const isAuthenticatedGuard: NavigationGuard = (to, from, next) => {
    const userService = okunaContainer.get<IUserService>(TYPES.UserService);

    if(userService.isLoggedIn()){
        next();
    }


};

export default isAuthenticatedGuard;