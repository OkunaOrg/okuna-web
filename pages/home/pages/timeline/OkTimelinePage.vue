<template>
    <section id="home-timeline-posts" class="is-flex flex-column align-items-center" v-if="loggedInUser">
        <div style="min-width:100px ; min-height: 100px;">
            <ok-posts-stream
                    :posts-display-context="postDisplayContext"
                    :refresher="postsRefresher"
                    :on-scroll-loader="postsOnScrollLoader"
                    post-container-class="has-padding-30-tablet"
            ></ok-posts-stream>
        </div>
    </section>
</template>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
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
        name: 'OkTimelinePage',
        components: {OkPostsStream, OkPost},
        subscriptions: function () {
            return {
                loggedInUser: this['userService'].loggedInUser
            }
        }
    })
    export default class OkTimelinePage extends Vue {
        static infiniteScrollChunkPostsCount = 10;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        postDisplayContext = PostDisplayContext.timelinePosts;

        postsRefresher(): Promise<IPost[]> {
            return this.userService.getTrendingPosts({
                count: OkTimelinePage.infiniteScrollChunkPostsCount,
            });
        }

        postsOnScrollLoader(posts: IPost[]) {
            const lastPost = posts[posts.length - 1];
            const lastPostId = lastPost.id;


            return this.userService.getTrendingPosts({
                maxId: lastPostId,
                count: OkTimelinePage.infiniteScrollChunkPostsCount,
            })
        }


    }
</script>



