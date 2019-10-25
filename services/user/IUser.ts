import { LoginData } from '~/services/Apis/auth/types';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { IUser } from '~/models/auth/user/IUser';


export interface IUserService {
    loggedInUser: BehaviorSubject<IUser | undefined>;

    loginWithCredentials(data: LoginData): Promise<void>;

    logout(): Promise<void>;

    hasStoredAuthToken(): Promise<boolean>;

    getStoredAuthToken(): Promise<string>;

    loginWithAuthToken(token: string): Promise<void>;

    loginWithStoredAuthToken(): Promise<void>;

    refreshLoggedInUser(): Promise<void>;

    isLoggedIn(): boolean;
}