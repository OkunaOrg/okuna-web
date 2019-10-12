import IUser from '~/types/User';
import { singleton } from '~/node_modules/tsyringe';

@singleton()
export class ApiService {
    async getUser(): Promise<IUser> {
        return Promise.resolve({
            id: 'asd'
        });
    }
}