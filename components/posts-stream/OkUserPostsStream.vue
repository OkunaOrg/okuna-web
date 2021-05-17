<template>
    <ok-posts-stream
            :posts-display-context="postsDisplayContext"
            :refresher="postsRefresher"
            :on-scroll-loader="postsOnScrollLoader"
            :post-container-class="postContainerClass"
            ref="postsStream"
    >
        <template v-slot:leading>
            <ok-community-post-uploads @onPostUploaded="onPostUploaded" :user="user" />
        </template>
    </ok-posts-stream>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkPostsStream from "./OkPostsStream.vue";
    import { BehaviorSubject } from "rxjs";
    import { PostDisplayContext } from "../post/lib/PostDisplayContext";
    import { IUserService } from "../../services/user/IUserService";
    import { okunaContainer } from "../../services/inversify";
    import { TYPES } from "../../services/inversify-types";
    import { IPost } from "../../models/posts/post/IPost";
    import OkCommunityPostUploads
        from '~/components/posts-stream/community-posts/components/OkCommunityPostUploads.vue';

    @Component({
        name: "OkUserPostsStream",
        components: {OkPostsStream, OkCommunityPostUploads},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkUserPostsStream extends Vue {
        static infiniteScrollChunkPostsCount = 10;

        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;


        @Prop({
            type: String,
            required: false,
            default: ''
        }) readonly postContainerClass: string;


        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        $refs: {
            postsStream: OkPostsStream
        };

        postsDisplayContext = PostDisplayContext.foreignProfilePosts;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUserChanged);
        }

        postsRefresher(): Promise<IPost[]> {
            return this.userService.getTimelinePosts({
                username: this.user.username,
                count: OkUserPostsStream.infiniteScrollChunkPostsCount,
            });
        }

        postsOnScrollLoader(posts: IPost[]) {
            const lastPost = posts[posts.length - 1];
            const lastPostId = lastPost.id;


            return this.userService.getTimelinePosts({
                username: this.user.username,
                maxId: lastPostId,
                count: OkUserPostsStream.infiniteScrollChunkPostsCount,
            })
        }

        private onLoggedInUserChanged(loggedInUser: IUser) {
            if (loggedInUser) {
                const isLoggedInUserProfile = loggedInUser.id === this.user.id;
                this.postsDisplayContext = isLoggedInUserProfile ? PostDisplayContext.ownProfilePosts : PostDisplayContext.foreignProfilePosts;
            } else {
                this.postsDisplayContext = PostDisplayContext.foreignProfilePosts;
            }
        }

        onPostUploaded(post: IPost) {
            this.$refs.postsStream.addPostToTop(post);
        }
    }
</script>



