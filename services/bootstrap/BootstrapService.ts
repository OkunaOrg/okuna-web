import { injectable } from '~/node_modules/inversify';
import { IBootstrapService } from '~/services/bootstrap/IBootstrapService';
import { inject } from 'inversify';
import { TYPES } from '../inversify-types';
import { IThemeService } from '../theme/IThemeService';
import { IUserPreferencesService } from '~/services/user-preferences/IUserPreferencesService';
import { IEnvironmentService } from '~/services/environment/IEnvironmentService';
import { INotificationsService } from '~/services/notifications/INotificationsService';

@injectable()
export class BootstrapService implements IBootstrapService {
    constructor(@inject(TYPES.ThemeService) private themeService?: IThemeService,
                @inject(TYPES.EnvironmentService) private environmentService?: IEnvironmentService,
                @inject(TYPES.NotificationsService) private notificationsService?: INotificationsService,
                @inject(TYPES.UserPreferencesService) private userPreferencesService?: IUserPreferencesService,
    ) {
    }

    bootstrap(): void {
        this.themeService!.bootstrapTheme();
        this.notificationsService.bootstrap();
    }

}

