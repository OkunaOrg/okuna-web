<template>
    <div class="ok-post-media-preview ok-has-background-primary-highlight is-semi-rounded is-relative ok-has-border-primary-highlight has-overflow-visible">
        <template v-if="mediaItem">
            <template v-if="mediaItem.type === OkFileType.image">
                <ok-covered-image :src="previewSrc"/>
            </template>
            <template v-else="mediaItem.type === OkFileType.video">
                <video :src="previewSrc" class="ok-video-preview">
                    Your browser does not support the video tag.
                </video>
                <div class="ok-video-preview-icon">
                    <ok-play-circle
                            class="is-icon-3x"></ok-play-circle>
                </div>
            </template>
        </template>
        <template v-else-if="postMediaThumbnail">
            <ok-covered-image :src="postMediaThumbnail"/>
        </template>
        <div class="ok-post-media-preview-actions" v-if="!postMediaThumbnail">
            <div class="ok-post-media-preview-action ok-post-media-preview-action--close has-cursor-pointer"
                 role="button"
                 :aria-label="$t('globals.keywords.remove')"
                 @click="$emit('onWantsToRemoveFile')"
            >
                <ok-close-icon
                        class="is-icon-2x"></ok-close-icon>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    $post-media-preview-size: 180px;

    .ok-post-media-preview {
        height: $post-media-preview-size;
        width: $post-media-preview-size;
    }

    .ok-video-preview {
        height: 100%;
        object-fit: cover;
        width: 100%;
    }

    .ok-video-preview-icon {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.2);
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        & svg {
            fill: white !important;
        }
    }

    $action-button-size: 30px;

    .ok-post-media-preview-actions {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .ok-post-media-preview-action {
        width: $action-button-size;
        height: $action-button-size;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 500px;
        display: flex;
        justify-content: center;
        align-items: center;

        & svg {
            fill: white !important;
        }
    }


    .ok-post-media-preview-action--close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: $action-button-size;
        height: $action-button-size;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
    import { OkFile, OkFileType } from "~/services/media/IMediaService";
    import OkCoveredImage from "~/components/images/OkCoveredImage.vue";
    import { OkPostStudioData } from "~/components/post-studio/lib/OkPostCreatorTypes";

    @Component({
        name: "OkPostStudioMediaPreview",
        components: {OkCoveredImage},
    })
    export default class OkPostStudioMediaPreview extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly data: OkPostStudioData;


        OkFileType = OkFileType;


        get previewSrc() {
            let src;
            if (this.mediaItem) {
                src = URL.createObjectURL(this.mediaItem.file);
            } else if (this.data.post && this.data.post.mediaThumbnail) {
                src = this.data.post.mediaThumbnail;
            } else {
                throw new Error("No data available to preview");
            }

            return src;
        }

        get mediaItem() {
            if (this.data.media && this.data.media.length > 0) return this.data.media[0];
        }

        get postMediaThumbnail() {
            if (this.data.post && this.data.post.mediaThumbnail) return this.data.post.mediaThumbnail;
        }

    }
</script>
