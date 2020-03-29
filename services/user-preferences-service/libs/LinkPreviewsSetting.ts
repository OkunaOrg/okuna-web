export class LinkPreviewsSetting {
    static never = new LinkPreviewsSetting('n');
    static always = new LinkPreviewsSetting('a');

    static _values: LinkPreviewsSetting[] = [
        LinkPreviewsSetting.never,
        LinkPreviewsSetting.always,
    ];

    static values() {
        return LinkPreviewsSetting._values.slice(0);
    }

    static parse(val: string): LinkPreviewsSetting | undefined {
        let parsedValue;

        for (let i = 0; i < LinkPreviewsSetting._values.length; i++) {
            const value = LinkPreviewsSetting._values[i];
            if (val == value.code) {
                parsedValue = value;
                break;
            }
        }

        if (!parsedValue) {
            console.error('Unsupported LinkPreviewsSetting');
        }

        return parsedValue;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}