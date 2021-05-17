<template>
    <ok-post-theatre :post="params.post"></ok-post-theatre>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { PostModalParams } from '~/services/modal/IModalService';
    import { IVideoPlaybackService } from "~/services/video-playback/IVideoPlaybackService";

    @Component({
        name: "OkPostModal",
        components: {OkPostTheatre},
    })
    export default class OkPostModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: PostModalParams;

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        private videoPlaybackService: IVideoPlaybackService = okunaContainer.get<IVideoPlaybackService>(TYPES.VideoPlaybackService);

        mounted() {
            if (this.params.post) {
                this.videoPlaybackService.stopWithPostUuid(this.params.post.uuid);
            }
        }

        destroyed() {
            if (this.params.post) {
                this.videoPlaybackService.startWithPostUuid(this.params.post.uuid);
            }
        }
    }
</script>
