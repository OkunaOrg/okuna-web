<template>
    <div class="card ok-has-background-primary has-overflow-hidden">
        <div class="ok-has-border-bottom-primary-highlight">
            <ok-tile>
                <template v-slot:leading v-if="firstMediaIsImage">
                    <ok-image-avatar :avatarUrl="postUpload.firstMediaSrc" :imageFit="OkImageFit.covered"/>
                </template>

                <template v-slot:leading v-else-if="firstMediaIsVideo">
                    <figure class="image is-32x32 is-semi-rounded">
                        <video :src="postUpload.firstMediaSrc" style="height: 100%; width: 100%; object-fit: cover;">
                            X
                        </video>
                    </figure>
                </template>

                <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{statusText}}
                    </span>
                </template>

                <template v-slot:trailing>
                    <div class="columns is-mobile">
                        <div class="column has-cursor-pointer is-flex align-items-center justify-center"
                             v-if="postUpload.status === OkPostUploadStatus.error"
                             role="button"
                             @click="retryUpload"
                        >
                            <ok-refresh-icon
                                    class="ok-svg-icon-primary-invert is-icon-2x"></ok-refresh-icon>
                        </div>
                        <div class="column has-cursor-pointer is-flex align-items-center justify-center"
                             v-if="postUpload.status === OkPostUploadStatus.error || postUpload.status === OkPostUploadStatus.addingPostMedia"
                             role="button"
                             @click="cancelUpload"
                        >
                            <ok-close-icon
                                    class="ok-svg-icon-primary-invert is-icon-2x"></ok-close-icon>
                        </div>
                    </div>
                </template>
            </ok-tile>
        </div>
    </div>
</template>

<style lang="scss">

</style>


<script lang="ts">
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
    import { OkPostUpload, OkPostUploadStatus } from "../../services/post-uploader/lib/OkPostUpload";
    import OkImageAvatar from "../avatars/image-avatar/OkImageAvatar.vue";
    import { IUtilsService } from "../../services/utils/IUtilsService";
    import { okunaContainer } from "../../services/inversify";
    import { TYPES } from "../../services/inversify-types";
    import OkTile from "~/components/tiles/OkTile.vue";
    import { OkFileType } from "~/services/media/IMediaService";
    import { OkImageFit } from "~/components/images/OkImageFit";

    @Component({
        name: "OkPostUploadCard",
        components: {
            OkTile,
            OkImageAvatar
        },
    })
    export default class OkPostUploadCard extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly postUpload: OkPostUpload;


        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        OkImageFit = OkImageFit;
        OkPostUploadStatus=OkPostUploadStatus;

        @Watch("postUpload.status")
        onChildChanged(status: OkPostUploadStatus, oldStatus: OkPostUploadStatus) {
            this.$emit("onPostUploadStatusChange", status, this.postUpload);
        }

        cancelUpload(){
            this.postUpload.cancel();
        }

        retryUpload(){
            this.postUpload.retry();
        }

        get hasRetryButton() {
            return this.postUpload.status === OkPostUploadStatus.error;
        }

        get firstMediaIsImage() {
            return this.postUpload.firstMedia?.type === OkFileType.image;
        }

        get firstMediaIsVideo() {
            return this.postUpload.firstMedia?.type === OkFileType.video;
        }


        get statusText() {

            let statusText;
            switch (this.postUpload.status) {
                case  OkPostUploadStatus.idle:
                    statusText = this.$t("global.keywords.waiting") + "...";
                    break;
                case  OkPostUploadStatus.creatingPost:
                    statusText = this.$t("global.snippets.creating_post") + "...";
                    break;
                case  OkPostUploadStatus.addingPostMedia:
                    statusText = this.$t("global.snippets.uploading_media") + "...";
                    break;
                case  OkPostUploadStatus.publishing:
                    statusText = this.$t("global.snippets.publishing_post") + "...";
                    break;
                case  OkPostUploadStatus.processing:
                    statusText = this.$t("global.snippets.processing_media") + "...";
                    break;
                case  OkPostUploadStatus.published:
                    statusText = this.$t("global.keywords.published");
                    break;
                case  OkPostUploadStatus.cancelled:
                    statusText = this.$t("global.keywords.cancelled");
                    break;
                case  OkPostUploadStatus.error:
                    statusText = this.utilsService.handleError(this.postUpload.error).humanFriendlyMessage;
                    break;
            }

            return statusText;
        }

    }
</script>



