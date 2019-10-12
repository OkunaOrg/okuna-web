import IUser from '~/types/User';
import { singleton } from '~/node_modules/tsyringe';
import { EnvironmentService } from '~/services/EnvironmentService';

@singleton()
export class ApiService {
    constructor(private environmentService?: EnvironmentService) {
        console.log('UASDASDA');
        console.log('Got environment service', environmentService);
    }

    async getUser(): Promise<IUser> {
        return Promise.resolve({
            id: 'asd'
        });
    }
}