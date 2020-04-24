export class NotificationType {
    static postReaction = new NotificationType('PR');
    static postComment = new NotificationType('PC');
    static postCommentReply = new NotificationType('PCR');
    static postCommentReaction = new NotificationType('PCRA');
    static connectionRequest = new NotificationType('CR');
    static connectionConfirmed = new NotificationType('CC');
    static follow = new NotificationType('F');
    static communityInvite = new NotificationType('CI');
    static postCommentUserMention = new NotificationType('PCUM');
    static postUserMention = new NotificationType('PUM');
    static communityNewPost = new NotificationType('CNP');
    static userNewPost = new NotificationType('UNP');

    static _values: NotificationType[] = [
        NotificationType.postReaction,
        NotificationType.postComment,
        NotificationType.postCommentReply,
        NotificationType.postCommentReaction,
        NotificationType.connectionRequest,
        NotificationType.connectionConfirmed,
        NotificationType.follow,
        NotificationType.communityInvite,
        NotificationType.postCommentUserMention,
        NotificationType.postUserMention,
        NotificationType.communityNewPost,
        NotificationType.userNewPost,
    ];

    static values() {
        return NotificationType._values.slice(0);
    }

    static parse(val: string): NotificationType | undefined {
        let badgeKeyword;

        for (let i = 0; i < NotificationType._values.length; i++) {
            const value = NotificationType._values[i];
            if (val == value.code) {
                badgeKeyword = value;
                break;
            }
        }

        if (!badgeKeyword) {
            console.error('Unsupported notification type');
        }

        return badgeKeyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}