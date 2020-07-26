<template>
    <div class="columns flex-direction-column is-vcentered">
        <div class="column ok-desktop-user-profile-page">
            <div class="has-padding-30">
                <ok-desktop-user-profile-skeleton-header></ok-desktop-user-profile-skeleton-header>
            </div>

            <div class="columns has-padding-bottom-30 has-padding-left-30 has-padding-right-30">
                <div class="column">
                    <ok-desktop-user-profile-skeleton-sidebar></ok-desktop-user-profile-skeleton-sidebar>
                </div>
                <div class="column is-narrow ok-desktop-user-post-stream-skeleton">
                    <ok-post-skeleton></ok-post-skeleton>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-desktop-user-profile-page {
        width: 100%;
        max-width: 1190px;
        position: relative;
    }

    .ok-desktop-user-post-stream-skeleton {
        min-width: 635px;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import OkPostSkeleton from "~/components/skeletons/post/OkPostSkeleton.vue";
    import OkDesktopUserProfileSkeletonHeader from "~/components/skeletons/user/desktop-user-profile/components/OkDesktopUserProfileSkeletonHeader.vue";
    import OkDesktopUserProfileSkeletonSidebar from "~/components/skeletons/user/desktop-user-profile/components/OkDesktopUserProfileSkeletonSidebar.vue";

    @Component({
        name: "OkDesktopUserProfilePageSkeleton",
        components: {
            OkPostSkeleton,
            OkDesktopUserProfileSkeletonHeader,
            OkDesktopUserProfileSkeletonSidebar
        }
    })
    export default class OkDesktopUserProfilePageSkeleton extends Vue {}
</script>
