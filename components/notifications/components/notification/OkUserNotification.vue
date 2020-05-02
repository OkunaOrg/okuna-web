<template>
    <article class="ok-notification" :class="{ unread: !notification.read }">
        <ok-notification-contents
            v-if="componentIsReady"
            :initiator="initiator"
            :emoji="emoji"
            :preview="preview"
            :notificationBody="notificationBody"
            :created="notification.created"
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

        created() {
            let postComment;

            switch (this.notification.type) {
                case NotificationType.postReaction:
                    this.initiator = this.notification.contentObject.postReaction.reactor;
                    this.emoji = this.notification.contentObject.postReaction.emoji;
                    this.notificationBody = this.$t("components.notifications.reacted_to_post");
                    this.preview = this.notification.contentObject.postReaction.post.mediaThumbnail || null;
                    break;

                case NotificationType.postComment:
                    postComment = this.notification.contentObject.postComment;
                    this.initiator = postComment.commenter;
                    this.notificationBody = this.$t(this.getTranslationKeyByUser("comment", postComment.post.creator), {
                        postCommentText: truncate(postComment.text, 255)
                    });
                    this.preview = postComment.post.mediaThumbnail || null;
                    break;

                case NotificationType.postCommentReply:
                    postComment = this.notification.contentObject.postComment;
                    this.initiator = postComment.commenter;
                    this.notificationBody = this.$t(this.getTranslationKeyByUser("reply", postComment.parentComment.commenter), {
                        postCommentText: truncate(postComment.text, 255)
                    });
                    this.preview = postComment.post.mediaThumbnail || null;
                    break;

                case NotificationType.postCommentUserMention:
                    this.initiator = this.notification.contentObject.postCommentUserMention.postComment.commenter;
                    this.notificationBody = this.$t("components.notifications.mentioned_in_comment");
                    this.preview = this.notification.contentObject.postCommentUserMention.postComment.post.mediaThumbnail || null;
                    break;

                case NotificationType.postCommentReaction:
                    this.initiator = this.notification.contentObject.postCommentReaction.reactor;
                    this.emoji = this.notification.contentObject.postCommentReaction.emoji;
                    this.notificationBody = this.$t("components.notifications.reacted_to_post_comment");
                    this.preview = this.notification.contentObject.postCommentReaction.postComment.post.mediaThumbnail || null;
                    break;

                case NotificationType.connectionRequest:
                    this.initiator = this.notification.contentObject.connectionRequester;
                    this.notificationBody = this.$t("components.notifications.connection_request");
                    break;

                case NotificationType.connectionConfirmed:
                    this.initiator = this.notification.contentObject.connectionConfirmator;
                    this.notificationBody = this.$t("components.notifications.accepted_connection_request");
                    break;

                case NotificationType.follow:
                    this.initiator = this.notification.contentObject.follower;
                    this.notificationBody = this.$t("components.notifications.following_you");
                    break;

                case NotificationType.communityInvite:
                    this.initiator = this.notification.contentObject.communityInvite.creator;
                    this.notificationBody = this.$t("components.notifications.user_community_invite", {
                        communityName: this.notification.contentObject.communityInvite.community.name
                    });
                    break;

                case NotificationType.postUserMention:
                    this.initiator = this.notification.contentObject.postUserMention.post.creator;
                    this.notificationBody = this.$t("components.notifications.mentioned_in_post");
                    this.preview = this.notification.contentObject.postUserMention.post.mediaThumbnail || null;
                    break;

                case NotificationType.communityNewPost:
                    this.initiator = this.notification.contentObject.post.creator;
                    this.community = this.notification.contentObject.post.community;
                    this.notificationBody = this.$t("components.notifications.community_new_post", {
                        communityName: this.notification.contentObject.post.community.name
                    });
                    this.preview = this.notification.contentObject.post.mediaThumbnail || null;

                case NotificationType.userNewPost:
                    this.initiator = this.notification.contentObject.post.creator;
                    this.notificationBody = this.$t("components.notifications.user_new_post");
                    this.preview = this.notification.contentObject.post.mediaThumbnail || null;
                    break;

                default:
                    console.info(`notifications -> Unknown notification type: ${this.notification.type}`, this.notification);
                    return;
            }

            this.componentIsReady = true;
        }
    }
</script>
