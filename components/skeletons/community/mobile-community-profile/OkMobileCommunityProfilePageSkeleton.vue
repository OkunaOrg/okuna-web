<template>
    <div class="ok-has-background-primary has-height-100-percent is-relative">
        <ok-mobile-community-profile-skeleton-header></ok-mobile-community-profile-skeleton-header>
        <ok-image-cover :cover-size="OkCoverSize.extraMedium"></ok-image-cover>
        <ok-mobile-community-profile-skeleton-card></ok-mobile-community-profile-skeleton-card>
        <ok-post-skeleton></ok-post-skeleton>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import OkMobileCommunityProfileSkeletonHeader from "~/components/skeletons/community/mobile-community-profile/components/OkMobileCommunityProfileSkeletonHeader.vue";
    import OkMobileCommunityProfileSkeletonCard from "~/components/skeletons/community/mobile-community-profile/components/OkMobileCommunityProfileSkeletonCard.vue";
    import OkPostSkeleton from "~/components/skeletons/post/OkPostSkeleton.vue";
    import OkImageCover from "~/components/covers/image-cover/OkImageCover.vue";
    import { OkCoverSize } from "~/components/covers/lib/OkCoverSize";

    @Component({
        name: "OkMobileCommunityProfilePageSkeleton",
        components: {
            OkMobileCommunityProfileSkeletonHeader,
            OkMobileCommunityProfileSkeletonCard,
            OkPostSkeleton,
            OkImageCover
        }
    })
    export default class OkMobileCommunityProfilePageSkeleton extends Vue {
        OkCoverSize = OkCoverSize;
    }
</script>
