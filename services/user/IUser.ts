import {
    LoginApiParams,
    RegistrationApiParams,
    RegistrationResponse,
    RequestResetPasswordApiParams,
    ResetPasswordApiParams
} from '~/services/Apis/auth/AuthApiServiceTypes';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { IUser } from '~/models/auth/user/IUser';


export interface IUserService {
    loggedInUser: BehaviorSubject<IUser | undefined>;

    login(data: LoginApiParams): Promise<IUser>;

    register(data: RegistrationApiParams): Promise<RegistrationResponse>;

    requestResetPassword(data: RequestResetPasswordApiParams): Promise<void>;

    resetPassword(data: ResetPasswordApiParams): Promise<void>;

    logout(): Promise<void>;

    hasStoredAuthToken(): Promise<boolean>;

    getStoredAuthToken(): Promise<string>;

    loginWithAuthToken(token: string): Promise<IUser>;

    loginWithStoredAuthToken(): Promise<IUser>;

    refreshLoggedInUser(): Promise<IUser>;

    bootstrapLoggedInUser(): Promise<IUser>;

    isLoggedIn(): boolean;
}