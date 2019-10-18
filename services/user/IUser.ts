import { LoginData } from '~/services/Apis/auth/types';


export interface IUserService {
    loginWithCredentials(data: LoginData): Promise<void>;

    logout(): Promise<void>;

    hasStoredAuthToken(): Promise<boolean>;

    getStoredAuthToken(): Promise<string>;

    loginWithAuthToken(token: string): Promise<void>;

    loginWithStoredAuthToken(): Promise<void>;

    refreshLoggedInUser(): Promise<void>;
}