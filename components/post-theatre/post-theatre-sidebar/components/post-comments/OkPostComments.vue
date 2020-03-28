<template>
    <section>
        <div>
            <div v-for="postComment in postComments" :key="postComment.id">
                <ok-post-comment :post="post" :post-comment="postComment" class="has-padding-20"
                                 @onWantsToReply="onWantsToReplyToComment"></ok-post-comment>
            </div>
            <span></span>

            <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </div>
    </section>
</template>


<style scoped lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";
    import { IPost } from "~/models/posts/post/IPost";
    import { GetCommentsForPostSortType } from "~/services/Apis/posts/PostsApiServiceTypes";
    import OkPostComment
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/OkPostComment.vue";
    import { ILoggingService } from "~/services/logging/ILogging";
    import { IOkLogger } from "~/services/logging/types";

    @Component({
        name: "OkPostComments",
        components: {OkPostComment},
    })
    export default class OkPostComments extends Vue {

        @Prop(Object) readonly post: IPost;

        $route!: Route;
        postComments: IPostComment[] = [];

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private logger: IOkLogger;


        mounted() {
            this.logger = this.loggingService!.getLogger({
                name: "PostComments"
            });
            //setTimeout(this.scrollToItem, 5000);
        }

        onWantsToReplyToComment(postComment: IPostComment, post: IPost) {
            this.$emit("onWantsToReplyToComment", postComment, post);
        }

        infiniteHandler($state) {
            let lasPostCommentId;
            const lastPost = this.postComments[this.postComments.length - 1];
            if (lastPost) lasPostCommentId = lastPost.id;


            this.userService.getPostComments({
                post: this.post,
                maxId: lasPostCommentId,
                sort: GetCommentsForPostSortType.asc
            }).then((postComments) => {
                if (postComments.length) {
                    this.postComments.push(...postComments);
                    $state.loaded();
                } else {
                    $state.complete();
                }
            });
        }

        scrollToItem() {
            console.log("Scroll to Item called");

            var options = {
                // container: "#home-timeline-postComments",
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

        addPostComment(postComment: IPostComment) {
            this.logger.info("Adding post comment", postComment);
            this.postComments.unshift(postComment);
        }


    }
</script>



