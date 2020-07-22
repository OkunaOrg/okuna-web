<template>
    <div class="ok-has-background-primary ok-mobile-user-profile-card">
        <div class="ok-mobile-user-profile-card__content">
            <div class="has-padding-left-20 has-padding-right-20 container">
                <div class="columns is-gapless is-marginless is-mobile has-padding-bottom-10">
                    <div class="column ok-mobile-user-profile-card__avatar is-narrow">
                        <ok-image-avatar :avatar-size="OkAvatarSize.large"></ok-image-avatar>
                    </div>
                </div>
                <div class="columns is-gapless is-marginless has-padding-top-10 flex-direction-column">
                    <div class="column has-margin-bottom-10 ok-mobile-user-profile-card__post-avatar">
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

<style lang="scss">
    $card-top: -20px;
    $avatar-top: -40px;

    .ok-mobile-user-profile-card{
        position: relative;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        margin-top: $card-top;

        &__avatar{
            position: relative;
            top: $avatar-top;
        }

        &__post-avatar{
            margin-top: $avatar-top !important;
        }

    }
</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import OkImageAvatar from "~/components/avatars/image-avatar/OkImageAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";

    @Component({
        name: "OkMobileUserProfileSkeletonCard",
        components: {OkImageAvatar}
    })
    export default class OkMobileUserProfileSkeletonCard extends Vue {
        OkAvatarSize = OkAvatarSize;
    }
</script>
