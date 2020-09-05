<template>
    <section id="home-timeline-posts" class="is-flex flex-column align-items-center" v-if="loggedInUser">
        <ok-posts-stream
                ref="postsStream"
                class="has-padding-top-30-tablet"
                :posts-display-context="postDisplayContext"
                :refresher="postsRefresher"
                :on-scroll-loader="postsOnScrollLoader"
                post-container-class="has-padding-bottom-30-tablet has-padding-right-30-tablet has-padding-left-30-tablet"
        >
            <template v-slot:leading>
                <div class="has-padding-bottom-30-tablet has-padding-right-30-tablet has-padding-left-30-tablet">
                    <ok-timeline-post-uploads @onPostUploaded="onPostUploaded"/>
                </div>
            </template>
        </ok-posts-stream>
        <ok-new-post-action/>
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
    import OkNewPostAction from '~/components/new-post-action/OkNewPostAction.vue';
    import OkTimelinePostUploads from '~/pages/home/pages/timeline/components/OkTimelinePostUploads.vue';


    @Component({
        name: "OkTimelinePage",
        components: {OkTimelinePostUploads, OkNewPostAction, OkPostsStream, OkPost},
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

        $refs: {
            postsStream: OkPostsStream
        };

        $route!: Route;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        postDisplayContext = PostDisplayContext.timelinePosts;

        scrollPosition = 0;

        private html: HTMLElement;
        private homeButton: HTMLElement;
        private okunaLogo: HTMLElement;

        private scrollToTopEventRemover;


        mounted() {
            if (this.scrollToTopEventRemover) this.scrollToTopEventRemover();
            this.html = document.querySelector("html");
            this.homeButton = document.querySelector("#home-button");
            this.okunaLogo = document.querySelector("#okuna-logo");
            this.homeButton.addEventListener("click", this.onWantsToScrollToTop);
            this.okunaLogo.addEventListener("click", this.onWantsToScrollToTop);
            this.scrollToTopEventRemover = () => {
                this.homeButton.removeEventListener("click", this.onWantsToScrollToTop);
                this.okunaLogo.removeEventListener("click", this.onWantsToScrollToTop);
            };
        }


        destroyed() {
            if (this.scrollToTopEventRemover) this.scrollToTopEventRemover();
        }


        @Watch("$route")
        onChildChanged(to: Route, from: Route) {
            if (this.html) {
                if (from.name === "timeline") {
                    const scrollTop = this.html.scrollTop;
                    this.scrollPosition = scrollTop;
                } else if (to.name === "timeline") {
                    setTimeout(() => {
                        if (this.scrollPosition) {
                            this.html.scrollTop = this.scrollPosition;
                        }
                    }, 100)
                }
            }
        }

        onPostUploaded(post: IPost){
            this.$refs.postsStream.addPostToTop(post);
        }


        onWantsToScrollToTop() {
            if (this.$route.name === "timeline") {
                if (this.html) {
                    const currentScrollTop = this.html.scrollTop;
                    if (currentScrollTop === 0) {
                        // Refresh
                        this.$refs.postsStream.refresh();
                    } else {
                        // Scroll to top
                        this.$scrollTo(this.html, 300, {});
                    }
                }
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



