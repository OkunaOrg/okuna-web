<template>
    <section v-if="postCommentsSortSetting">
        <div class="has-padding-right-20 has-padding-left-20 has-padding-top-10 has-padding-bottom-10 ok-has-text-primary-invert-60 is-flex align-items-center is-size-7">
            <span>Showing</span>
            <div class="has-padding-10">
                <button
                        class="button is-rounded ok-has-background-primary-highlight ok-has-text-primary-invert-60 is-borderless is-small"
                        :class="{'ok-has-background-accent-gradient': post.reaction, 'is-loading': requestInProgress}"
                        @click="onReactButtonPressed">
                    <ok-menu-down-icon class="ok-svg-icon-primary-invert-60 is-icon-2x"></ok-menu-down-icon>
                    <span class="has-padding-left-5">
                            newest
                        </span>
                </button>
            </div>
            <span>first.</span>
        </div>
        <div>
            <div v-for="postComment in postComments" :key="postComment.id">
                <ok-post-comment :post="post" :post-comment="postComment" class="has-padding-20"
                                 @onWantsToReply="onWantsToReplyToComment"></ok-post-comment>
            </div>
            <span></span>

            <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading"></infinite-loading>
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
    import OkPostComment
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/OkPostComment.vue";
    import { ILoggingService } from "~/services/logging/ILogging";
    import { IOkLogger } from "~/services/logging/types";
    import { PostCommentsSortSetting } from "~/services/user-preferences-service/libs/PostCommentsSortSetting";
    import { IUserPreferencesService } from "~/services/user-preferences-service/IUserPreferencesService";
    import InfiniteLoading from "~/node_modules/vue-infinite-loading";

    @Component({
        name: "OkPostComments",
        components: {OkPostComment},
        subscriptions: function () {
            return {
                postCommentsSortSetting: this.userPreferencesService.postCommentsSortSetting
            }
        }
    })
    export default class OkPostComments extends Vue {

        @Prop(Object) readonly post: IPost;

        $route!: Route;
        postComments: IPostComment[] = [];
        sort: PostCommentsSortSetting;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private userPreferencesService: IUserPreferencesService = okunaContainer.get<IUserPreferencesService>(TYPES.UserPreferencesService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private logger: IOkLogger;

        $refs!: {
            infiniteLoading: InfiniteLoading
        };


        mounted() {
            this.logger = this.loggingService!.getLogger({
                name: "PostComments"
            });
            //setTimeout(this.scrollToItem, 5000);

            this.$observables["postCommentsSortSetting"].subscribe(this.onPostCommentsSortSettingChange);
        }

        onWantsToReplyToComment(postComment: IPostComment, post: IPost) {
            this.$emit("onWantsToReplyToComment", postComment, post);
        }

        infiniteHandler($state) {
            let lasPostCommentId;
            const lastPostComment = this.postComments[this.postComments.length - 1];
            if (lastPostComment) lasPostCommentId = lastPostComment.id;


            this.userService.getPostComments({
                post: this.post,
                maxId: lasPostCommentId,
                sort: PostCommentsSortSetting.newestFirst
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

        /**
         * To be called from another component
         */
        addPostComment(postComment: IPostComment) {
            this.logger.info("Adding post comment", postComment);
            this.postComments.unshift(postComment);
        }

        private onPostCommentsSortSettingChange(postCommentSortSetting: PostCommentsSortSetting | undefined) {
            if (postCommentSortSetting) {
                this.sort = postCommentSortSetting;
                this.refreshInfiniteLoading();
            }
        }

        private refreshInfiniteLoading() {
            this.postComments = [];
        }


    }
</script>



