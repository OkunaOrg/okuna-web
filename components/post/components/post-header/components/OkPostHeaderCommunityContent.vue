<template>
    <div class="media">
        <div class="media-left">
            <ok-user-hover-card :username="post.creator.username">
                <nuxt-link :to="postCreatorUrl">
                    <ok-user-avatar
                            :user="post.creator"
                            :avatar-size="this.OkAvatarSize.medium">
                    </ok-user-avatar>
                </nuxt-link>
            </ok-user-hover-card>
        </div>
        <div class="media-content has-overflow-hidden">
            <ok-user-hover-card :username="post.creator.username">
                <p class="title is-6 ok-has-text-primary-invert">
                    <nuxt-link :to="postCreatorUrl">
                            <span class="has-text-weight-bold">
                                {{post.creator.profile.name}}
                            </span>
                    </nuxt-link>
                </p>
                <p class="subtitle is-7 ok-has-text-primary-invert-80">
                    <nuxt-link :to="postCreatorUrl">
                            <span class="has-text-weight-bold">
                                @{{post.creator.username}}
                            </span>
                    </nuxt-link>
                    <span>
                        ·
                    </span>
                    <span>
                        {{ post.created | moment("from", "now") }}
                    </span>
                </p>
            </ok-user-hover-card>
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
    import OkUserHoverCard from '~/components/hover-cards/user-hover-card/OkUserHoverCard.vue';

    @Component({
        name: "OkPostHeaderCommunityContent",
        components: {OkUserAvatar, OkUserHoverCard},
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

        OkAvatarSize = OkAvatarSize;

        get postCreatorUrl() {
            return `/${this.post.creator.username}`;
        }

    }
</script>
