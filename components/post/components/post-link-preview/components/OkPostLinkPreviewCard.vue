<template>
    <div class="card ok-link-preview ok-has-background-primary-highlight has-overflow-hidden">
        <a :href="url" target="_blank">
            <ok-post-link-preview-cover
                :cover-url="preview.imageUrl"
                v-if="preview.imageUrl"
            ></ok-post-link-preview-cover>
            <div class="card-header">
                <div class="columns is-gapless is-marginless has-padding-20 flex-direction-column website-info-rows">
                    <div class="column has-margin-bottom-5">
                        <div class="media has-overflow-hidden is-flex align-items-center">
                            <div class="media-left has-margin-right-10" v-if="preview.faviconUrl">
                                <figure class="image is-16x16">
                                    <img :src="preview.faviconUrl" :alt="preview.domainUrl" />
                                </figure>
                            </div>
                            <div class="media-content ok-has-text-primary-invert-80 website-address" v-if="preview.domainUrl">
                                {{ preview.domainUrl }}
                            </div>
                        </div>
                    </div>
                    <div class="column ok-has-text-primary-invert has-margin-bottom-5 has-text-weight-bold" v-if="preview.title">
                        {{ title }}
                    </div>
                    <div class="column ok-has-text-primary-invert-80 website-description" v-if="preview.description">
                        {{ description }}
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<style lang="scss">
    .ok-link-preview {
        .website-address {
            font-size: 0.75em;
            text-transform: uppercase;
        }

        .website-description {
            font-size: 0.85em;
        }

        .website-info-rows {
            .column:last-child {
                margin-bottom: 0 !important;
            }
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkPostLinkPreviewCover from '~/components/post/components/post-link-preview/components/OkPostLinkPreviewCover.vue';
    import truncate from '~/lib/truncate';
    import { LinkPreview } from '~/components/post/components/post-link-preview/lib/GetLinkMetadata';

    @Component({
        name: "OkPostLinkPreview",
        components: {OkPostLinkPreviewCover}
    })
    export default class OkPostLinkPreview extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly preview: LinkPreview;

        @Prop({
            type: String,
            required: true
        }) readonly url: string;

        get description() {
            return truncate(this.preview.description, 265);
        }

        get title() {
            return truncate(this.preview.title, 150);
        }
    }
</script>
