import { IEnvironmentService } from '~/services/environment/IEnvironment';
import { injectable } from '~/node_modules/inversify';
import { Environment } from '~/services/environment/lib/Environment';

@injectable()
export class EnvironmentService implements IEnvironmentService {
    get apiUrl() {
        return process.env['API_URL'] as string;
    }

    get logging(): boolean {
        return (process.env.LOGGING as unknown) as boolean;
    }


    get environment(): Environment {
        return Environment.parse(process.env.ENVIRONMENT as string) as Environment;
    }

    get sentryDsn(): string {
        return process.env.SENTRY_DSN as string;
    }


}

