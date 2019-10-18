import { BehaviorSubject } from '~/node_modules/rxjs';
import { AuthApiService, LoginData } from 'services/Apis/auth/Auth';
import { User } from 'models/auth/User';

export interface IUserService {
    loginWithCredentials(data: LoginData): Promise<void>;

    logout(): Promise<void>;

    hasStoredAuthToken(): Promise<boolean>;

    getStoredAuthToken(): Promise<string>;

    loginWithAuthToken(token: string): Promise<void>;

    loginWithStoredAuthToken(): Promise<void>;

    refreshLoggedInUser(): Promise<void>;
}