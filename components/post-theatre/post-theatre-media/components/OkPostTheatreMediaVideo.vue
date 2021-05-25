<template>
    <div class="ok-post-theatre-media-video card-video">
        <figure class="video">
            <video-player class="video-player-box"
                          ref="videoPlayer"
                          :options="videoPlayerOptions"
                          :playsinline="true">
            </video-player>
        </figure>
    </div>
</template>

<style lang="scss">
    .ok-post-theatre-media-video{
        .video-player-box{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPostMedia } from "~/models/posts/post-media/IPostMedia";
    import { IPostVideo } from "~/models/posts/post-video/IPostVideo";

    @Component({
        name: "OkPostTheatreMediaVideo",

    })
    export default class OkPostTheatreMediaVideo extends Vue {
        @Prop(Object) readonly postMedia: IPostMedia;

        @Prop(Number) readonly mediaWidth: number;
        @Prop(Number) readonly mediaHeight: number;

        isLoading = true;

        mounted() {
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
                autoplay: true,
                sources: [{
                    type: "video/mp4",
                    src: postVideoMp4Format.file
                }],
                poster: this.postVideo.thumbnail
            };
        }
    }
</script>
