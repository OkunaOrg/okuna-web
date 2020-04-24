<template>
    <div>
        <div v-for="post in posts" :key="post.id" :class="postContainerClass">
            <!-- Hacker News item loop -->
            <ok-post :post="post" :post-display-context="postsDisplayContext"></ok-post>
        </div>

        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkPost from "~/components/post/OkPost.vue";
    import { PostDisplayContext } from "~/components/post/lib/PostDisplayContext";
    import {
        OkPostsStreamOnScrollLoader,
        OkPostsStreamRefresher
    } from "~/components/posts-stream/lib/OkPostsStreamParams";
    import { IUtilsService } from '~/services/utils/IUtilsService';
    import { TYPES } from '~/services/inversify-types';
    import { okunaContainer } from '~/services/inversify';

    @Component({
        name: "OkPostsStream",
        components: {OkPost},
    })
    export default class OkPostsStream extends Vue {
        @Prop({
            type: Function,
            required: true
        }) readonly refresher: OkPostsStreamRefresher;

        @Prop({
            type: Function,
            required: true
        }) readonly onScrollLoader: OkPostsStreamOnScrollLoader;


        @Prop({
            type: Number,
            required: true
        }) readonly postsDisplayContext: PostDisplayContext;

        @Prop({
            type: String,
            required: false,
            default: ''
        }) readonly postContainerClass: string;

        posts: IPost[] = [];

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        async infiniteHandler($vueInfiniteLoadingState) {
            try {
                let posts;
                if (this.posts.length) {
                    // Load more
                    posts = await this.onScrollLoader(this.posts);
                } else {
                    // Initial refresh
                    posts = await this.refresher();
                }

                if (posts) {
                    this.posts.push(...posts);
                    $vueInfiniteLoadingState.loaded();
                } else {
                    $vueInfiniteLoadingState.complete();
                }
            } catch (error) {
                $vueInfiniteLoadingState.error();
                this.utilsService.handleErrorWithToast(error);
            }
        }

    }
</script>



