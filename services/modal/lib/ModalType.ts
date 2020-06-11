export class ModalType {
    static post = new ModalType('Post');
    static postReactions = new ModalType('PostReactions');
    static postCommentReactions = new ModalType('PostCommentReactions');
    static communitiesList = new ModalType('CommunitiesList');

    static _values: ModalType[] = [
        ModalType.post,
        ModalType.postReactions,
        ModalType.communitiesList,
    ];

    static values() {
        return ModalType._values.slice(0);
    }

    static parse(val: string): ModalType | undefined {
        let keyword;

        for (let i = 0; i < ModalType._values.length; i++) {
            const value = ModalType._values[i];
            if (val == value.code) {
                keyword = value;
                break;
            }
        }

        if (!keyword) {
            console.error('Unsupported modal type');
        }

        return keyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}
