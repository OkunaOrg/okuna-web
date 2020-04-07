<template>
    <section v-if="postCommentsSortSetting">
        <ok-post-comments-sort-switcher></ok-post-comments-sort-switcher>
        <div v-if="state === OkPostCommentsState.infiniteScrolling">
            <div v-for="postComment in postComments" :key="postComment.id">
                <ok-post-comment :post="post" :post-comment="postComment"
                                 :show-replies="true"
                                 @onWantsToReply="onWantsToReplyToComment"></ok-post-comment>
            </div>
            <span></span>

            <infinite-loading @infinite="inifiteScrollHandler" ref="infiniteLoading"></infinite-loading>
        </div>
        <ok-load-more v-else-if="state === OkPostCommentsState.loadMore"
                      :load-more-bottom="loadMoreBottomPostComments"
                      :load-more-top="loadMoreTopPostComments"
                      ref="loadMore">
            <div v-for="postComment in postComments" :key="postComment.id">
                <ok-post-comment :post="post"
                                 :post-comment="postComment"
                                 :show-replies="true"
                                 :linked-post-comment-id="linkedPostCommentId"
                                 :linked-post-comment-reply-id="linkedPostCommentReplyId"
                                 :highlighted-post-comment-id="highlightedPostCommentId"
                                 @onWantsToReply="onWantsToReplyToComment"></ok-post-comment>
            </div>
        </ok-load-more>
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
    import { OkPostCommentsState } from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/libs/OkPostCommentsState";
    import OkLoadMore from "~/components/utils/load-more/LoadMore.vue";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUtilsService } from "~/services/utils-service/IUtilsService";
    import { LoadMoreStatus } from "~/components/utils/load-more/lib/LoadMoreStatus";


    @Component({
        name: "OkPostComments",
        components: {OkLoadMore, OkPostCommentsSortSwitcher, OkPostComment},
        subscriptions: function () {
            return {
                postCommentsSortSetting: this["userPreferencesService"].postCommentsSortSetting
            }
        }
    })
    export default class OkPostComments extends Vue {

        static readonly loadMoreItemsCount = 5;

        @Prop(Object) readonly post: IPost;
        @Prop(String) readonly containerId: string;

        $route!: Route;

        $observables!: {
            postCommentsSortSetting: BehaviorSubject<PostCommentsSortSetting>
        };

        OkPostCommentsState = OkPostCommentsState;

        postComments: IPostComment[] = [];
        sort: PostCommentsSortSetting;

        linkedPostCommentId: number;
        linkedPostCommentReplyId: number;

        state: OkPostCommentsState;

        $refs!: {
            infiniteLoading: InfiniteLoading,
            loadMore: OkLoadMore
        };

        private bootstrapLoadMoreOperation: CancelableOperation<IPostComment[]>;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private userPreferencesService: IUserPreferencesService = okunaContainer.get<IUserPreferencesService>(TYPES.UserPreferencesService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private logger: IOkLogger;

        created() {
            const routePostCommentReplyId = this.$route.query["pcr"];
            if (typeof routePostCommentReplyId === "string") this.linkedPostCommentReplyId = parseInt(routePostCommentReplyId);

            const routePostCommentId = this.$route.query["pc"];
            if (typeof routePostCommentId === "string") this.linkedPostCommentId = parseInt(routePostCommentId);

            //this.state = routePostCommentId ? OkPostCommentsState.loadMore : OkPostCommentsState.infiniteScrolling;
            this.state = OkPostCommentsState.loadMore;

            if (this.state === OkPostCommentsState.loadMore) this.createdLoadMoreState();
        }

        async createdLoadMoreState() {
            await this.bootstrapLoadMoreState();
            this.awaitForLinkedElementToAppear();
        }

        mounted() {
            this.logger = this.loggingService!.getLogger({
                name: "PostComments"
            });
            //setTimeout(this.scrollToItem, 5000);

            this.$observables["postCommentsSortSetting"].subscribe(this.onPostCommentsSortSettingChange);
        }

        destroyed() {
            if (this.bootstrapLoadMoreOperation) this.bootstrapLoadMoreOperation.cancel();
        }


        onWantsToReplyToComment(postComment: IPostComment, post: IPost) {
            this.$emit("onWantsToReplyToComment", postComment, post);
        }

        get highlightedPostCommentId() {
            if (!this.linkedPostCommentReplyId && !this.linkedPostCommentId) return;
            return this.linkedPostCommentReplyId ? this.linkedPostCommentReplyId : this.linkedPostCommentId;
        }

        inifiteScrollHandler($state) {
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

        // Errors of this method are handled by the loadMore component
        async loadMoreBottomPostComments(): Promise<boolean> {
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
                        throw new Error("Unsupported PostCommentsSortSetting on OkPostComments");
                }
            }

            const postCommentReplies = await this.userService.getPostComments({
                post: this.post,
                maxId: maxId,
                minId: minId,
                countMax: OkPostComments.loadMoreItemsCount,
                countMin: OkPostComments.loadMoreItemsCount,
                sort: currentSort,
            });


            if (postCommentReplies.length) {
                this.postComments.push(...postCommentReplies);
            }

            const canLoadMore = postCommentReplies.length === OkPostComments.loadMoreItemsCount;

            return canLoadMore;
        }

        // Errors of this method are handled by the loadMore component
        async loadMoreTopPostComments(): Promise<boolean> {
            let lastPostCommentId;
            const lastPostComment = this.postComments[this.postComments.length - 1];
            if (lastPostComment) lastPostCommentId = lastPostComment.id;

            const currentSort: PostCommentsSortSetting = this.$observables.postCommentsSortSetting.value;

            let maxId;
            let minId;

            if (lastPostCommentId) {
                switch (currentSort) {
                    case PostCommentsSortSetting.oldestFirst:
                        maxId = lastPostCommentId;
                        break;
                    case PostCommentsSortSetting.newestFirst:
                        // No clue why +1 but @Shantanu did it like this on the mobile app
                        minId = lastPostCommentId + 1;
                        break;
                    default:
                        throw new Error("Unsupported PostCommentsSortSetting on OkPostComments");
                }
            }

            const postCommentReplies = await this.userService.getPostComments({
                post: this.post,
                maxId: maxId,
                minId: minId,
                countMax: OkPostComments.loadMoreItemsCount,
                countMin: OkPostComments.loadMoreItemsCount,
                sort: currentSort,
            });


            if (postCommentReplies.length) {
                this.postComments.push(...postCommentReplies);
            }

            const canLoadMore = postCommentReplies.length === OkPostComments.loadMoreItemsCount;

            return canLoadMore;
        }

        /**
         * To be called from another component
         */
        addPostComment(postComment: IPostComment) {
            this.logger.info("Adding post comment", postComment);
            this.postComments.unshift(postComment);
        }


        private async bootstrapLoadMoreState() {
            if (this.bootstrapLoadMoreOperation) return;
            const currentSort: PostCommentsSortSetting = this.$observables.postCommentsSortSetting.value;

            try {
                this.bootstrapLoadMoreOperation = CancelableOperation.fromPromise(this.userService.getPostComments({
                    post: this.post,
                    sort: currentSort,
                    maxId: this.linkedPostCommentId,
                    minId: this.linkedPostCommentId,
                    countMax: OkPostComments.loadMoreItemsCount,
                    countMin: OkPostComments.loadMoreItemsCount
                }));

                const postComments = await this.bootstrapLoadMoreOperation.value;

                if (postComments.length) {
                    this.postComments.push(...postComments);
                    let olderPostCommentsCount = 0;
                    let newerPostCommentCount = 0;
                    this.postComments.forEach((postComment) => {
                        if (postComment.id === this.linkedPostCommentId) return;
                        postComment.id < this.linkedPostCommentId ? olderPostCommentsCount++ : newerPostCommentCount++;
                    });

                    switch (currentSort) {
                        case PostCommentsSortSetting.oldestFirst:
                            // Older will be on top, newer on bottom
                            if (newerPostCommentCount < OkPostComments.loadMoreItemsCount) {
                                this.$refs.loadMore.setBottomStatus(LoadMoreStatus.allLoaded);
                            }

                            if (olderPostCommentsCount < OkPostComments.loadMoreItemsCount) {
                                this.$refs.loadMore.setTopStatus(LoadMoreStatus.allLoaded);
                            }
                            break;
                        case PostCommentsSortSetting.newestFirst:
                            // Newer will be on top, older on bottom
                            if (olderPostCommentsCount < OkPostComments.loadMoreItemsCount) {
                                this.$refs.loadMore.setBottomStatus(LoadMoreStatus.allLoaded);
                            }

                            if (newerPostCommentCount < OkPostComments.loadMoreItemsCount) {
                                this.$refs.loadMore.setTopStatus(LoadMoreStatus.allLoaded);
                            }
                            break;
                        default:
                            throw new Error("Unsupported PostCommentsSortSetting on OkPostComments");
                    }

                } else {
                    throw new Error("Bootstrap load more state returned no comments ");
                }

            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.bootstrapLoadMoreOperation = undefined;
            }

        }

        private awaitForLinkedElementToAppear() {
            const elementIdToWaitFor = `pc-${this.highlightedPostCommentId}`;
            this.logger.info(`Waiting for linked element with id ${elementIdToWaitFor} to appear`);

            const observer = new MutationObserver((mutations, me) => {
                var element = document.getElementById(elementIdToWaitFor);
                if (element) {
                    this.logger.info(`Linked element appeared`);
                    this.scrollToElementWithId(elementIdToWaitFor);
                    me.disconnect(); // stop observing
                    return;
                }
            });


            observer.observe(document, {
                childList: true,
                subtree: true
            });
        }

        private scrollToElementWithId(id: string) {
            this.logger.info(`Scrolling to element with id ${id}`);

            this.$nextTick(() => {
                var options = {
                    container: `#${this.containerId}`,
                    offset: -100,
                    duration: 0
                };

                var element = document.getElementById(id);

                this.$scrollTo(element, 500, options);
            });

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



