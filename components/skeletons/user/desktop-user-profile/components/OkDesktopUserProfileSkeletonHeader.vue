<template>
    <div class="card ok-has-background-primary has-overflow-hidden">
        <ok-image-cover :cover-size="OkCoverSize.large"></ok-image-cover>
        <footer class="columns is-gapless ok-desktop-user-profile-header-bar">
            <div class="column is-narrow" style="width: 188px;">
                <div class="ok-desktop-user-profile-header-avatar">
                    <ok-image-avatar :avatar-size="OkAvatarSize.extraLarge"></ok-image-avatar>
                </div>
            </div>
            <div class="column is-flex align-items-center">
                <div class="columns has-width-100-percent is-variable is-8">
                    <div class="column flex-direction-column is-narrow is-flex justify-center">
                        <div class="is-flex align-center has-margin-bottom-5">
                            <b-skeleton height="24px" width="100px"></b-skeleton>
                        </div>
                        <div class="is-flex align-center">
                            <b-skeleton width="60%"></b-skeleton>
                        </div>
                    </div>
                    <div class="column flex-direction-column is-narrow is-flex align-items-center justify-center">
                        <div class="columns">
                            <div class="column">
                                <b-skeleton width="70px"></b-skeleton>
                            </div>
                            <div class="column">
                                <b-skeleton width="80px"></b-skeleton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-narrow is-flex justify-center align-items-center">
                <div class="has-padding-left-20 has-padding-right-20">
                    <div class="columns is-vcentered is-mobile">
                        <div class="column is-narrow">
                            <b-skeleton width="60px"></b-skeleton>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<style lang="scss">
    .ok-desktop-user-profile-header-bar {
        height: 95px;
    }

    $header-avatar-padding: 25px;

    .ok-desktop-user-profile-header-avatar {
        position: absolute;
        left: $header-avatar-padding;
        bottom: $header-avatar-padding;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import OkImageCover from "~/components/covers/image-cover/OkImageCover.vue";
    import OkImageAvatar from "~/components/avatars/image-avatar/OkImageAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { OkCoverSize } from "~/components/covers/lib/OkCoverSize";

    @Component({
        name: "OkDesktopUserProfileSkeletonHeader",
        components: {
            OkImageCover,
            OkImageAvatar
        }
    })
    export default class OkDesktopUserProfileSkeletonHeader extends Vue {
        OkAvatarSize = OkAvatarSize;
        OkCoverSize = OkCoverSize;
    }
</script>
