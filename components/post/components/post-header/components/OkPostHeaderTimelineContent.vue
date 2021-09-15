<template>
    <div class="media">
        <div class="media-left">
            <ok-user-hover-card :username="post.creator.username">
                <nuxt-link :to="postCreatorUrl">
                    <ok-user-avatar :user="post.creator"
                                    :avatar-size="this.OkAvatarSize.medium">
                    </ok-user-avatar>
                </nuxt-link>
            </ok-user-hover-card>
        </div>
        <div class="media-content has-overflow-hidden">
            <div v-if="post.community">
                <ok-community-hover-card :communityName="post.community.name">
                    <nuxt-link :to="postCommunityUrl" class="is-flex align-items-center has-padding-bottom-5">
                        <ok-community-avatar :community="post.community"
                                            :avatar-size="OkAvatarSize.extraSmall"></ok-community-avatar>
                        <span class="title is-6 ok-has-text-primary-invert has-padding-left-5">
                            c/{{post.community.name}}
                        </span>
                    </nuxt-link>
                </ok-community-hover-card>
                <p class="subtitle is-7 ok-has-text-primary-invert-80">
                    <ok-user-hover-card :username="post.creator.username">
                        <nuxt-link :to="postCreatorUrl">
                            <span class="has-text-weight-bold">
                                {{post.creator.profile.name}}
                            </span>
                            <span>
                                @{{post.creator.username}}
                            </span>
                        </nuxt-link>
                    </ok-user-hover-card>
                    <span>
                    ·
                    </span>
                    <span>
                    {{ post.created | moment("from", "now") }}
                </span>
                </p>
            </div>
            <div v-else>
                <ok-user-hover-card :username="post.creator.username">
                    <p class="title is-6 ok-has-text-primary-invert">
                        <nuxt-link :to="postCreatorUrl">
                            <div class="is-flex align-center">
                                <span class="has-text-weight-bold">
                                    {{post.creator.profile.name}}
                                </span>

                                <div v-if="post.creator.profile.badges" class="is-flex align-center align-items-center">
                                    <ok-user-badge
                                        v-for="badge in post.creator.profile.badges"
                                        :key="badge.keyword"
                                        :badge="badge"
                                        :size="OkUserBadgeSize.small"
                                    ></ok-user-badge>
                                </div>
                            </div>
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
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkCommunityAvatar from "~/components/avatars/community-avatar/OkCommunityAvatar.vue";
    import OkUserHoverCard from '~/components/hover-cards/user-hover-card/OkUserHoverCard.vue';
    import OkCommunityHoverCard from '~/components/hover-cards/community-hover-card/OkCommunityHoverCard.vue';
    import OkUserBadge from '~/components/user-badges/OkUserBadge.vue';
    import { OkUserBadgeSize } from '~/components/user-badges/lib/OkUserBadgeSize';

    @Component({
        name: "OkPostHeaderTimelineContent",
        components: {
            OkCommunityAvatar,
            OkUserAvatar,
            OkUserHoverCard,
            OkCommunityHoverCard,
            OkUserBadge
        },
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

        OkAvatarSize = OkAvatarSize;
        OkUserBadgeSize = OkUserBadgeSize;

        mounted() {
        }

        get postCommunityUrl() {
            return `/c/${this.post.community.name}`;
        }

        get postCreatorUrl() {
            return `/${this.post.creator.username}`;
        }


    }
</script>
