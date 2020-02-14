export class PostMediaType {
    static video = new PostMediaType('V');
    static image = new PostMediaType('I');

    static _values: PostMediaType[] = [
        PostMediaType.video,
        PostMediaType.image,
    ];

    static values() {
        return PostMediaType._values.slice(0);
    }

    static parse(val: string): PostMediaType | undefined {
        let badgeKeyword;

        for (let i = 0; i < PostMediaType._values.length; i++) {
            const value = PostMediaType._values[i];
            if (val == value.code) {
                badgeKeyword = value;
                break;
            }
        }

        if (!badgeKeyword) {
            console.error('Unsupported badge keyword');
        }

        return badgeKeyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}