<template>
    <div class="media">
        <div class="media-left">
            <ok-community-avatar v-if="post.community"
                                 :community="post.community"
                                 :avatar-size="this.OkAvatarSize.medium">
            </ok-community-avatar>
            <ok-user-avatar v-else :user="post.creator"
                            :avatar-size="this.OkAvatarSize.medium">
            </ok-user-avatar>
        </div>
        <div class="media-content">
            <p class="title is-4">{{post.creator.profile.name}}</p>
            <p class="subtitle is-6">@{{post.creator.username}}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkCommunityAvatar from "~/components/avatars/community-avatar/CommunityAvatar.vue";
    import OkUserAvatar from "~/components/avatars/user-avatar/UserAvatar.vue";
    import { OkAvatarSize } from '~/components/avatars/lib/AvatarSize';

    @Component({
        name: "OkPostHeaderProfileContent",
        components: {OkUserAvatar, OkCommunityAvatar},
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

        OkAvatarSize = OkAvatarSize;

        broadcastWantsToOpenPostActions(){
            this.$emit('onWantsToOpenPostActions', this.post);
        }
    }
</script>
