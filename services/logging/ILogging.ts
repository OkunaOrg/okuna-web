import { OkLogger, OkLoggerConfig } from '~/services/logging/types';

export interface ILoggingService {
    getLogger(config: OkLoggerConfig): OkLogger;
}

