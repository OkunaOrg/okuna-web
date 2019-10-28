import { AxiosResponse } from '~/node_modules/axios';
import { UserData } from '~/types/models-data/auth/UserData';
import { LoginData, LoginResponse, RegistrationData, RegisterResponse } from '~/services/Apis/auth/types';

export interface IAuthApiService {

    login(data: LoginData): Promise<AxiosResponse<LoginResponse>>;

    register(data: RegistrationData): Promise<AxiosResponse<RegisterResponse>>;

    getAuthenticatedUser(): Promise<AxiosResponse<UserData>>;
}
