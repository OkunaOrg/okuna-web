<template>
    <section v-if="postCommentsSortSetting">
        <ok-post-comments-sort-switcher></ok-post-comments-sort-switcher>
        <div>
            <div v-for="postComment in postComments" :key="postComment.id">
                <ok-post-comment :post="post" :post-comment="postComment"
                                 :show-replies="true"
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
    import OkPostCommentsSortSwitcher
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comments-sort-switcher.vue";
    import { BehaviorSubject } from "~/node_modules/rxjs";

    @Component({
        name: "OkPostComments",
        components: {OkPostCommentsSortSwitcher, OkPostComment},
        subscriptions: function () {
            return {
                postCommentsSortSetting: this["userPreferencesService"].postCommentsSortSetting
            }
        }
    })
    export default class OkPostComments extends Vue {

        @Prop(Object) readonly post: IPost;

        $route!: Route;
        $observables!: {
            postCommentsSortSetting: BehaviorSubject<PostCommentsSortSetting>
        };

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
            let lastPostCommentId;
            const lastPostComment = this.postComments[this.postComments.length - 1];
            if (lastPostComment) lastPostCommentId = lastPostComment.id;
            const currentSort: PostCommentsSortSetting = this.$observables.postCommentsSortSetting.value;

            let maxId;
            let minId;

            if (lastPostCommentId) {
                switch (currentSort) {
                    case PostCommentsSortSetting.newestFirst:
                        maxId = lastPostCommentId;
                        break;
                    case PostCommentsSortSetting.oldestFirst:
                        // No clue why +1 but @Shantanu did it like this on the mobile app
                        minId = lastPostCommentId + 1;
                        break;
                    default:
                        throw new Error("Unsupported PostCommentsSortSetting on infinite handler");
                }
            }

            this.userService.getPostComments({
                post: this.post,
                maxId: maxId,
                minId: minId,
                sort: currentSort
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
            this.$nextTick(() => {
                if (this.$refs["infiniteLoading"]) {
                    this.$refs["infiniteLoading"].$emit("$InfiniteLoading:reset")
                }
            })
        }


    }
</script>



