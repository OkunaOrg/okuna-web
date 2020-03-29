export class HashtagDisplaySetting {
    static traditional = new HashtagDisplaySetting('t');
    static disco = new HashtagDisplaySetting('d');

    static _values: HashtagDisplaySetting[] = [
        HashtagDisplaySetting.traditional,
        HashtagDisplaySetting.disco,
    ];

    static values() {
        return HashtagDisplaySetting._values.slice(0);
    }

    static parse(val: string): HashtagDisplaySetting | undefined {
        let parsedValue;

        for (let i = 0; i < HashtagDisplaySetting._values.length; i++) {
            const value = HashtagDisplaySetting._values[i];
            if (val == value.code) {
                parsedValue = value;
                break;
            }
        }

        if (!parsedValue) {
            console.error('Unsupported HashtagDisplaySetting');
        }

        return parsedValue;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}