<template>
    <section class="is-flex flex-column align-items-center">
        <ok-posts-stream
            :refresher="postsRefresher"
            :on-scroll-loader="postsOnScrollLoader"
            :post-container-class="postContainerClass"
        ></ok-posts-stream>
    </section>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import OkPostsStream from "~/components/posts-stream/OkPostsStream.vue";
    import { IUserService } from "../../services/user/IUserService";
    import { okunaContainer } from "../../services/inversify";
    import { TYPES } from "../../services/inversify-types";
    import { IPost } from "../../models/posts/post/IPost";

    @Component({
        name: "OkTrendingPostsStream",
        components: { OkPostsStream }
    })
    export default class OkTrendingPostsStream extends Vue {
        static infiniteScrollChunkPostsCount = 10;

        @Prop({
            type: String,
            required: false,
            default: ''
        }) readonly postContainerClass: string;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        postsRefresher(): Promise<IPost[]> {
            return this.userService.getTrendingPosts({
                count: OkTrendingPostsStream.infiniteScrollChunkPostsCount,
            });
        }

        postsOnScrollLoader(posts: IPost[]) {
            const lastPost = posts[posts.length - 1];
            const lastPostId = lastPost.id;

            return this.userService.getTrendingPosts({
                maxId: lastPostId,
                count: OkTrendingPostsStream.infiniteScrollChunkPostsCount,
            });
        }
    }
</script>
