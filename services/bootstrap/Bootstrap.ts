import { injectable } from '~/node_modules/inversify';
import { IBootstrapService } from '~/services/bootstrap/IBootstrap';
import { inject } from 'inversify';
import { TYPES } from '../inversify-types';
import { IThemeService } from '../theme-service/IThemeService';

@injectable()
export class BootstrapService implements IBootstrapService {
    constructor(@inject(TYPES.ThemeService) private themeService?: IThemeService,
    ) {
    }

    bootstrap(): void {
        this.themeService!.bootstrapTheme();
    }

}

