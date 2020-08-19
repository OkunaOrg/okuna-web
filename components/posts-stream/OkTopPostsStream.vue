<template>
    <section class="is-flex flex-column align-items-center">
        <ok-posts-stream
                ref="postsStream"
                :refresher="postsRefresher"
                :on-scroll-loader="postsOnScrollLoader"
                :post-container-class="postContainerClass"
                :post-display-context="postDisplayContext"
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
    import { PostDisplayContext } from "~/components/post/lib/PostDisplayContext";
    import { ITopPost } from "~/models/posts/top-post/ITopPost";

    @Component({
        name: "OkTopPostsStream",
        components: {OkPostsStream}
    })
    export default class OkTopPostsStream extends Vue {
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
        private topPosts: ITopPost[] = [];

        postDisplayContext = PostDisplayContext.topPosts;

        async postsRefresher(): Promise<IPost[]> {
            const initialTopPosts = await this.userService.getTopPosts({
                count: OkTopPostsStream.infiniteScrollChunkPostsCount,
            });

            this.topPosts = initialTopPosts;

            return initialTopPosts.map(topPost => topPost.post);
        }

        async postsOnScrollLoader(): Promise<IPost[]> {
            const lastPost = this.topPosts[this.topPosts.length - 1];
            const lastPostId = lastPost.id;

            const newTopPosts = await this.userService.getTopPosts({
                maxId: lastPostId,
                count: OkTopPostsStream.infiniteScrollChunkPostsCount,
            });

            this.topPosts.push(...newTopPosts);

            return newTopPosts.map(topPost => topPost.post);
        }

        refresh() {
            this.$refs.postsStream.refresh();
        }
    }
</script>
