import '@abraham/reflection';
import { container } from '~/node_modules/tsyringe';
import { HttpService } from '~/services/http/Http';
import { LocalizationService } from '~/services/localization/Localization';
import { StorageService } from '~/services/storage/Storage';
import { UserService } from '~/services/user/User';
import { AuthApiService } from '~/services/Apis/auth/Auth';
import { EnvironmentService } from '~/services/environment/Environment';
import { StringTemplateService } from '~/services/string-template/StringTemplate';
import { ToastService } from '~/services/toast/Toast';
import { UtilsService } from '~/services/utils-service/UtilsService';

container.register('UserService', {
    useClass: UserService
});

container.register('AuthApiService', {
    useClass: AuthApiService
});

container.register('EnvironmentService', {
    useClass: EnvironmentService
});

container.register('HttpService', {
    useClass: HttpService
});

container.register('LocalizationService', {
    useClass: LocalizationService
});

container.register('StorageService', {
    useClass: StorageService
});

container.register('StringTemplateService', {
    useClass: StringTemplateService
});

container.register('ToastService', {
    useClass: ToastService
});

container.register('UtilsService', {
    useClass: UtilsService
});


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