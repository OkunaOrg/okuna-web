<template>
    <div class="ok-has-background-primary has-height-100-percent is-relative">
        <ok-mobile-user-profile-header :user="user"></ok-mobile-user-profile-header>
        <ok-user-cover :user="user"></ok-user-cover>
        <ok-mobile-user-profile-card :user="user"></ok-mobile-user-profile-card>
        <ok-posts-stream
                :posts-display-context="postDisplayContext"
                :refresher="postsRefresher"
                :on-scroll-loader="postsOnScrollLoader"
        ></ok-posts-stream>
    </div>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkMobileUserProfileHeader
        from "~/pages/home/pages/user/components/mobile-user-profile/components/mobile-user-profile-header/OkMobileUserProfileHeader.vue";
    import OkUserCover from "~/components/covers/user-cover/OkUserCover.vue";
    import OkMobileUserProfileCard
        from "~/pages/home/pages/user/components/mobile-user-profile/components/mobile-user-profile-card/OkMobileUserProfileCard.vue";
    import OkPostsStream from "~/components/posts-stream/OkPostsStream.vue";
    import { PostDisplayContext } from "~/components/post/lib/PostDisplayContext";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IPost } from "~/models/posts/post/IPost";

    @Component({
        name: "OkMobileUserProfilePage",
        components: {OkPostsStream, OkMobileUserProfileCard, OkUserCover, OkMobileUserProfileHeader},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkMobileUserProfilePage extends Vue {
        static infiniteScrollChunkPostsCount = 10;

        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        postsDisplayContext = PostDisplayContext.foreignProfilePosts;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUserChanged);
        }

        postsRefresher(): Promise<IPost[]> {
            return this.userService.getTimelinePosts({
                username: this.user.username,
                count: OkMobileUserProfilePage.infiniteScrollChunkPostsCount,
            });
        }

        postsOnScrollLoader(posts: IPost[]) {
            const lastPost = posts[posts.length - 1];
            const lastPostId = lastPost.id;


            return this.userService.getTimelinePosts({
                username: this.user.username,
                maxId: lastPostId,
                count: OkMobileUserProfilePage.infiniteScrollChunkPostsCount,
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

    }
</script>



