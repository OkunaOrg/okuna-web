<template>
    <div class="card ok-link-preview ok-has-background-primary-highlight has-overflow-hidden">
        <a :href="url" target="_blank">
            <ok-image-cover
                :cover-url="preview.imageUrl"
                v-if="preview.imageUrl"
                :cover-size="OkCoverSize.medium"
            ></ok-image-cover>
            <div class="card-header">
                <div class="columns is-gapless is-marginless has-padding-20 flex-direction-column website-info-rows">
                    <div class="column has-margin-bottom-5">
                        <div class="columns is-gapless is-marginless">
                            <div class="column is-narrow has-margin-right-10" v-if="preview.faviconUrl">
                                <img :src="preview.faviconUrl" width="16px" height="16px" :alt="preview.domainUrl" />
                            </div>
                            <div class="column is-narrow ok-has-text-primary-invert-80 website-address" v-if="preview.domainUrl">
                                {{ preview.domainUrl }}
                            </div>
                        </div>
                    </div>
                    <div class="column ok-has-text-primary-invert has-margin-bottom-5 has-text-weight-bold" v-if="preview.title">
                        {{ preview.title }}
                    </div>
                    <div class="column ok-has-text-primary-invert-80 website-description" v-if="preview.description">
                        {{ preview.description }}
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
    import OkImageCover from '~/components/covers/image-cover/OkImageCover.vue';
    import { OkCoverSize } from '~/components/covers/lib/OkCoverSize';
    import { LinkPreview } from '~/components/post/components/post-link-preview/lib/GetLinkMetadata';

    @Component({
        name: "OkPostLinkPreview",
        components: {OkImageCover}
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

        OkCoverSize = OkCoverSize;
    }
</script>
