import { BehaviorSubject } from '~/node_modules/rxjs';
import { IAuthApiService } from '~/services/Apis/auth/IAuth';
import { IUserService } from '~/services/user/IUser';
import { LoginData } from '~/services/Apis/auth/types';
import { IUser } from '~/models/auth/user/IUser';
import userFactory from '~/models/auth/user/factory';
import { IHttpService } from '~/services/http/IHttp';
import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';
import { IStorageService } from '~/services/storage/IStorage';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { ILoggingService } from '~/services/logging/ILogging';
import { IOkLogger } from '~/services/logging/types';

@injectable()
export class UserService implements IUserService {
    static AUTH_TOKEN_STORAGE_KEY = 'auth';
    private tokenStorage: IOkStorage<string>;
    private logger: IOkLogger;

    private loggedInUser = new BehaviorSubject<IUser | undefined>(undefined);

    constructor(@inject(TYPES.AuthApiService) private authApiService?: IAuthApiService,
                @inject(TYPES.HttpService) private httpService?: IHttpService,
                @inject(TYPES.StorageService)  storageService?: IStorageService,
                @inject(TYPES.LoggingService)  loggingService?: ILoggingService
    ) {
        this.tokenStorage = storageService!.getLocalForageStorage('userTokenStorage');
        this.logger = loggingService!.getLogger({
            name: 'UserService'
        });
    }

    async loginWithCredentials(data: LoginData): Promise<void> {
        const response = await this.authApiService!.login(data);
        await this.loginWithAuthToken(response.data.token);
    }

    async logout() {
        this.httpService!.clearAuthToken();
        await this.tokenStorage.remove(UserService.AUTH_TOKEN_STORAGE_KEY);
    }

    hasStoredAuthToken() {
        return this.tokenStorage.has(UserService.AUTH_TOKEN_STORAGE_KEY);
    }

    getStoredAuthToken() {
        return this.tokenStorage.get(UserService.AUTH_TOKEN_STORAGE_KEY);
    }

    async loginWithAuthToken(token: string) {
        await this.storeAuthToken(token);
        await this.loginWithStoredAuthToken();
    }

    async loginWithStoredAuthToken() {
        const authToken = await this.getStoredAuthToken();
        this.httpService!.setAuthToken(authToken);
        await this.refreshLoggedInUser();
    }

    async refreshLoggedInUser() {
        const response = await this.authApiService!.getAuthenticatedUser();
        this.setLoggedInUser(userFactory.make(response.data, {
            // This cache stays for as long as the user session is active
            storeInSessionCache: true
        }));
    }

    private setLoggedInUser(user: IUser): void {
        this.loggedInUser.next(user);
    }

    private storeAuthToken(token: string) {
        return this.tokenStorage.set(UserService.AUTH_TOKEN_STORAGE_KEY, token);
    }

    isLoggedIn(): boolean {
        return !!this.loggedInUser;
    }
}