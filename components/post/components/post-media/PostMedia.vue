<template>
    <div class="card-image">
        <figure class="image" v-if="postMedia.length > 0">
            <ok-post-media-image :post-media="firstMediaItem" v-if="hasImageMedia"></ok-post-media-image>
            <ok-post-media-video :post-media="firstMediaItem" v-else></ok-post-media-video>
        </figure>

        <figure class="image" v-else>
            <img :src="post.mediaThumbnail" alt="Post thumbnail">
        </figure>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkPostMediaImage from "~/components/post/components/post-media/components/PostMediaImage.vue";
    import { PostMediaType } from "~/models/posts/post-media/lib/PostMediaType";
    import { IPostMedia } from "~/models/posts/post-media/IPostMedia";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import OkPostMediaVideo from "~/components/post/components/post-media/components/PostMediaVideo.vue";

    @Component({
        name: "OkPostMedia",
        components: {OkPostMediaVideo, OkPostMediaImage},
    })
    export default class extends Vue {
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
