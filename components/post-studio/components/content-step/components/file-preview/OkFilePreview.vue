<template>
    <div class="ok-file-preview ok-has-background-primary-highlight is-semi-rounded is-relative ok-has-border-primary-highlight has-overflow-visible">
        <template v-if="file.type === OkFileType.image">
            <ok-covered-image :src="fileSrc"/>
        </template>
        <template v-else="file.type === OkFileType.video">
            <video :src="fileSrc" class="ok-video-preview">
                Your browser does not support the video tag.
            </video>
            <div class="ok-video-preview-icon">
                <ok-play-circle
                        class="is-icon-3x"></ok-play-circle>
            </div>
        </template>
        <div class="ok-file-preview-actions">
            <div class="ok-file-preview-action ok-file-preview-action--close has-cursor-pointer"
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

    $file-preview-size: 180px;

    .ok-file-preview {
        height: $file-preview-size;
        width: $file-preview-size;
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

    .ok-file-preview-actions {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .ok-file-preview-action {
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


    .ok-file-preview-action--close {
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

    @Component({
        name: "OkFilePreview",
        components: {OkCoveredImage},
    })
    export default class OkFilePreview extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly file: OkFile;


        imgSrc: string = "";

        OkFileType = OkFileType;


        get fileSrc() {
            return URL.createObjectURL(this.file.file);
        }

    }
</script>
