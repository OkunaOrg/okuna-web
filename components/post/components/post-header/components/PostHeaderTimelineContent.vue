<template>
    <div class="media">
        <div class="media-left">
            <ok-user-avatar :user="post.creator"
                            :avatar-size="this.OkAvatarSize.medium">
            </ok-user-avatar>
        </div>
        <div class="media-content has-overflow-hidden">
            <div v-if="post.community">
                <p class="title is-6 ok-has-text-primary-invert">c/{{post.community.name}}</p>
                <p class="subtitle is-7 ok-has-text-primary-invert-80">
                    <span class="has-text-weight-bold">
                    {{post.creator.profile.name}}
                    </span>
                    <span>
                    @{{post.creator.username}}
                    </span>
                    <span>
                    ·
                    </span>
                    <span>
                    {{ post.created | moment("from", "now") }}
                </span>
                </p>
            </div>
            <div v-else>
                <p class="title is-6 ok-has-text-primary-invert">{{post.creator.profile.name}}</p>
                <p class="subtitle is-7 ok-has-text-primary-invert-80">
                <span class="has-text-weight-bold">
                    @{{post.creator.username}}
                </span>
                    <span>
                    ·
                </span>
                    <span>
                    {{ post.created | moment("from", "now") }}
                </span>
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkUserAvatar from "~/components/avatars/user-avatar/UserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/AvatarSize";

    @Component({
        name: "OkPostHeaderTimelineContent",
        components: {OkUserAvatar},
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

        OkAvatarSize = OkAvatarSize;

        mounted() {
        }

        broadcastWantsToOpenPostActions() {
            this.$emit("onWantsToOpenPostActions", this.post);
        }


    }
</script>
