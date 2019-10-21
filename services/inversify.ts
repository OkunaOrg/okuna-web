import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from '~/services/inversify-types';
import { IUserService } from '~/services/user/IUser';
import { UserService } from '~/services/user/User';
import { IAuthApiService } from '~/services/Apis/auth/IAuth';
import { AuthApiService } from '~/services/Apis/auth/Auth';
import { IHttpService } from '~/services/http/IHttp';
import { HttpService } from '~/services/http/Http';
import { ILocalizationService } from '~/services/localization/ILocalization';
import { LocalizationService } from '~/services/localization/Localization';
import { IStringTemplateService } from '~/services/string-template/IStringTemplate';
import { StringTemplateService } from '~/services/string-template/StringTemplate';
import { IToastService } from '~/services/toast/IToast';
import { ToastService } from '~/services/toast/Toast';
import { IUtilsService } from '~/services/utils-service/IUtilsService';
import { UtilsService } from '~/services/utils-service/UtilsService';
import { IStorageService } from '~/services/storage/IStorage';
import { StorageService } from '~/services/storage/Storage';
import { IEnvironmentService } from '~/services/environment/IEnvironment';
import { EnvironmentService } from '~/services/environment/Environment';
import { ILoggingService } from '~/services/logging/ILogging';
import { LoggingService } from '~/services/logging/Logging';
import { IThemeService } from '~/services/theme-service/IThemeService';
import { ThemeService } from '~/services/theme-service/ThemeService';

const okunaContainer = new Container();


okunaContainer.bind<IAuthApiService>(TYPES.AuthApiService).to(AuthApiService).inSingletonScope();
okunaContainer.bind<IHttpService>(TYPES.HttpService).to(HttpService).inSingletonScope();
okunaContainer.bind<ILocalizationService>(TYPES.LocalizationService).to(LocalizationService).inSingletonScope();
okunaContainer.bind<IStringTemplateService>(TYPES.StringTemplateService).to(StringTemplateService).inSingletonScope();
okunaContainer.bind<IToastService>(TYPES.ToastService).to(ToastService).inSingletonScope();
okunaContainer.bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
okunaContainer.bind<IUtilsService>(TYPES.UtilsService).to(UtilsService).inSingletonScope();
okunaContainer.bind<IStorageService>(TYPES.StorageService).to(StorageService).inSingletonScope();
okunaContainer.bind<IEnvironmentService>(TYPES.EnvironmentService).to(EnvironmentService).inSingletonScope();
okunaContainer.bind<ILoggingService>(TYPES.LoggingService).to(LoggingService).inSingletonScope();
okunaContainer.bind<IThemeService>(TYPES.ThemeService).to(ThemeService).inSingletonScope();

export { okunaContainer };