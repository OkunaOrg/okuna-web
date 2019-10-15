import '@abraham/reflection';
import { container } from '~/node_modules/tsyringe';
import { HttpService } from '~/services/Http';
import { LocalizationService } from '~/services/Localization';


export default function (ctx: any, inject: any) {
    if (!ctx.$axios) {
        console.error('Please make sure $axios module is added');
    } else {
        const apiService = container.resolve(HttpService);
        apiService.setAxiosClient(ctx.$axios);
    }

    if (!ctx.$i18n) {
        console.error('Please make sure vue i18n module is added');
    } else {
        const localizationService = container.resolve(LocalizationService);
        localizationService.setVueTranslator(ctx.$i18n);
    }

    if (!ctx.$localForage) {
        console.error('Please make sure localForage module is added');
    } else {
        const storageService = container.resolve(StorageService);
        storageService.setLocalForage(ctx.$localForage);
    }
}