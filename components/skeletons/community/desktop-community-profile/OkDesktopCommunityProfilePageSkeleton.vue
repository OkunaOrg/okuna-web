<template>
    <div class="columns flex-direction-column is-vcentered">
        <div class="column ok-desktop-community-profile-page">
            <div class="has-padding-30">
                <ok-desktop-community-profile-skeleton-header></ok-desktop-community-profile-skeleton-header>
            </div>

            <div class="columns has-padding-bottom-30 has-padding-left-30 has-padding-right-30">
                <div class="column">
                    <ok-desktop-community-profile-skeleton-sidebar></ok-desktop-community-profile-skeleton-sidebar>
                </div>
                <div class="column is-narrow ok-desktop-community-post-stream-skeleton">
                    <ok-post-skeleton></ok-post-skeleton>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-desktop-community-profile-page {
        width: 100%;
        max-width: 1190px;
        position: relative;
    }

    .ok-desktop-community-post-stream-skeleton {
        min-width: 635px;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import OkPostSkeleton from "~/components/skeletons/post/OkPostSkeleton.vue";
    import OkDesktopCommunityProfileSkeletonHeader from "~/components/skeletons/community/desktop-community-profile/components/OkDesktopCommunityProfileSkeletonHeader.vue";
    import OkDesktopCommunityProfileSkeletonSidebar from "~/components/skeletons/community/desktop-community-profile/components/OkDesktopCommunityProfileSkeletonSidebar.vue";

    @Component({
        name: "OkDesktopCommunityProfilePageSkeleton",
        components: {
            OkPostSkeleton,
            OkDesktopCommunityProfileSkeletonHeader,
            OkDesktopCommunityProfileSkeletonSidebar
        }
    })
    export default class OkDesktopCommunityProfilePageSkeleton extends Vue {}
</script>
