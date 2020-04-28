<template>
    <div class="media">
        <div class="media-left">
            <ok-community-avatar v-if="post.community" :community="post.community"
                            :avatar-size="this.OkAvatarSize.medium">
            </ok-community-avatar>
            <ok-user-avatar v-else :user="post.creator"
                            :avatar-size="this.OkAvatarSize.medium">
            </ok-user-avatar>
        </div>
        <div class="media-content has-overflow-hidden">
            <div v-if="post.community">
                <p class="title is-6 ok-has-text-primary-invert">{{post.community.title}}</p>
                <p class="subtitle is-7 ok-has-text-primary-invert-80">
                    <span class="has-text-weight-bold">
                    c/{{post.community.name}}
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
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkCommunityAvatar from '~/components/avatars/community-avatar/OkCommunityAvatar.vue';

    @Component({
        name: "OkPostHeaderProfileContent",
        components: {OkCommunityAvatar, OkUserAvatar},
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
