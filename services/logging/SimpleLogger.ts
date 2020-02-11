import { IOkLogger } from '~/services/logging/types';

export class OKSimpleLogger implements IOkLogger {
    private readonly name: string;
    private readonly isDebug: boolean;
    private readonly prefix: string;


    constructor(config: {name: string, isDebug: boolean}) {
        this.name = config.name;
        this.isDebug = config.isDebug;
        this.prefix = `${this.name} ->`;
    };

    debug(message?: any, ...optionalParams: any[]) {
        if (!this.isDebug) return;

        return console.debug.bind(window.console, this.prefix)(message, ...optionalParams);
    }

    error(message?: any, ...optionalParams: any[]) {
        if (!this.isDebug) return;

        return console.error.bind(window.console, this.prefix)(message, ...optionalParams);
    };

    info(message?: any, ...optionalParams: any[]) {
        if (!this.isDebug) return;

        return console.info.bind(window.console, this.prefix)(message, ...optionalParams);
    };

    silly(message?: any, ...optionalParams: any[]) {
        if (!this.isDebug) return;

        return console.info.bind(window.console, this.prefix)(message, ...optionalParams);
    };

    warn(message?: any, ...optionalParams: any[]) {
        if (!this.isDebug) return;

        return console.warn.bind(window.console, this.prefix)(message, ...optionalParams);
    };


}