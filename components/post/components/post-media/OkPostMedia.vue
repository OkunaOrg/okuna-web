<template>
    <div
        class="ok-post-media"
        :style="{width: postElementWidth + 'px', height: mediaContainerHeight + 'px', backgroundImage: `url('${post.mediaThumbnail}')`}"
        @click="onWantsToExpandPost"
    >
        <div v-if="postMedia.length > 0" class="ok-post-media-item-container">
            <ok-post-media-image
                    :post-media="firstMediaItem"
                    v-if="hasImageMedia"
                    :post-display-context="postDisplayContext"
                    :media-height="mediaContainerHeight"
                    :media-width="postElementWidth"
            >

            </ok-post-media-image>
            <ok-post-media-video
                    :post-media="firstMediaItem"
                    :is-responsive="videoIsResponsive"
                    :media-height="mediaContainerHeight"
                    :media-width="postElementWidth"
                    :post-uuid="post.uuid"
                    v-else></ok-post-media-video>

            <ok-post-media-cropped-icon v-if="displayCroppedIcon"></ok-post-media-cropped-icon>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-post-media {
        max-height: 70vh;
        overflow-y: hidden;
        background-position-y: center;
        background-size: 100%;
        cursor: pointer;

        .ok-post-media-item-container {
            position: relative;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkPostMediaImage from "~/components/post/components/post-media/components/OkPostMediaImage.vue";
    import { PostMediaType } from "~/models/posts/post-media/lib/PostMediaType";
    import { IPostMedia } from "~/models/posts/post-media/IPostMedia";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { IModalService } from "~/services/modal/IModalService";
    import { okunaContainer } from "~/services/inversify";
    import OkPostMediaVideo from "~/components/post/components/post-media/components/OkPostMediaVideo.vue";
    import { PostDisplayContext } from '~/components/post/lib/PostDisplayContext';
    import OkFittedImg from '~/components/images/OkContainedImage.vue';
    import OkPostMediaCroppedIcon from '~/components/post/components/post-media/components/OkPostMediaCroppedIcon.vue';

    @Component({
        name: "OkPostMedia",
        components: {OkFittedImg, OkPostMediaVideo, OkPostMediaImage, OkPostMediaCroppedIcon},
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

        @Prop(Number) readonly postElementWidth: number;


        @Prop({
            type: Boolean,
            default: false
        }) readonly videoIsResponsive: boolean;

        @Prop(Number) readonly postDisplayContext: PostDisplayContext;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        postMedia: IPostMedia[] = [];
        displayCroppedIcon: boolean = false;

        mounted() {
            this.refreshPostMedia();
            this.displayCroppedIcon = window.innerHeight * 0.7 < this.mediaContainerHeight;
        }

        refreshPostMedia() {
            this.userService.getPostMedia({
                post: this.post
            }).then((postMedia) => {
                this.post.media = postMedia;
                this.postMedia = postMedia;
            });
        }

        get mediaContainerHeight(){
            const thumbnailAspectRatio = this.post.mediaWidth / this.post.mediaHeight;
            return this.postElementWidth / thumbnailAspectRatio;
        }

        get hasImageMedia(): boolean {
            const imageItem = this.postMedia.find((mediaItem) => mediaItem.type === PostMediaType.image);
            return typeof imageItem !== "undefined";
        }

        get firstMediaItem() {
            if (this.postMedia.length === 0) return;
            return this.postMedia[0];
        }

        onWantsToExpandPost(e: Event) {
            const element = e.target as HTMLElement;
            if (element?.closest('.vjs-control-bar')) {
                // User clicked on a videojs control item, don't show modal in this scenario.
                return;
            }

            this.modalService.openPostModal({
                post: this.post
            });
        }
    }
</script>
