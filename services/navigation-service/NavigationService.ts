import { injectable } from '~/node_modules/inversify';
import { INavigationService } from '~/services/navigation-service/INavigationService';

@injectable()
export class NavigationService implements INavigationService {
    constructor() {

    }

    navigateToLogin(): Promise<void> {
        return Promise.resolve();
    }

    navigateToRegister(): Promise<void> {
        return Promise.resolve();
    }

}
