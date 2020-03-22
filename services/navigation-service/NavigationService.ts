import { inject, injectable } from '~/node_modules/inversify';
import { INavigationService, NavigationConfig } from '~/services/navigation-service/INavigationService';
import VueRouter from 'vue-router';
import { TYPES } from '~/services/inversify-types';
import { ILoggingService } from '~/services/logging/ILogging';
import { IOkLogger } from '~/services/logging/types';
import { ILocalizationService } from '~/services/localization/ILocalization';

@injectable()
export class NavigationService implements INavigationService {

    private vueRouter!: VueRouter;
    private logger: IOkLogger;

    constructor(@inject(TYPES.LocalizationService) private localizationService?: ILocalizationService,
                @inject(TYPES.LoggingService)  loggingService?: ILoggingService
    ) {
        this.logger = loggingService!.getLogger({
            name: 'NavigationService'
        });
    }


    setVueRouter(vueRouter: VueRouter) {
        this.vueRouter = vueRouter;
    }

    async navigateToLogin(config: NavigationConfig = {}): Promise<void> {
        this.navigateToLocationWithConfig('/a/login', config);
    }

    async navigateToRegister(config: NavigationConfig = {}): Promise<void> {
        this.navigateToLocationWithConfig('/a/register', config);
    }

    async navigateToHome(config?: NavigationConfig): Promise<void> {
        this.navigateToLocationWithConfig('/', config);
    }

    private navigateToLocationWithConfig(location: string, config: NavigationConfig) {
        this.logger.info(`Navigating to ${location} with config:`, config);
        config.nuxtContext ? config.nuxtContext.redirect(location) : this.vueRouter.push(location);
    }



}
