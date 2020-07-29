<template>
    <div>
        <ok-post-link-preview-card v-if="preview" :preview="preview" :url="url"></ok-post-link-preview-card>
        <ok-post-link-preview-skeleton v-else></ok-post-link-preview-skeleton>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkPostLinkPreviewCard from '~/components/post/components/post-link-preview/components/OkPostLinkPreviewCard.vue';
    import OkPostLinkPreviewSkeleton from '~/components/skeletons/post/OkPostLinkPreviewSkeleton.vue';
    import getLinkMetadata, { LinkPreview } from '~/components/post/components/post-link-preview/lib/GetLinkMetadata';

    function truncateTitle(str: string): string {
        if (str.length > 60 - 3) {
            return `${str}...`;
        }

        return str;
    }

    @Component({
        name: "OkPostLinkPreview",
        components: {OkPostLinkPreviewCard, OkPostLinkPreviewSkeleton}
    })
    export default class OkPostLinkPreview extends Vue {
        @Prop({
            type: String,
            required: true
        }) readonly url: string;

        preview: LinkPreview | null = null;

        async created () {
            this.preview = await getLinkMetadata(this.url);
            if (!this.preview) {
                this.preview = {
                    title: truncateTitle(this.url),
                    domainUrl: new URL(this.url).hostname
                };
            }
        }
    }
</script>
