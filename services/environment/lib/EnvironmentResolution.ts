export class EnvironmentResolution {
    static mobile = new EnvironmentResolution('mobile');
    static tablet = new EnvironmentResolution('tablet');
    static desktop = new EnvironmentResolution('desktop');

    static _values: EnvironmentResolution[] = [
        EnvironmentResolution.mobile,
        EnvironmentResolution.tablet,
        EnvironmentResolution.desktop,
    ];

    static values() {
        return EnvironmentResolution._values.slice(0);
    }

    static parse(val: string): EnvironmentResolution | undefined {
        let environmentResolution;

        for (let i = 0; i < EnvironmentResolution._values.length; i++) {
            const value = EnvironmentResolution._values[i];
            if (val == value.code) {
                environmentResolution = value;
                break;
            }
        }

        if (!environmentResolution) {
            throw new Error(`Unsupported environmentResolution "${val}"`);
        }

        return environmentResolution;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}