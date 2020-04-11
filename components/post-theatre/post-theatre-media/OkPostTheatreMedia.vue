<template>
    <div class="has-background-black has-height-100-percent is-flex align-items-center justify-center has-width-100-percent ok-post-theatre-media-container">
        <div class="ok-post-theatre-media">
            <div class="is-background-contain" :style="{ backgroundImage: `url('${post.mediaThumbnail}')`}">
                <div v-if="postMedia.length > 0" class="ok-post-theatre-media-item-container">
                    <ok-post-theatre-media-image
                            :post-media="firstMediaItem"
                            v-if="hasImageMedia"
                    >

                    </ok-post-theatre-media-image>
                    <ok-post-theatre-media-video
                            :post-media="firstMediaItem"
                            v-else></ok-post-theatre-media-video>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-post-theatre-media-container {
        position: relative;
    }


    .ok-post-theatre-media {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        .video-js{
            height: 100%;
            width: 100%;
        }

        .video-player-box{
            height: 100%;
            width: 100%;
        }


        .ok-post-theatre-media-item-container{
            height: 100%;
            width: 100%;
        }

        .card-video{
            height: 100%;
            width: 100%;
        }

        .video{
            height: 100%;
            width: 100%;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import { PostMediaType } from '~/models/posts/post-media/lib/PostMediaType';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IUserService } from '~/services/user/IUserService';
    import { IPostMedia } from '~/models/posts/post-media/IPostMedia';
    import OkPostTheatreMediaImage
        from '~/components/post-theatre/post-theatre-media/components/OkPostTheatreMediaImage.vue';
    import OkPostTheatreMediaVideo
        from '~/components/post-theatre/post-theatre-media/components/OkPostTheatreMediaVideo.vue';

    @Component({
        name: "OkPostTheatreMedia",
        components: {OkPostTheatreMediaVideo, OkPostTheatreMediaImage},
    })
    export default class OkPostTheatreMedia extends Vue {
        @Prop(Object) readonly post: IPost;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);


        postMedia: IPostMedia[] = [];

        mounted() {
            this.refreshPostMedia();
        }

        refreshPostMedia() {
            this.userService.getPostMedia({
                post: this.post
            }).then((postMedia) => {
                this.post.media = postMedia;
                this.postMedia = postMedia;
            });
        }

        get hasImageMedia(): boolean {
            const imageItem = this.postMedia.find((mediaItem) => mediaItem.type === PostMediaType.image);
            return typeof imageItem !== "undefined";
        }

        get firstMediaItem() {
            if (this.postMedia.length === 0) return;
            return this.postMedia[0];
        }
    }
</script>
