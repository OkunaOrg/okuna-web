<template>
    <div class="ok-has-background-primary has-height-100-percent is-relative">
        <ok-mobile-user-profile-skeleton-header></ok-mobile-user-profile-skeleton-header>
        <ok-image-cover :cover-size="OkCoverSize.large"></ok-image-cover>
        <ok-mobile-user-profile-skeleton-card></ok-mobile-user-profile-skeleton-card>
        <ok-post-skeleton></ok-post-skeleton>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import OkMobileUserProfileSkeletonHeader from "~/components/skeletons/user/mobile-user-profile/components/OkMobileUserProfileSkeletonHeader.vue";
    import OkMobileUserProfileSkeletonCard from "~/components/skeletons/user/mobile-user-profile/components/OkMobileUserProfileSkeletonCard.vue";
    import OkPostSkeleton from "~/components/skeletons/post/OkPostSkeleton.vue";
    import OkImageCover from "~/components/covers/image-cover/OkImageCover.vue";
    import { OkCoverSize } from "~/components/covers/lib/OkCoverSize";

    @Component({
        name: "OkMobileUserProfilePageSkeleton",
        components: {
            OkMobileUserProfileSkeletonHeader,
            OkMobileUserProfileSkeletonCard,
            OkPostSkeleton,
            OkImageCover
        }
    })
    export default class OkMobileUserProfilePageSkeleton extends Vue {
        OkCoverSize = OkCoverSize;
    }
</script>
