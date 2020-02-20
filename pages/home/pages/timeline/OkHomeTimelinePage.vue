<template>
    <section id="home-timeline-posts" class="timeline-posts">
        <div class="timeline-posts-stream">
            <div v-for="post in posts" :key="post.id">
                <!-- Hacker News item loop -->
                <ok-post :post="post"></ok-post>
            </div>
            asdas

            <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </div>
    </section>
</template>


<style scoped lang="scss">

    .timeline-posts{
        display: flex;
        flex-direction: column;
        align-items: center;

        &-stream{
            max-width: 635px;
            min-width: 635px;
        }

    }

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IPost } from "~/models/posts/post/IPost";
    import OkPost from '~/components/post/Post.vue';

    @Component({
        components: {OkPost},
    })
    export default class extends Vue {
        $route!: Route;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        posts: IPost[] = [];

        mounted() {
            //setTimeout(this.scrollToItem, 5000);
        }

        infiniteHandler($state) {


            let lastPostId;
            const lastPost = this.posts[this.posts.length - 1];
            if (lastPost) lastPostId = lastPost.id;


            this.userService.getTimelinePosts({
                maxId: lastPostId,
                username: 'komposten'
            }).then((timelinePosts) => {
                console.log(timelinePosts);
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
            console.log(element);


            this.$scrollTo(element, 500, options);
        }


    }
</script>



