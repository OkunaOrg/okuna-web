import { inject, injectable } from '~/node_modules/inversify';
import { ILoggingService } from '~/services/logging/ILogging';
import * as winston from '~/node_modules/winston';
import { OkLogger, OkLoggerConfig } from '~/services/logging/types';
import { TYPES } from '~/services/inversify-types';
import { IEnvironmentService } from '~/services/environment/IEnvironment';
import { Environment } from '~/services/environment/lib/Environment';

const winstonSentry = require('winston-sentry');

@injectable()
export class Logging implements ILoggingService {

    constructor(@inject(TYPES.EnvironmentService) private environmentService?: IEnvironmentService) {

    }

    getLogger(config: OkLoggerConfig): OkLogger {

        const loggerTransports = this.getLoggerTransports();

        return winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: {service: config.name},
            transports: loggerTransports
        });
    }

    private getLoggerTransports(): any[] {
        const transports = [];

        if (this.environmentService!.logging) {
            switch (this.environmentService!.environment) {
                case Environment.development:
                    transports.push(
                        new winston.transports.Console({
                            level: 'silly',
                            format: winston.format.simple()
                        })
                    );
                    break;
                case Environment.production:
                    transports.push(
                        new winstonSentry(
                            {
                                level: 'warn',
                                patchGlobal: true,
                                dsn: this.environmentService!.sentryDsn,
                            }
                        )
                    );
                    break;
            }
        }

        return transports;
    }

}

