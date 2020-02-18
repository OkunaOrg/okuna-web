import {
    LoginParams,
    RegistrationParams,
    RegistrationResponse,
    RequestResetPasswordParams,
    ResetPasswordParams
} from '~/services/Apis/auth/AuthApiServiceTypes';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { IUser } from '~/models/auth/user/IUser';


export interface IUserService {
    loggedInUser: BehaviorSubject<IUser | undefined>;

    login(data: LoginParams): Promise<IUser>;

    register(data: RegistrationParams): Promise<RegistrationResponse>;

    requestResetPassword(data: RequestResetPasswordParams): Promise<void>;

    resetPassword(data: ResetPasswordParams): Promise<void>;

    logout(): Promise<void>;

    hasStoredAuthToken(): Promise<boolean>;

    getStoredAuthToken(): Promise<string>;

    loginWithAuthToken(token: string): Promise<IUser>;

    loginWithStoredAuthToken(): Promise<IUser>;

    refreshLoggedInUser(): Promise<IUser>;

    bootstrapLoggedInUser(): Promise<IUser>;

    isLoggedIn(): boolean;
}