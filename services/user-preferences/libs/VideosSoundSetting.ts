export class VideosSoundSetting {
    static enabled = new VideosSoundSetting('e');
    static disabled = new VideosSoundSetting('d');

    static _values: VideosSoundSetting[] = [
        VideosSoundSetting.enabled,
        VideosSoundSetting.disabled,

    ];

    static values() {
        return VideosSoundSetting._values.slice(0);
    }

    static parse(val: string): VideosSoundSetting | undefined {
        let parsedValue;

        for (let i = 0; i < VideosSoundSetting._values.length; i++) {
            const value = VideosSoundSetting._values[i];
            if (val == value.code) {
                parsedValue = value;
                break;
            }
        }

        if (!parsedValue) {
            console.error('Unsupported VideosSoundSetting', val);
        }

        return parsedValue;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}