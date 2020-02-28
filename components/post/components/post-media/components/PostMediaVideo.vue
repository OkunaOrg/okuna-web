<template>
    <div class="card-video has-height-100-percent has-width-100-percent">
        <figure class="video has-height-100-percent has-width-100-percent">
            <video-player class="video-player-box"
                          ref="videoPlayer"
                          :options="videoPlayerOptions"
                          :playsinline="true">
            </video-player>
        </figure>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPostMedia } from "~/models/posts/post-media/IPostMedia";
    import { IPostVideo } from "~/models/posts/post-video/IPostVideo";

    @Component({
        name: "OkPostMediaVideo",

    })
    export default class extends Vue {
        @Prop(Object) readonly postMedia: IPostMedia;

        mounted() {
        }

        get postVideo(): IPostVideo {
            return this.postMedia.contentObject as IPostVideo;
        }

        get videoPlayerOptions() {

            const postVideoFormatSet = this.postVideo.formatSet;
            const postVideoMp4Format = postVideoFormatSet.find((formatSet) => formatSet.format === "mp4_sd");


            return {
                muted: true,
                language: "en",
                loop: true,
                autoplay: true,
                fluid: false,
                sources: [{
                    type: "video/mp4",
                    src: postVideoMp4Format.file
                }],
                poster: this.postVideo.thumbnail
            };
        }
    }
</script>
