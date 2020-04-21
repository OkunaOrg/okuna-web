import { IOkLogger, OkLoggerConfig } from '~/services/logging/types';

export interface ILoggingService {
    getLogger(config: OkLoggerConfig): IOkLogger;
}

