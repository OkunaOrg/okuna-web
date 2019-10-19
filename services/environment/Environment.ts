import { IEnvironmentService } from '~/services/environment/IEnvironment';
import { injectable } from '~/node_modules/inversify';

@injectable()
export class EnvironmentService implements IEnvironmentService {
    get apiUrl() {
        return process.env['API_URL'] as string;
    }
}

