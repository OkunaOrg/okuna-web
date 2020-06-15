<template>
    <ok-posts-stream
            v-if="loggedInUser"
            :posts-display-context="postsDisplayContext"
            :refresher="postsRefresher"
            :on-scroll-loader="postsOnScrollLoader"
            :post-container-class="postContainerClass"
    >
        <template v-slot:leading>
            <slot name="leading"></slot>
        </template>

    </ok-posts-stream>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPostsStream from "./OkPostsStream.vue";
    import { BehaviorSubject } from "rxjs";
    import { PostDisplayContext } from "../post/lib/PostDisplayContext";
    import { IUserService } from "~/services/user/IUserService";
    import { IUser } from "~/models/auth/user/IUser";
    import { IHashtag } from '~/models/common/hashtag/IHashtag';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IPost } from '~/models/posts/post/IPost';

    @Component({
        name: "OkHashtagPostsStream",
        components: {OkPostsStream},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkHashtagPostsStream extends Vue {
        static hashtagScrollChunkPostsCount = 10;

        @Prop({
            type: Object,
            required: true
        }) readonly hashtag: IHashtag;


        @Prop({
            type: String,
            required: false,
            default: ""
        }) readonly postContainerClass: string;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        postsDisplayContext = PostDisplayContext.timelinePosts;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        postsRefresher(): Promise<IPost[]> {
            return this.userService.getHashtagPosts({
                hashtag: this.hashtag,
                appendAuthorizationTokenIfExists: true,
            });
        }

        postsOnScrollLoader(posts: IPost[]) {
            const lastPost = posts[posts.length - 1];
            const lastPostId = lastPost.id;


            return this.userService.getHashtagPosts({
                hashtag: this.hashtag,
                maxId: lastPostId,
                count: OkHashtagPostsStream.hashtagScrollChunkPostsCount,
                appendAuthorizationTokenIfExists: true,
            })
        }

    }
</script>



