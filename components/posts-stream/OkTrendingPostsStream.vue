<template>
    <section class="is-flex flex-column align-items-center">
        <ok-posts-stream
                ref="postsStream"
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
    import { ITrendingPost } from "~/models/posts/trending-post/ITrendingPost";

    @Component({
        name: "OkTrendingPostsStream",
        components: {OkPostsStream}
    })
    export default class OkTrendingPostsStream extends Vue {
        static infiniteScrollChunkPostsCount = 10;

        @Prop({
            type: String,
            required: false,
            default: ""
        }) readonly postContainerClass: string;

        $refs: {
            postsStream: OkPostsStream
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private trendingPosts: ITrendingPost[] = [];

        async postsRefresher(): Promise<IPost[]> {
            const initialTrendingPosts = await this.userService.getTrendingPosts({
                count: OkTrendingPostsStream.infiniteScrollChunkPostsCount,
            });

            this.trendingPosts = initialTrendingPosts;

            return initialTrendingPosts.map(trendingPost => trendingPost.post);
        }

        async postsOnScrollLoader(): Promise<IPost[]> {
            const lastPost = this.trendingPosts[this.trendingPosts.length - 1];
            const lastPostId = lastPost.id;

            const newTrendingPosts = await this.userService.getTrendingPosts({
                maxId: lastPostId,
                count: OkTrendingPostsStream.infiniteScrollChunkPostsCount,
            });

            this.trendingPosts.push(...newTrendingPosts);

            return newTrendingPosts.map(trendingPost => trendingPost.post);
        }

        refresh() {
            this.$refs.postsStream.refresh();
        }
    }
</script>
