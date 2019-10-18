import { singleton } from '~/node_modules/tsyringe';
import { IEnvironmentService } from '~/services/environment/IEnvironment';

@singleton()
export class EnvironmentService implements IEnvironmentService {
    get apiUrl() {
        return process.env['API_URL'] as string;
    }
}

