import { IEnvironmentService } from '~/services/environment/IEnvironment';

export class EnvironmentService implements IEnvironmentService {
    get apiUrl() {
        return process.env['API_URL'] as string;
    }
}

