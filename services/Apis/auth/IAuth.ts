import { AxiosResponse } from '~/node_modules/axios';
import { UserData } from '~/types/models-data/auth/UserData';
import {
    LoginParams,
    LoginResponse,
    RegistrationParams,
    RegistrationResponse,
    RequestResetPasswordParams, ResetPasswordParams
} from '~/services/Apis/auth/types';

export interface IAuthApiService {

    login(data: LoginParams): Promise<AxiosResponse<LoginResponse>>;

    register(data: RegistrationParams): Promise<AxiosResponse<RegistrationResponse>>;

    resetPassword(data: ResetPasswordParams): Promise<AxiosResponse<void>>;

    requestResetPassword(data: RequestResetPasswordParams): Promise<AxiosResponse<void>>;

    getAuthenticatedUser(): Promise<AxiosResponse<UserData>>;
}
