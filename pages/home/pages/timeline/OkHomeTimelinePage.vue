<template>
    <section id="home-timeline-posts">
        <div v-for="(post, $index) in posts" :key="$index">
            <!-- Hacker News item loop -->
            <span>
                {{ post }}
            </span>
        </div>

        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </section>
</template>


<style scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IPost } from "~/models/posts/post/IPost";

    @Component({})
    export default class extends Vue {
        $route!: Route;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        posts: IPost[] = [];
        page: number;

        api = "//hn.algolia.com/api/v1/search_by_date?tags=story";

        mounted() {
            window["userService"] = this.userService;
            //setTimeout(this.scrollToItem, 5000);
        }

        infiniteHandler($state) {
            let lastPostId;
            const lastPost = this.posts[this.posts.length - 1];
            if (lastPost) lastPostId = lastPost.id;

            this.userService.getTimelinePosts({
                maxId: lastPostId
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
            console.log(element);


            this.$scrollTo(element, 500, options);
        }


    }
</script>



