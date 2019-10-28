import { LoginData, RegistrationData, RequestResetPasswordData, ResetPasswordData } from '~/services/Apis/auth/types';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { IUser } from '~/models/auth/user/IUser';


export interface IUserService {
    loggedInUser: BehaviorSubject<IUser | undefined>;

    login(data: LoginData): Promise<void>;

    register(data: RegistrationData): Promise<void>;

    requestResetPassword(data: RequestResetPasswordData): Promise<void>;

    resetPassword(data: ResetPasswordData): Promise<void>;

    logout(): Promise<void>;

    hasStoredAuthToken(): Promise<boolean>;

    getStoredAuthToken(): Promise<string>;

    loginWithAuthToken(token: string): Promise<void>;

    loginWithStoredAuthToken(): Promise<void>;

    refreshLoggedInUser(): Promise<void>;

    isLoggedIn(): boolean;
}