<template>
    <div class="media">
        <div class="media-left">
            <ok-community-hover-card v-if="post.community" :communityName="post.community.name">
                <nuxt-link v-if="post.community" :to='communityUrl'>
                    <ok-community-avatar :community="post.community"
                                        :avatar-size="this.OkAvatarSize.medium">
                    </ok-community-avatar>
                </nuxt-link>
            </ok-community-hover-card>
            <ok-user-hover-card v-else :username="post.creator.username">
                <ok-user-avatar :user="post.creator"
                                :avatar-size="this.OkAvatarSize.medium">
                </ok-user-avatar>
            </ok-user-hover-card>
        </div>
        <div class="media-content has-overflow-hidden">
            <div v-if="post.community">
                <ok-community-hover-card :communityName="post.community.name">
                    <p class="title is-6 ok-has-text-primary-invert">
                        <nuxt-link :to="communityUrl">
                            {{post.community.title}}
                        </nuxt-link>
                    </p>
                    <p class="subtitle is-7 ok-has-text-primary-invert-80">
                        <nuxt-link :to="communityUrl">
                            <span class="has-text-weight-bold">
                                    c/{{post.community.name}}
                            </span>
                        </nuxt-link>
                        <span>
                        ·
                        </span>
                        <span>
                        {{ post.created | moment("from", "now") }}
                        </span>
                    </p>
                </ok-community-hover-card>
            </div>
            <div v-else>
                <ok-user-hover-card :username="post.creator.username">
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
    import OkCommunityAvatar from '~/components/avatars/community-avatar/OkCommunityAvatar.vue';
    import OkUserHoverCard from '~/components/hover-cards/user-hover-card/OkUserHoverCard.vue';
    import OkCommunityHoverCard from '~/components/hover-cards/community-hover-card/OkCommunityHoverCard.vue';

    @Component({
        name: "OkPostHeaderProfileContent",
        components: {OkCommunityAvatar, OkUserAvatar, OkUserHoverCard, OkCommunityHoverCard},
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

        OkAvatarSize = OkAvatarSize;

        mounted() {
        }

        get communityUrl(){
            return `/c/${this.post.community.name}`;
        }


    }
</script>
