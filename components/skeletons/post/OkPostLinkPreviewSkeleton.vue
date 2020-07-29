<template>
    <div class="card ok-has-background-primary-highlight has-overflow-hidden">
        <ok-post-link-preview-cover></ok-post-link-preview-cover>
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
    import OkPostLinkPreviewCover from '~/components/post/components/post-link-preview/components/OkPostLinkPreviewCover.vue';

    @Component({
        name: "OkPostLinkPreviewSkeleton",
        components: {OkPostLinkPreviewCover}
    })
    export default class OkPostLinkPreviewSkeleton extends Vue {}
</script>
