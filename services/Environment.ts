import IUser from '~/types/UserData';
import { singleton } from '~/node_modules/tsyringe';

@singleton()
export class EnvironmentService {
    get apiUrl() {
        return process.env['API_URL'];
    }
}

