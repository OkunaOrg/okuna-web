<template>
    <div class="ok-has-background-primary ok-mobile-community-profile-card">
        <div class="ok-mobile-community-profile-card__content">
            <div class="has-padding-left-20 has-padding-right-20 container has-padding-top-20">
                <div class="columns is-gapless is-marginless is-mobile has-padding-bottom-10">
                    <div class="column ok-mobile-community-profile-card__avatar is-narrow">
                        <ok-image-avatar :avatar-size="OkAvatarSize.extraMedium"></ok-image-avatar>
                    </div>
                </div>
                <div class="columns is-gapless is-marginless has-padding-top-10 flex-direction-column">
                    <div class="column has-margin-bottom-10 ok-mobile-community-profile-card__post-avatar">
                        <b-skeleton height="24px" width="100px"></b-skeleton>
                    </div>
                    <div class="column has-margin-bottom-10">
                        <b-skeleton width="60px"></b-skeleton>
                    </div>
                    <div class="column has-margin-bottom-10">
                        <b-skeleton width="120px"></b-skeleton>
                    </div>
                </div>
                <div class="columns is-mobile is-multiline is-variable is-2 is-marginless">
                    <div class="column is-narrow">
                        <b-skeleton width="70px"></b-skeleton>
                    </div>
                    <div class="column is-narrow">
                        <b-skeleton width="80px"></b-skeleton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import OkImageAvatar from "~/components/avatars/image-avatar/OkImageAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";

    @Component({
        name: "OkMobileCommunityProfileSkeletonCard",
        components: {OkImageAvatar}
    })
    export default class OkMobileCommunityProfileSkeletonCard extends Vue {
        OkAvatarSize = OkAvatarSize;
    }
</script>
