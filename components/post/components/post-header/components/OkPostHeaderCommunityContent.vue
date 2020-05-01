<template>
    <div class="media">
        <div class="media-left">
            <ok-user-avatar
                    :user="post.creator"
                    :avatar-size="this.OkAvatarSize.medium">
            </ok-user-avatar>
        </div>
        <div class="media-content">
            <p class="title is-6">{{post.creator.profile.name}}</p>
            <p class="subtitle is-7">@{{post.creator.username}}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkUserAvatar from '~/components/avatars/user-avatar/OkUserAvatar.vue';
    import { OkAvatarSize } from '~/components/avatars/lib/OkAvatarSize';

    @Component({
        name: "OkPostHeaderCommunityContent",
        components: {OkUserAvatar},
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

        OkAvatarSize = OkAvatarSize;

        broadcastWantsToOpenPostActions(){
            this.$emit('onWantsToOpenPostActions', this.post);
        }

    }
</script>
