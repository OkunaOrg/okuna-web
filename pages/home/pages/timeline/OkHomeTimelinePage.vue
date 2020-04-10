<template>
    <section id="home-timeline-posts" class="timeline-posts" v-if="loggedInUserReady">
        <div class="timeline-posts-stream" style="min-width:100px ; min-height: 100px;">
            <div v-for="post in posts" :key="post.id" class="has-padding-30">
                <!-- Hacker News item loop -->
                <ok-post :post="post" :post-display-context="postDisplayContext"></ok-post>
            </div>

            <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </div>
    </section>
</template>


<style scoped lang="scss">
    .timeline-posts{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IPost } from "~/models/posts/post/IPost";
    import OkPost from "~/components/post/Post.vue";
    import { PostDisplayContext } from "~/components/post/lib/PostDisplayContext";
    import { Subscription } from "~/node_modules/rxjs";
    import { IUser } from "~/models/auth/user/IUser";

    @Component({
        components: {OkPost},
    })
    export default class OkHomeTimelinePage extends Vue {
        $route!: Route;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        posts: IPost[] = [];
        postDisplayContext = PostDisplayContext.timelinePosts;
        loggedInUserReady = false;

        private loggedInUserSubscription: Subscription;

        mounted() {
            this.loggedInUserSubscription = this.userService.loggedInUser.subscribe(this.onLoggedInUser);
        }

        destroyed() {
            this.loggedInUserSubscription.unsubscribe();
        }

        onLoggedInUser(loggedInUser: IUser) {
            if (loggedInUser) {
                this.loggedInUserReady = true;
            }
        }

        infiniteHandler($state) {
            console.log("Infinite handler");
            let lastPostId;
            const lastPost = this.posts[this.posts.length - 1];
            if (lastPost) lastPostId = lastPost.id;


            this.userService.getTimelinePosts({
                maxId: lastPostId,
            }).then((timelinePosts) => {
                if (timelinePosts.length) {
                    this.posts.push(...timelinePosts);
                    $state.loaded();
                } else {
                    $state.complete();
                }
            });
        }

        scrollToItem() {
            console.log("Scroll to Item called");

            var options = {
                // container: "#home-timeline-posts",
                offset: -100,
                easing: "ease-in",
                //force: true,
                onStart: function (element) {
                    // scrolling started
                    console.log("STARTED SCROLLING");
                },
                onDone: function (element) {
                    // scrolling is done
                    console.log("DONE SCROLLING");
                },
            };

            var element = document.querySelector("#highlighted-post");


            this.$scrollTo(element, 500, options);
        }


    }
</script>



