<template>
    <figure class="ok-post-media-video is-background-contain"
            :style="{backgroundImage: `url('${postVideo.thumbnail}')`}"
    >
        <video-player class="video-player-box"
                      :class="{'is-hidden': isLoading} "
                      ref="videoPlayer"
                      :options="videoPlayerOptions"
                      :style="{width: mediaWidth + 'px', height: mediaHeight + 'px', backgroundImage: `url('${postVideo.thumbnail}')`}"
                      @ready="onVideoIsReady"
                      :id="`video-${postUuid}`"
                      :playsinline="true">
        </video-player>
    </figure>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPostMedia } from "~/models/posts/post-media/IPostMedia";
    import { IPostVideo } from "~/models/posts/post-video/IPostVideo";

    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IVideoPlaybackService } from '~/services/video-playback/IVideoPlaybackService';

    @Component({
        name: "OkPostMediaVideo",

    })
    export default class extends Vue {
        @Prop(Object) readonly postMedia: IPostMedia;

        @Prop({
            type: Boolean,
            default: true
        }) readonly isResponsive: boolean;

        @Prop(Number) readonly mediaWidth: number;
        @Prop(Number) readonly mediaHeight: number;
        @Prop(String) readonly postUuid: string;

        isLoading = true;

        private videoPlaybackService: IVideoPlaybackService = okunaContainer.get<IVideoPlaybackService>(TYPES.VideoPlaybackService);

        mounted() {
            this.videoPlaybackService.addPlayer(this.$refs.videoPlayer);
        }

        beforeDestroy() {
            this.videoPlaybackService.removePlayer(this.$refs.videoPlayer);
        }

        get postVideo(): IPostVideo {
            return this.postMedia.contentObject as IPostVideo;
        }

        onVideoIsReady() {
            this.isLoading = false;
        }

        get videoPlayerOptions() {

            const postVideoFormatSet = this.postVideo.formatSet;
            const postVideoMp4Format = postVideoFormatSet.find((formatSet) => formatSet.format === "mp4_sd");

            return {
                muted: true,
                language: "en",
                loop: true,
                fill: true,
                sources: [{
                    type: "video/mp4",
                    src: postVideoMp4Format.file
                }],
                poster: this.postVideo.thumbnail
            };
        }
    }
</script>
