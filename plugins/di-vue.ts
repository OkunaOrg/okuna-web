import { okunaContainer } from '~/services/inversify';
import { IStorageService } from '~/services/storage/IStorageService';
import { TYPES } from '~/services/inversify-types';
import { IHttpService } from '~/services/http/IHttpService';
import { ILocalizationService } from '~/services/localization/ILocalizationService';
import { IBootstrapService } from '~/services/bootstrap/IBootstrapService';
import { INavigationService } from '~/services/navigation/INavigationService';

export default async function (ctx: any, inject: any) {
    if (!ctx.$localForage) {
        console.error('Please make sure localForage module is added');
    } else {
        const storageService = okunaContainer.get<IStorageService>(TYPES.StorageService);

        try {
            storageService.setStorage(ctx.$localForage);

            // cheap way to test if IndexedDB can be used
            await storageService.getStorage('initialtest').set('localforagetest', true);
            await storageService.getStorage('initialtest').clear();
        } catch (_) {
            // localForage/IDB can't be used, we are probably in private mode
            // fallback to localStorage
            storageService.setStorage(window.localStorage);
        }
    }

    if (!ctx.$axios) {
        console.error('Please make sure $axios module is added');
    } else {
        const httpService = okunaContainer.get<IHttpService>(TYPES.HttpService);
        httpService.setAxiosClient(ctx.$axios);
    }

    if (!ctx.app.i18n) {
        console.error('Please make sure vue i18n module is added');
    } else {
        const localizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);
        localizationService.setVueTranslator(ctx.app.i18n);
    }

    if (!ctx.app.router) {
        console.error('Please make sure vue-router module is added');
    } else {
        const navigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);
        navigationService.setVueRouter(ctx.app.router);
    }

    const bootstrapService = okunaContainer.get<IBootstrapService>(TYPES.BootstrapService);
    bootstrapService.bootstrap();
}
