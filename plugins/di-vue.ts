import { okunaContainer } from '~/services/inversify';
import { IStorageService } from '~/services/storage/IStorage';
import { TYPES } from '~/services/inversify-types';
import { IHttpService } from '~/services/http/IHttp';
import { ILocalizationService } from '~/services/localization/ILocalization';
import { IBootstrapService } from '~/services/bootstrap/IBootstrap';
import { INavigationService } from '~/services/navigation/INavigationService';

export default function (ctx: any, inject: any) {
    if (!ctx.$localForage) {
        console.error('Please make sure localForage module is added');
    } else {
        const storageService = okunaContainer.get<IStorageService>(TYPES.StorageService);
        storageService.setLocalForage(ctx.$localForage);
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