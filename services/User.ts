import { action, observable } from 'mobx';
import IUser from '~/types/User';
import { autoInjectable, singleton } from '~/node_modules/tsyringe';
import { ApiClientService } from '~/services/ApiClient';
import { BehaviorSubject, Subject } from '~/node_modules/rxjs';
import { User } from '~/models/auth/User';

@singleton()
@autoInjectable()
export class UserService {
    static AUTH_TOKEN_STORAGE_KEY = 'auth';
    private tokenStorage: OkunaStorage<string>;

    private loggedInUser = new BehaviorSubject<IUser | undefined>(undefined);

    constructor(private apiService?: ApiClientService, storageService?: StorageService) {
        this.tokenStorage = storageService!.getLocalForageStorage('userTokenStorage');
    }

    setLoggedInUser(user: IUser): void {
        this.loggedInUser.next(user);
    }

    loginWithCredentials(credentials: {username: string, password: string}) {

    }

    async logout() {
        await this.tokenStorage.remove(UserService.AUTH_TOKEN_STORAGE_KEY);
    }

    hasStoredAuthToken() {
        return this.tokenStorage.has(UserService.AUTH_TOKEN_STORAGE_KEY);
    }

    getStoredAuthToken(){
        return this.tokenStorage.get(UserService.AUTH_TOKEN_STORAGE_KEY);
    }

    async loginWithStoredAuthToken() {
        const authToken = await this.getStoredAuthToken();

    }
}