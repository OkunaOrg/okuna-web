<template>
    <section id="home-timeline-posts" class="is-flex flex-column align-items-center" v-if="loggedInUser">
        <ok-posts-stream
                :posts-display-context="postDisplayContext"
                :refresher="postsRefresher"
                :on-scroll-loader="postsOnScrollLoader"
                post-container-class="has-padding-30-tablet"
        ></ok-posts-stream>
    </section>
</template>


<script lang="ts">
    import { Component, Vue, Watch } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IPost } from "~/models/posts/post/IPost";
    import OkPost from "~/components/post/OkPost.vue";
    import { PostDisplayContext } from "~/components/post/lib/PostDisplayContext";
    import { BehaviorSubject, Subscription } from "~/node_modules/rxjs";
    import { IUser } from "~/models/auth/user/IUser";
    import OkPostsStream from "~/components/posts-stream/OkPostsStream.vue";

    @Component({
        name: "OkTimelinePage",
        components: {OkPostsStream, OkPost},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        },
    })
    export default class OkTimelinePage extends Vue {
        static infiniteScrollChunkPostsCount = 10;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        $route!: Route;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        postDisplayContext = PostDisplayContext.timelinePosts;

        scrollPosition = 0;


        @Watch("$route")
        onChildChanged(to: Route, from: Route) {
            if (from.name === "timeline") {
                const scrollTop = document.querySelector("html").scrollTop;
                this.scrollPosition = scrollTop;
            } else if (to.name === "timeline") {
                setTimeout(() => {
                    if (this.scrollPosition) {
                        document.querySelector("html").scrollTop = this.scrollPosition;
                    }
                }, 100)
            }
        }

        postsRefresher(): Promise<IPost[]> {
            return this.userService.getTimelinePosts({
                count: OkTimelinePage.infiniteScrollChunkPostsCount,
            });
        }

        postsOnScrollLoader(posts: IPost[]) {
            const lastPost = posts[posts.length - 1];
            const lastPostId = lastPost.id;


            return this.userService.getTimelinePosts({
                maxId: lastPostId,
                count: OkTimelinePage.infiniteScrollChunkPostsCount,
            })
        }


    }
</script>



