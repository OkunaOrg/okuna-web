import '@abraham/reflection';
import { container } from '~/node_modules/tsyringe';
import { ApiService } from '~/services/Api';
import { LocalizationService } from '~/services/Localization';


export default function (ctx: any, inject: any) {
    if (!ctx.$axios) {
        console.error('Please make sure $axios module is added');
    } else {
        const apiService = container.resolve(ApiService);
        apiService.setAxiosClient(ctx.$axios);
    }

    if (!ctx.$t) {
        console.error('Please make sure vue i18n module is added');
    } else {
        const localizationService = container.resolve(LocalizationService);
        localizationService.setVueTranslator(ctx.$t);
    }
}