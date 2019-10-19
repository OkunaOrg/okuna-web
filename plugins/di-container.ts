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
import { IHttpService } from '~/services/http/IHttp';
import { ILocalizationService } from '~/services/localization/ILocalization';
import { IStorageService } from '~/services/storage/IStorage';

export default function (ctx: any, inject: any) {
    container.register('UserService', {
        useClass: UserService
    }, {singleton: true});

    container.register('AuthApiService', {
        useClass: AuthApiService
    }, {singleton: true});

    container.register('EnvironmentService', {
        useClass: EnvironmentService
    }, {singleton: true});

    container.register('HttpService', {
        useClass: HttpService
    }, {singleton: true});

    container.register('LocalizationService', {
        useClass: LocalizationService
    }, {singleton: true});

    container.register('StorageService', {
        useClass: StorageService
    });

    container.register('StringTemplateService', {
        useClass: StringTemplateService
    }, {singleton: true});

    container.register('ToastService', {
        useClass: ToastService
    }, {singleton: true});

    container.register('UtilsService', {
        useClass: UtilsService
    }, {singleton: true});

    if (!ctx.$localForage) {
        console.error('Please make sure localForage module is added');
    } else {
        const storageService = container.resolve('StorageService') as IStorageService;
        console.log('Got storage service with id ', storageService.getIdentifier());
        console.log('Setting local storage');
        storageService.setLocalForage(ctx.$localForage);
    }

    if (!ctx.$axios) {
        console.error('Please make sure $axios module is added');
    } else {
        const apiService = container.resolve('HttpService') as IHttpService;
        apiService.setAxiosClient(ctx.$axios);
    }

    if (!ctx.app.i18n) {
        console.error('Please make sure vue i18n module is added');
    } else {
        const localizationService = container.resolve('LocalizationService') as ILocalizationService;
        localizationService.setVueTranslator(ctx.app.i18n);
    }
}