<template>
    <div class="card ok-has-background-primary-highlight has-overflow-hidden has-margin-bottom-20">
        <ok-image-cover :cover-size="OkCoverSize.medium"></ok-image-cover>
        <div class="card-header">
            <div class="columns is-gapless is-marginless has-padding-20 flex-direction-column has-width-100-percent">
                <div class="column has-margin-bottom-5">
                    <b-skeleton width="30%"></b-skeleton>
                </div>
                <div class="column has-margin-bottom-5">
                    <b-skeleton width="80%"></b-skeleton>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';
    import OkImageCover from '~/components/covers/image-cover/OkImageCover.vue';
    import { OkCoverSize } from '~/components/covers/lib/OkCoverSize';
    @Component({
        name: "OkPostLinkPreviewSkeleton",
        components: {OkImageCover}
    })
    export default class OkPostLinkPreviewSkeleton extends Vue {
        OkCoverSize = OkCoverSize;
    }
</script>
