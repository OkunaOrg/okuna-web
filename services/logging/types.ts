import { LeveledLogMethod } from '~/node_modules/winston';

export interface OkLogger {
    error: LeveledLogMethod;
    warn: LeveledLogMethod;
    info: LeveledLogMethod;
    debug: LeveledLogMethod;
    silly: LeveledLogMethod;
}

export interface OkLoggerConfig {
    name: string;
}