<template>
    <div v-if="uploads">
        <div class="ok-post-upload-card"
             v-for="postUpload in displayedUploads"
             :key="postUpload.id">
            <ok-post-upload-card
                    @onPostUploadStatusChange="onPostUploadStatusChange"
                    :postUpload="postUpload"
            />
        </div>
    </div>
</template>

<style lang="scss">
    .ok-post-upload-card:not(:last-child) {
        padding-bottom: 20px;
    }
</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { IPostUploaderService } from "~/services/post-uploader/IPostSubmitterService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import OkPostUploadCard from "~/components/cards/OkPostUploadCard.vue";
    import { OkPostUpload, OkPostUploadStatus } from "~/services/post-uploader/lib/OkPostUpload";
    import { BehaviorSubject } from "~/node_modules/rxjs";

    @Component({
        name: "OkTimelinePostUploads",
        components: {OkPostUploadCard},
        subscriptions: function () {
            return {
                uploads: this["postUploaderService"].uploads
            }
        },
    })
    export default class OkTimelinePostUploads extends Vue {
        private postUploaderService: IPostUploaderService = okunaContainer.get<IPostUploaderService>(TYPES.PostUploaderService);
        OkPostUploadStatus = OkPostUploadStatus;

        $observables!: {
            uploads: BehaviorSubject<OkPostUpload[]>
        };

        private displayedUploads = [];

        created() {
            this.$observables.uploads.subscribe(this.onUploadsChange);
        }

        onPostUploadStatusChange(status: OkPostUploadStatus, postUpload: OkPostUpload) {
            if (status === OkPostUploadStatus.published) {
                this.$emit("onPostUploaded", postUpload.createdPost);
            }

            if ([OkPostUploadStatus.cancelled, OkPostUploadStatus.published].includes(status)) {
                // Remove it from the list
                this.removeDisplayedUpload(postUpload);
            }
        }

        private onUploadsChange(uploads: OkPostUpload[]) {
            this.displayedUploads = uploads.filter((upload) => upload.status !== OkPostUploadStatus.published);
        }

        private removeDisplayedUpload(postUpload: OkPostUpload) {
            const index = this.displayedUploads.indexOf(postUpload);
            if (index > -1) {
                this.displayedUploads.splice(index, 1);
            }
        }

    }
</script>



