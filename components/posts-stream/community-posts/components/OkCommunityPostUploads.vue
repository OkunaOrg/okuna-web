<template>
    <div v-if="uploads">
        <div class="has-padding-bottom-20-tablet"
             v-for="postUpload in uploads.filter((upload)=>upload.belongsToCommunity(community))"
             :key="postUpload.id">
            <ok-post-upload-card
                    @onPostUploadStatusChange="onPostUploadStatusChange"
                    :postUpload="postUpload"
            />
        </div>
    </div>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPostUploaderService } from "~/services/post-uploader/IPostSubmitterService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import OkPostUploadCard from "~/components/cards/OkPostUploadCard.vue";
    import { OkPostUpload, OkPostUploadStatus } from "~/services/post-uploader/lib/OkPostUpload";
    import { ICommunity } from "~/models/communities/community/ICommunity";

    @Component({
        name: "OkCommunityPostUploads",
        components: {OkPostUploadCard},
        subscriptions: function () {
            return {
                uploads: this["postUploaderService"].uploads
            }
        },
    })
    export default class OkCommunityPostUploads extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        private postUploaderService: IPostUploaderService = okunaContainer.get<IPostUploaderService>(TYPES.PostUploaderService);

        onPostUploadStatusChange(status: OkPostUploadStatus, postUpload: OkPostUpload) {
            if (status === OkPostUploadStatus.published) {
                this.$emit("onPostUploaded", postUpload.createdPost);
            }

            if ([OkPostUploadStatus.cancelled, OkPostUploadStatus.published].includes(status)) {
                // Remove it from the list
                this.postUploaderService.removePostUpload(postUpload);
            }
        }

    }
</script>



