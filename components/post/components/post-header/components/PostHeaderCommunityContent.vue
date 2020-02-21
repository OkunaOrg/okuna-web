<template>
    <div class="media">
        <div class="media-left">
            <ok-user-avatar
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
    import OkUserAvatar from '~/components/avatars/user-avatar/UserAvatar.vue';
    import { OkAvatarSize } from '~/components/avatars/lib/AvatarSize';

    @Component({
        name: "OkPostHeaderCommunityContent",
        components: {OkUserAvatar},
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

        OkAvatarSize: OkAvatarSize = OkAvatarSize;

        broadcastWantsToOpenPostActions(){
            this.$emit('onWantsToOpenPostActions', this.post);
        }

    }
</script>
