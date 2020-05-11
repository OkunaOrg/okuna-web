<template>
    <section class="is-flex flex-column align-items-center">
        <ok-posts-stream
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

    @Component({
        name: "OkTopPostsStream",
        components: { OkPostsStream }
    })
    export default class OkTopPostsStream extends Vue {
        static infiniteScrollChunkPostsCount = 10;

        @Prop({
            type: String,
            required: false,
            default: ''
        }) readonly postContainerClass: string;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        postDisplayContext = PostDisplayContext.topPosts;

        postsRefresher(): Promise<IPost[]> {
            return this.userService.getTopPosts({
                count: OkTopPostsStream.infiniteScrollChunkPostsCount,
            });
        }

        postsOnScrollLoader(posts: IPost[]) {
            const lastPost = posts[posts.length - 1];
            const lastPostId = lastPost.id;

            return this.userService.getTopPosts({
                maxId: lastPostId,
                count: OkTopPostsStream.infiniteScrollChunkPostsCount,
            });
        }
    }
</script>
