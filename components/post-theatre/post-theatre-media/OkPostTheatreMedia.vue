<template>
    <div class="has-background-black has-height-100-percent is-flex align-items-center justify-center has-width-100-percent ok-post-theatre-media-container">
        <div class="ok-post-theatre-media">
            <ok-post-media :post="post" :video-is-responsive="false" :post-display-context="PostDisplayContext.postTheatre" class="has-width-100-percent has-height-100-percent"></ok-post-media>
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

        .ok-post-media-placeholder, .ok-post-media-image{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            img{
                height: 100% !important;
                width: unset !important;
            }
        }

        .video-js{
            height: 100%;
            width: 100%;
        }

        .video-player-box{
            height: 100%;
            width: 100%;
        }

        .ok-post-media{
            height: 100%;
            width: 100%;
        }

        .ok-post-media-item-container{
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
    import OkPostMedia from "~/components/post/components/post-media/PostMedia.vue";
    import OkPostMediaVideo from "~/components/post/components/post-media/components/PostMediaVideo.vue";
    import { PostMediaType } from '~/models/posts/post-media/lib/PostMediaType';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IUserService } from '~/services/user/IUserService';
    import { IPostMedia } from '~/models/posts/post-media/IPostMedia';
    import OkPostMediaImage from '~/components/post/components/post-media/components/PostMediaImage.vue';
    import { PostDisplayContext } from '~/components/post/lib/PostDisplayContext';

    @Component({
        name: "OkPostTheatreMedia",
        components: {OkPostMediaImage, OkPostMediaVideo, OkPostMedia},
    })
    export default class OkPostTheatreMedia extends Vue {
        @Prop(Object) readonly post: IPost;
        PostDisplayContext= PostDisplayContext;
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
