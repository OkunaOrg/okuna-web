export class Environment {
    static development = new Environment('development');
    static production = new Environment('production');

    static _values: Environment[] = [
        Environment.development,
        Environment.production,
    ];

    static values() {
        return Environment._values.slice(0);
    }

    static parse(val: string): Environment | undefined {
        let environment;

        for (let i = 0; i < Environment._values.length; i++) {
            const value = Environment._values[i];
            if (val == value.code) {
                environment = value;
                break;
            }
        }

        if (!environment) {
            throw new Error(`Unsupported environment "${val}"`);
        }

        return environment;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}