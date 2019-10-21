import { Environment } from '~/services/environment/lib/Environment';

export interface IEnvironmentService {
    apiUrl: string;

    logging: boolean;

    environment: Environment;

    sentryDsn: string;

}

