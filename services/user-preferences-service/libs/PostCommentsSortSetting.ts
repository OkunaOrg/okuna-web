export class PostCommentsSortSetting {
    static newestFirst = new PostCommentsSortSetting('DESC');
    static oldestFirst = new PostCommentsSortSetting('ASC');

    static _values: PostCommentsSortSetting[] = [
        PostCommentsSortSetting.newestFirst,
        PostCommentsSortSetting.oldestFirst,
    ];

    static values() {
        return PostCommentsSortSetting._values.slice(0);
    }

    static parse(val: string): PostCommentsSortSetting | undefined {
        let keyword;

        for (let i = 0; i < PostCommentsSortSetting._values.length; i++) {
            const value = PostCommentsSortSetting._values[i];
            if (val == value.code) {
                keyword = value;
                break;
            }
        }

        if (!keyword) {
            console.error('Unsupported comments sort type');
        }

        return keyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}
