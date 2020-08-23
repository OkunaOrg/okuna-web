<template>
    <nuxt-link class="notification-contents media has-no-hover-text-decoration" :to="action" @click.native="onClick">
        <div class="notification-avatar media-left">
            <ok-community-avatar
                v-if="community"
                :community="community"
                :avatar-size="avatarSize.medium"
            ></ok-community-avatar>
            <ok-user-avatar
                v-else
                :user="initiator"
                :avatar-size="avatarSize.medium"
            ></ok-user-avatar>
        </div>
        <div class="notification-body media-content ok-has-text-primary-invert has-overflow-hidden">
            <strong class="notification-body-name" v-if="!community">{{ initiator.profile.name }}</strong>
            <span class="notification-body-username" v-if="!community">@{{ initiator.username }}</span>
            <span class="notification-text has-preserved-whitespace">{{ notificationBody }}</span>
            <div class="created-at subtitle is-7 ok-has-text-primary-invert-80">
                {{ created | moment("from", "now") }}
            </div>
        </div>
        <ok-notification-reaction class="media-right" v-if="emoji" :emoji="emoji"></ok-notification-reaction>
        <ok-notification-preview class="media-right" v-if="preview && preview.length" :thumbnail="preview"></ok-notification-preview>
    </nuxt-link>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";

    import { IUser } from "~/models/auth/user/IUser";
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import { IEmoji } from "~/models/common/emoji/IEmoji";

    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import OkCommunityAvatar from "~/components/avatars/community-avatar/OkCommunityAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";

    import OkNotificationReaction from "./OkNotificationReaction.vue";
    import OkNotificationPreview from "./OkNotificationPreview.vue";

    @Component({
        name: "OkNotificationContents",
        components: {
            OkUserAvatar,
            OkCommunityAvatar,
            OkNotificationReaction,
            OkNotificationPreview
        }
    })
    export default class OkNotificationContents extends Vue {
        @Prop(Object) readonly initiator: IUser;
        @Prop(Object) readonly community: ICommunity | undefined;
        @Prop(Object) readonly emoji: IEmoji | undefined;
        @Prop(String) readonly preview: string | undefined;
        @Prop(String) readonly notificationBody: string;
        @Prop(String) readonly action: string;
        @Prop(Number) readonly created: Date;

        avatarSize = OkAvatarSize;

        onClick() {
            this.$emit('onClick');
        }
    }
</script>

<style lang="scss" scoped>
    .notification-contents {
        padding: 10px 15px;
    }
</style>
