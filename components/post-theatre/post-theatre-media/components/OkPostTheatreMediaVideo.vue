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

            console.log(this.postVideo.thumbnail);

            return {
                muted: true,
                language: "en",
                loop: true,
                autoplay: true,
                fluid: true,
                sources: [{
                    type: "video/mp4",
                    src: postVideoMp4Format.file
                }],
                poster: this.postVideo.thumbnail
            };
        }
    }
</script>
