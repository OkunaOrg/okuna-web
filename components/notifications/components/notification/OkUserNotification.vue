<template>
    <article class="ok-notification" :class="{ 'ok-has-background-primary-highlight': !notification.read }">
        <ok-notification-contents
                v-if="componentIsReady"
                :initiator="initiator"
                :emoji="emoji"
                :preview="preview"
                :notificationBody="notificationBody"
                :action="action"
                :created="notification.created"
                @onClick="readNotification"
        ></ok-notification-contents>
    </article>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import { INotification } from "~/models/notifications/notification/INotification";
    import { NotificationType } from "~/models/notifications/notification/lib/NotificationType";
    import { IUser } from "~/models/auth/user/IUser";
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import { IEmoji } from "~/models/common/emoji/IEmoji";

    import OkNotificationContents from "./components/OkNotificationContents.vue";
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";

    function truncate(str, len) {
        if (str.length > len - 3) {
            return `${str.slice(0, len - 3)}...`;
        }

        return str;
    }

    @Component({
        name: "OkUserNotification",
        components: {OkNotificationContents}
    })
    export default class OkUserNotification extends Vue {
        @Prop(Object) readonly notification: INotification;
        @Prop(Object) readonly currentUser: IUser | undefined;

        componentIsReady = false;

        initiator: IUser = null;
        community: ICommunity = null;
        notificationBody = null;
        emoji: IEmoji = null;
        preview: string = null;
        action: string = null;

        private readNotificationOperation?: CancelableOperation<any>;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        private getTranslationKeyByUser(type: "comment" | "reply", user: IUser) {
            switch (type) {
                case "comment":
                    return user.uuid === this.currentUser.uuid
                        ? "components.notifications.commented_on_your_post"
                        : "components.notifications.also_commented";
                case "reply":
                    return user.uuid === this.currentUser.uuid
                        ? "components.notifications.user_replied"
                        : "components.notifications.user_also_replied";
            }
        }

        private buildPostUrl(postUUID: string, postCommentId?: number, postCommentReplyId?: number) {
            const components = ["", "p", postUUID];
            const params = new URLSearchParams();

            if (postCommentId) {
                params.set("pc", postCommentId.toString());
            }

            if (postCommentReplyId) {
                params.set("pcr", postCommentReplyId.toString());
            }

            const stringifiedParams = params.toString();
            if (stringifiedParams?.length) {
                components.push(`?${stringifiedParams}`);
            }

            return components.join("/");
        }

        created() {
            const contentObject = this.notification.contentObject;

            switch (this.notification.type) {
                case NotificationType.postReaction:
                    let postReaction = contentObject['postReaction'];
                    this.initiator = postReaction.reactor;
                    this.emoji = postReaction.emoji;
                    this.notificationBody = this.$t("components.notifications.reacted_to_post");
                    this.preview = postReaction.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(
                        postReaction.post.uuid
                    );
                    break;

                case NotificationType.postComment:
                    let comment = contentObject['postComment'];
                    this.initiator = comment.commenter;
                    this.notificationBody = this.$t(this.getTranslationKeyByUser("comment", comment.post.creator), {
                        postCommentText: truncate(comment.text, 255)
                    });
                    this.preview = comment.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(
                        comment.post.uuid,
                        comment.id
                    );
                    break;

                case NotificationType.postCommentReply:
                    let reply = contentObject['postComment'];
                    this.initiator = reply.commenter;
                    this.notificationBody = this.$t(this.getTranslationKeyByUser("reply", reply.parentComment.commenter), {
                        postCommentText: truncate(reply.text, 255)
                    });
                    this.preview = reply.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(
                        reply.post.uuid,
                        reply.parentComment.id,
                        reply.id
                    );
                    break;

                case NotificationType.postCommentUserMention:
                    let commentMention = contentObject['postCommentUserMention']
                    this.initiator = commentMention.postComment.commenter;
                    this.notificationBody = this.$t("components.notifications.mentioned_in_comment", {
                        postCommentText: truncate(commentMention.postComment.text, 255)
                    });
                    this.preview = commentMention.postComment.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(
                        commentMention.postComment.post.uuid,
                        commentMention.postComment.id
                    );
                    break;

                case NotificationType.postCommentReaction:
                    let commentReaction = contentObject['postCommentReaction'];
                    this.initiator = commentReaction.reactor;
                    this.emoji = commentReaction.emoji;
                    this.notificationBody = this.$t("components.notifications.reacted_to_post_comment");
                    this.preview = commentReaction.postComment.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(
                        commentReaction.postComment.post.uuid,
                        commentReaction.postComment.id
                    );
                    break;

                case NotificationType.connectionRequest:
                    this.initiator = contentObject['connectionRequester'];
                    this.notificationBody = this.$t("components.notifications.connection_request");
                    this.action = `/${this.initiator.username}`;
                    break;

                case NotificationType.connectionConfirmed:
                    this.initiator = contentObject['connectionConfirmator'];
                    this.notificationBody = this.$t("components.notifications.accepted_connection_request");
                    this.action = `/${this.initiator.username}`;
                    break;

                case NotificationType.follow:
                    this.initiator = contentObject['follower'];
                    this.notificationBody = this.$t("components.notifications.following_you");
                    this.action = `/${this.initiator.username}`;
                    break;

                case NotificationType.communityInvite:
                    this.initiator = contentObject.communityInvite.creator;
                    this.notificationBody = this.$t("components.notifications.user_community_invite", {
                        communityName: contentObject.communityInvite.community.name
                    });
                    this.action = `/c/${contentObject.communityInvite.community.name}`;
                    break;

                case NotificationType.postUserMention:
                    let postMention = contentObject['postUserMention'];
                    this.initiator = postMention.post.creator;
                    this.notificationBody = this.$t("components.notifications.mentioned_in_post");
                    this.preview = postMention.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(
                        postMention.post.uuid
                    );
                    break;

                case NotificationType.communityNewPost:
                    let communityPost = contentObject['post'];
                    this.initiator = communityPost.creator;
                    this.community = communityPost.community;
                    this.notificationBody = this.$t("components.notifications.community_new_post", {
                        communityName: communityPost.community.name
                    });
                    this.preview = communityPost.mediaThumbnail || null;
                    this.action = this.buildPostUrl(communityPost.uuid);
                    break;

                case NotificationType.userNewPost:
                    let userPost = contentObject['post'];
                    this.initiator = userPost.creator;
                    this.notificationBody = this.$t("components.notifications.user_new_post");
                    this.preview = userPost.mediaThumbnail || null;
                    this.action = this.buildPostUrl(userPost.uuid);
                    break;

                default:
                    console.info(`notifications -> Unknown notification type: ${this.notification.type}`, this.notification);
                    return;
            }

            this.componentIsReady = true;
        }

        async readNotification() {
            if (this.readNotificationOperation) return;

            try {
                this.readNotificationOperation = CancelableOperation.fromPromise(this.userService.readNotification({notification: this.notification}));
                await this.readNotificationOperation.value;
                this.notification.readNotification();

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.readNotificationOperation = null;
            }
        }
    }
</script>
