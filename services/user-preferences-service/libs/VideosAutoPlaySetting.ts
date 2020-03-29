export class VideosAutoPlaySetting {
    static never = new VideosAutoPlaySetting('n');
    static always = new VideosAutoPlaySetting('a');

    static _values: VideosAutoPlaySetting[] = [
        VideosAutoPlaySetting.never,
        VideosAutoPlaySetting.always,
    ];

    static values() {
        return VideosAutoPlaySetting._values.slice(0);
    }

    static parse(val: string): VideosAutoPlaySetting | undefined {
        let parsedValue;

        for (let i = 0; i < VideosAutoPlaySetting._values.length; i++) {
            const value = VideosAutoPlaySetting._values[i];
            if (val == value.code) {
                parsedValue = value;
                break;
            }
        }

        if (!parsedValue) {
            console.error('Unsupported VideosAutoPlaySetting');
        }

        return parsedValue;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}