export class PostStatus {
    static draft = new PostStatus('D');
    static processing = new PostStatus('PG');
    static published = new PostStatus('P');

    static _values: PostStatus[] = [
        PostStatus.draft,
        PostStatus.processing,
        PostStatus.published,
    ];

    static values() {
        return PostStatus._values.slice(0);
    }

    static parse(val: string): PostStatus | undefined {
        let badgeKeyword;

        for (let i = 0; i < PostStatus._values.length; i++) {
            const value = PostStatus._values[i];
            if (val == value.code) {
                badgeKeyword = value;
                break;
            }
        }

        if (!badgeKeyword) {
            console.error('Unsupported post status');
        }

        return badgeKeyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}