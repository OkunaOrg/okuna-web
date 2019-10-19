import { AxiosResponse } from '~/node_modules/axios';
import { UserData } from '~/types/models-data/auth/UserData';
import { LoginData, LoginResponse, RegisterData, RegisterResponse } from '~/services/Apis/auth/types';

export interface IAuthApiService {

    login(data: LoginData): Promise<AxiosResponse<LoginResponse>>;

    register(data: RegisterData): Promise<AxiosResponse<RegisterResponse>>;

    getAuthenticatedUser(): Promise<AxiosResponse<UserData>>;
}
