import { inject, injectable } from '~/node_modules/inversify';
import { ILoggingService } from '~/services/logging/ILogging';
import { IOkLogger, OkLoggerConfig } from '~/services/logging/types';
import { TYPES } from '~/services/inversify-types';
import { IEnvironmentService } from '~/services/environment/IEnvironment';
import { Environment } from '~/services/environment/lib/Environment';

const pino = require('pino');


@injectable()
export class LoggingService implements ILoggingService {

    pinoLogger: any;

    constructor(@inject(TYPES.EnvironmentService) private environmentService?: IEnvironmentService) {
        this.pinoLogger = pino({
            name: 'Okuna',
            level: environmentService!.environment == Environment.production ? 'warn' : 'info'
        });
    }

    getLogger(config: OkLoggerConfig): IOkLogger {
        return this.pinoLogger.child({
            name: config.name
        });
    }

}

