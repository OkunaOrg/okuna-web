<template>
    <div class="has-background-black has-height-100-percent is-flex align-items-center justify-center has-width-100-percent ok-post-theatre-media-container">
        <div class="ok-post-theatre-media">
            <figure class="has-height-100-percent has-width-100-percent" v-if="postMedia.length > 0">
                <ok-post-media-image :post-media="firstMediaItem" v-if="hasImageMedia"></ok-post-media-image>
                <ok-post-media-video :post-media="firstMediaItem" v-else></ok-post-media-video>
            </figure>
            <div v-else class="has-height-100-percent has-width-100-percent">
                <figure class="has-height-100-percent has-width-100-percent is-flex justify-center">
                    <img :src="post.mediaThumbnail" alt="Post thumbnail" class="has-height-100-percent has-width-auto">
                </figure>
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
    }

    .video-js{
        height: 100%;
        width: 100%;
    }

    .video-player-box{
        height: 100%;
        width: 100%;
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

    @Component({
        name: "OkPostTheatreMedia",
        components: {OkPostMediaImage, OkPostMediaVideo, OkPostMedia},
    })
    export default class OkPostTheatreMedia extends Vue {
        @Prop(Object) readonly post: IPost;
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
