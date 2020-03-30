import { injectable } from '~/node_modules/inversify';
import { IBootstrapService } from '~/services/bootstrap/IBootstrap';
import { inject } from 'inversify';
import { TYPES } from '../inversify-types';
import { IThemeService } from '../theme-service/IThemeService';
import { IUserPreferencesService } from '~/services/user-preferences-service/IUserPreferencesService';

@injectable()
export class BootstrapService implements IBootstrapService {
    constructor(@inject(TYPES.ThemeService) private themeService?: IThemeService,
                @inject(TYPES.UserPreferencesService) private userPreferencesService?: IUserPreferencesService,
    ) {
    }

    bootstrap(): void {
        this.themeService!.bootstrapTheme();
    }

}

