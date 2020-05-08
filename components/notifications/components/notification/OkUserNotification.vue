<template>
    <article class="ok-notification" :class="{ unread: !notification.read }">
        <ok-notification-contents
            v-if="componentIsReady"
            :initiator="initiator"
            :emoji="emoji"
            :preview="preview"
            :notificationBody="notificationBody"
            :action="action"
            :created="notification.created"
            @userClicked="markNotificationAsRead"
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
        action: string = null;

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
            const components = [ "", "p", postUUID ];
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

            return components.join('/');
        }

        created() {
            let postComment;
            const contentObject = this.notification.contentObject;

            switch (this.notification.type) {
                case NotificationType.postReaction:
                    this.initiator = contentObject.postReaction.reactor;
                    this.emoji = contentObject.postReaction.emoji;
                    this.notificationBody = this.$t("components.notifications.reacted_to_post");
                    this.preview = contentObject.postReaction.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(
                        contentObject.postReaction.post.uuid
                    );
                    break;

                case NotificationType.postComment:
                    postComment = contentObject.postComment;
                    this.initiator = postComment.commenter;
                    this.notificationBody = this.$t(this.getTranslationKeyByUser("comment", postComment.post.creator), {
                        postCommentText: truncate(postComment.text, 255)
                    });
                    this.preview = postComment.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(
                        contentObject.postComment.post.uuid,
                        contentObject.postComment.id
                    );
                    break;

                case NotificationType.postCommentReply:
                    postComment = contentObject.postComment;
                    this.initiator = postComment.commenter;
                    this.notificationBody = this.$t(this.getTranslationKeyByUser("reply", postComment.parentComment.commenter), {
                        postCommentText: truncate(postComment.text, 255)
                    });
                    this.preview = postComment.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(
                        contentObject.postComment.post.uuid,
                        contentObject.postComment.parentComment.id,
                        contentObject.postComment.id
                    );
                    break;

                case NotificationType.postCommentUserMention:
                    this.initiator = contentObject.postCommentUserMention.postComment.commenter;
                    this.notificationBody = this.$t("components.notifications.mentioned_in_comment");
                    this.preview = contentObject.postCommentUserMention.postComment.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(
                        contentObject.postCommentUserMention.postComment.post.uuid,
                        contentObject.postCommentUserMention.postComment.id
                    );
                    break;

                case NotificationType.postCommentReaction:
                    this.initiator = contentObject.postCommentReaction.reactor;
                    this.emoji = contentObject.postCommentReaction.emoji;
                    this.notificationBody = this.$t("components.notifications.reacted_to_post_comment");
                    this.preview = contentObject.postCommentReaction.postComment.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(
                        contentObject.postCommentReaction.postComment.post.uuid,
                        contentObject.postCommentReaction.postComment.id
                    );
                    break;

                case NotificationType.connectionRequest:
                    this.initiator = contentObject.connectionRequester;
                    this.notificationBody = this.$t("components.notifications.connection_request");
                    this.action = `/${this.initiator.username}`;
                    break;

                case NotificationType.connectionConfirmed:
                    this.initiator = contentObject.connectionConfirmator;
                    this.notificationBody = this.$t("components.notifications.accepted_connection_request");
                    this.action = `/${this.initiator.username}`;
                    break;

                case NotificationType.follow:
                    this.initiator = contentObject.follower;
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
                    this.initiator = contentObject.postUserMention.post.creator;
                    this.notificationBody = this.$t("components.notifications.mentioned_in_post");
                    this.preview = contentObject.postUserMention.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(
                        contentObject.postUserMention.post.uuid
                    );
                    break;

                case NotificationType.communityNewPost:
                    this.initiator = contentObject.post.creator;
                    this.community = contentObject.post.community;
                    this.notificationBody = this.$t("components.notifications.community_new_post", {
                        communityName: contentObject.post.community.name
                    });
                    this.preview = contentObject.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(contentObject.post.uuid);
                    break;

                case NotificationType.userNewPost:
                    this.initiator = contentObject.post.creator;
                    this.notificationBody = this.$t("components.notifications.user_new_post");
                    this.preview = contentObject.post.mediaThumbnail || null;
                    this.action = this.buildPostUrl(contentObject.post.uuid);
                    break;

                default:
                    console.info(`notifications -> Unknown notification type: ${this.notification.type}`, this.notification);
                    return;
            }

            this.componentIsReady = true;
        }

        markNotificationAsRead() {
            this.$emit("userReadNotification", this.notification);
        }
    }
</script>

<style lang="scss" scoped>
    .ok-notification.unread {
        background: #f5f5f5;
    }
</style>
