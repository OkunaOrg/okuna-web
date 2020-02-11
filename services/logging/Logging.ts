import { inject, injectable } from '~/node_modules/inversify';
import { ILoggingService } from '~/services/logging/ILogging';
import { IOkLogger, OkLoggerConfig } from '~/services/logging/types';
import { TYPES } from '~/services/inversify-types';
import { IEnvironmentService } from '~/services/environment/IEnvironment';
import { OKSimpleLogger } from './SimpleLogger';
import { Environment } from '~/services/environment/lib/Environment';


@injectable()
export class LoggingService implements ILoggingService {

    private readonly isDebug: boolean;


    constructor(@inject(TYPES.EnvironmentService) private environmentService?: IEnvironmentService) {
        this.isDebug = environmentService!.environment !== Environment.production;
    }

    getLogger(config: OkLoggerConfig): IOkLogger {
        return new OKSimpleLogger({
            isDebug: this.isDebug,
            name: config.name
        });
    }
}

