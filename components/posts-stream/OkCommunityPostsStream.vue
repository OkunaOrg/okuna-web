<template>
    <ok-posts-stream
            v-if="userWasBootstrapped"
            :posts-display-context="postsDisplayContext"
            :refresher="postsRefresher"
            :on-scroll-loader="postsOnScrollLoader"
            :post-container-class="postContainerClass"
    ></ok-posts-stream>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPostsStream from "./OkPostsStream.vue";
    import { BehaviorSubject } from "rxjs";
    import { PostDisplayContext } from "../post/lib/PostDisplayContext";
    import { okunaContainer } from "../../services/inversify";
    import { TYPES } from "../../services/inversify-types";
    import { IPost } from "../../models/posts/post/IPost";
    import { IUserService } from "~/services/user/IUserService";
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import { IUser } from "~/models/auth/user/IUser";

    @Component({
        name: "OkCommunityPostsStream",
        components: {OkPostsStream},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkCommunityPostsStream extends Vue {
        static infiniteScrollChunkPostsCount = 10;

        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;


        @Prop({
            type: String,
            required: false,
            default: ""
        }) readonly postContainerClass: string;

        userWasBootstrapped = false;


        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        postsDisplayContext = PostDisplayContext.communityPosts;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUserChanged);
        }

        postsRefresher(): Promise<IPost[]> {
            return this.userService.getCommunityPosts({
                community: this.community,
                appendAuthorizationTokenIfExists: true,
            });
        }

        postsOnScrollLoader(posts: IPost[]) {
            const lastPost = posts[posts.length - 1];
            const lastPostId = lastPost.id;


            return this.userService.getCommunityPosts({
                community: this.community,
                maxId: lastPostId,
                count: OkCommunityPostsStream.infiniteScrollChunkPostsCount,
                appendAuthorizationTokenIfExists: true,
            })
        }

        private onLoggedInUserChanged(loggedInUser: IUser) {
            if (typeof loggedInUser === "undefined") return;

            this.userWasBootstrapped = true;
        }
    }
</script>



