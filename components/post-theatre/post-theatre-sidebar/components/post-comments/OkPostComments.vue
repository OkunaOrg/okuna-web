<template>
    <section v-if="postCommentsSortSetting">
        <ok-post-comments-sort-switcher></ok-post-comments-sort-switcher>
        <div v-if="state === OkPostCommentsState.infiniteScrolling">
            <div v-for="postComment in postComments" :key="postComment.id">
                <ok-post-comment :post="post" :post-comment="postComment"
                                 :show-replies="true"
                                 @onWantsToReply="onWantsToReplyToComment"
                                 @onPostCommentDeleted="onPostCommentDeleted"
                                 @onWantsToReplyToReply="onWantsToReplyToReply"
                ></ok-post-comment>
            </div>
            <span></span>

            <infinite-loading @infinite="inifiteScrollHandler" ref="infiniteLoading"></infinite-loading>
        </div>
        <div v-else-if="state === OkPostCommentsState.loadMore">
            <ok-loading-indicator v-if="loadMoreIsBootstrapping"></ok-loading-indicator>
            <ok-load-more
                    :class="{'is-hidden': loadMoreIsBootstrapping}"
                    :load-more-bottom="loadMoreBottomPostComments"
                    :load-more-top="loadMoreTopPostComments"
                    :load-more-bottom-text="$t('components.post_comments.load_more')"
                    :load-more-top-text="$t('components.post_comments.load_more')"
                    ref="loadMore">
                <div v-for="postComment in postComments" :key="postComment.id">
                    <ok-post-comment :post="post"
                                     :post-comment="postComment"
                                     :show-replies="true"
                                     :linked-post-comment-id.sync="linkedPostCommentId"
                                     :linked-post-comment-reply-id.sync="linkedPostCommentReplyId"
                                     :highlighted-post-comment-id.sync="highlightedPostCommentId"
                                     @onPostCommentDeleted="onPostCommentDeleted"
                                     @onWantsToReply="onWantsToReplyToComment"
                                     @onWantsToReplyToReply="onWantsToReplyToReply"
                    ></ok-post-comment>
                </div>
            </ok-load-more>
        </div>
    </section>
</template>


<style scoped lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
    import VueRouter, { Route } from "vue-router";
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";
    import { IPost } from "~/models/posts/post/IPost";
    import OkPostComment
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/OkPostComment.vue";
    import { ILoggingService } from "~/services/logging/ILoggingService";
    import { IOkLogger } from "~/services/logging/types";
    import { PostCommentsSortSetting } from "~/services/user-preferences/libs/PostCommentsSortSetting";
    import { IUserPreferencesService } from "~/services/user-preferences/IUserPreferencesService";
    import InfiniteLoading from "~/node_modules/vue-infinite-loading";
    import OkPostCommentsSortSwitcher
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comments-sort-switcher.vue";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { OkPostCommentsState } from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/libs/OkPostCommentsState";
    import OkLoadMore from "~/components/utils/load-more/OkLoadMore.vue";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { LoadMoreStatus } from "~/components/utils/load-more/lib/LoadMoreStatus";
    import OkLoadingIndicator from "~/components/utils/OkLoadingIndicator.vue";
    import { IHistoryService } from "~/services/history/IHistoryService";
    import {
        OnCommentedPostParams,
        ReplyToCommentParams,
        ReplyToReplyParams
    } from "~/components/post-theatre/post-theatre-sidebar/lib/PostTheatreEventParams";


    @Component({
        name: "OkPostComments",
        components: {OkLoadingIndicator, OkLoadMore, OkPostCommentsSortSwitcher, OkPostComment},
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
        $router!: VueRouter;

        $observables!: {
            postCommentsSortSetting: BehaviorSubject<PostCommentsSortSetting>
        };

        OkPostCommentsState = OkPostCommentsState;

        postComments: IPostComment[] = [];
        sort: PostCommentsSortSetting;

        linkedPostCommentId: number = 0;
        linkedPostCommentReplyId: number = 0;
        highlightedPostCommentId: number = 0;
        loadMoreIsBootstrapping = true;

        state: OkPostCommentsState = OkPostCommentsState.Idle;

        $refs!: {
            infiniteLoading: InfiniteLoading,
            loadMore: OkLoadMore
        };

        private bootstrapLoadMoreOperation: CancelableOperation<IPostComment[]>;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private userPreferencesService: IUserPreferencesService = okunaContainer.get<IUserPreferencesService>(TYPES.UserPreferencesService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private historyService: IHistoryService = okunaContainer.get<IHistoryService>(TYPES.HistoryService);
        private logger: IOkLogger;


        mounted() {
            this.logger = this.loggingService!.getLogger({
                name: "PostComments"
            });

            this.$observables["postCommentsSortSetting"].subscribe(this.onPostCommentsSortSettingChange);

            this.bootstrap();
        }

        @Watch("$route.query.pcr")
        onPostCommentReplyUrlParamChange(val: string, oldVal: string) {
            this.state = OkPostCommentsState.Idle;
            this.$nextTick(()=> this.bootstrap());
        }

        @Watch("$route.query.pc")
        onPostCommentUrlParamChange(val: string, oldVal: string) {
            this.state = OkPostCommentsState.Idle;
            this.$nextTick(()=> this.bootstrap());
        }

        bootstrap() {
            let routePostCommentReplyId;
            let routePostCommentId;

            if (this.$route && this.$route.query) {
                routePostCommentReplyId = this.$route.query["pcr"];
                if (typeof routePostCommentReplyId === "string" || typeof routePostCommentReplyId === "number") this.linkedPostCommentReplyId = parseInt(routePostCommentReplyId.toString());

                routePostCommentId = this.$route.query["pc"];
                if (typeof routePostCommentId === "string" || typeof routePostCommentId === "number") this.linkedPostCommentId = parseInt(routePostCommentId.toString());

                this.updateHighlightedPostCommentId();
            }

            this.state = routePostCommentId ? OkPostCommentsState.loadMore : OkPostCommentsState.infiniteScrolling;

            if (this.state === OkPostCommentsState.loadMore) this.createdLoadMoreState();
        }

        async createdLoadMoreState() {
            await this.bootstrapLoadMoreState();
            this.awaitForLinkedElementToAppear();
        }

        destroyed() {
            if (this.bootstrapLoadMoreOperation) this.bootstrapLoadMoreOperation.cancel();
        }


        onWantsToReplyToComment(params: ReplyToCommentParams) {
            this.$emit("onWantsToReplyToComment", params);
        }

        onWantsToReplyToReply(params: ReplyToReplyParams) {
            this.$emit("onWantsToReplyToReply", params);
        }

        onPostCommentDeleted(postComment: IPostComment, post: IPost) {
            const indexOfItem = this.postComments.indexOf(postComment);
            if (indexOfItem > -1) this.postComments.splice(indexOfItem, 1);
        }

        updateHighlightedPostCommentId() {
            if (!this.linkedPostCommentReplyId && !this.linkedPostCommentId) return;
            this.highlightedPostCommentId = this.linkedPostCommentReplyId ? this.linkedPostCommentReplyId : this.linkedPostCommentId;
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

            const canLoadMore = postCommentReplies.length && postCommentReplies.length === OkPostComments.loadMoreItemsCount;

            return canLoadMore;
        }

        // Errors of this method are handled by the loadMore component
        async loadMoreTopPostComments(): Promise<boolean> {
            let firstPostCommentId;
            const lastPostComment = this.postComments[0];
            if (lastPostComment) firstPostCommentId = lastPostComment.id;

            const currentSort: PostCommentsSortSetting = this.$observables.postCommentsSortSetting.value;

            let maxId;
            let minId;

            if (firstPostCommentId) {
                switch (currentSort) {
                    case PostCommentsSortSetting.oldestFirst:
                        maxId = firstPostCommentId;
                        break;
                    case PostCommentsSortSetting.newestFirst:
                        // No clue why +1 but @Shantanu did it like this on the mobile app
                        minId = firstPostCommentId + 1;
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
                this.postComments.unshift(...postCommentReplies);
            }

            const canLoadMore = postCommentReplies.length && postCommentReplies.length === OkPostComments.loadMoreItemsCount;

            return canLoadMore;
        }

        /**
         * To be called from another component
         */
        async addPostComment(params: OnCommentedPostParams) {
            this.logger.info("Adding post comment", params.createdPostComment);

            let newLinkedPostCommentId;
            let newLinkedPostCommentReplyId;

            if (params.parentPostComment) {
                // Its a reply
                newLinkedPostCommentId = params.parentPostComment.id;
                newLinkedPostCommentReplyId = params.createdPostComment.id;
            } else {
                // Its a post comment
                newLinkedPostCommentId = params.createdPostComment.id;
                newLinkedPostCommentReplyId = undefined;
            }

            this.linkedPostCommentId = newLinkedPostCommentId;
            this.linkedPostCommentReplyId = newLinkedPostCommentReplyId;

            let newQueryParams = {
                pc: newLinkedPostCommentId
            };

            if (newLinkedPostCommentReplyId) newQueryParams["pcr"] = newLinkedPostCommentReplyId;

            this.historyService.updatePathForPostSilently({
                post: this.post,
                linkedPostCommentReplyId: newLinkedPostCommentReplyId,
                linkedPostCommentId: newLinkedPostCommentId
            });

            this.state = OkPostCommentsState.loadMore;

            // We need the LoadMore element loaded
            this.$nextTick(() => {
                this.updateHighlightedPostCommentId();
                this.createdLoadMoreState();
            });
        }


        private async bootstrapLoadMoreState() {
            if (this.bootstrapLoadMoreOperation) return;
            this.loadMoreIsBootstrapping = true;
            const currentSort: PostCommentsSortSetting = this.$observables.postCommentsSortSetting.value;

            try {
                const linkedPostCommentAlreadyExists = this.postComments.find((postComment) => postComment.id === this.linkedPostCommentId);

                let postComments;

                if (linkedPostCommentAlreadyExists) {
                    postComments = this.postComments;
                } else {
                    this.bootstrapLoadMoreOperation = CancelableOperation.fromPromise(this.userService.getPostComments({
                        post: this.post,
                        sort: currentSort,
                        maxId: this.linkedPostCommentId,
                        minId: this.linkedPostCommentId,
                        countMax: OkPostComments.loadMoreItemsCount,
                        countMin: OkPostComments.loadMoreItemsCount
                    }));

                    postComments = await this.bootstrapLoadMoreOperation.value;
                }

                if (postComments.length) {
                    this.postComments = postComments;
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
                                this.$refs.loadMore?.setBottomStatus(LoadMoreStatus.allLoaded);
                            }

                            if (olderPostCommentsCount < OkPostComments.loadMoreItemsCount) {
                                this.$refs.loadMore?.setTopStatus(LoadMoreStatus.allLoaded);
                            }
                            break;
                        case PostCommentsSortSetting.newestFirst:
                            // Newer will be on top, older on bottom
                            if (olderPostCommentsCount < OkPostComments.loadMoreItemsCount) {
                                this.$refs.loadMore?.setBottomStatus(LoadMoreStatus.allLoaded);
                            }

                            if (newerPostCommentCount < OkPostComments.loadMoreItemsCount) {
                                this.$refs.loadMore?.setTopStatus(LoadMoreStatus.allLoaded);
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
                this.loadMoreIsBootstrapping = false;
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
                const options = {
                    container: `#${this.containerId}`,
                    offset: -100,
                    duration: 0
                };

                const element = document.getElementById(id);
                if (element) {
                    this.$scrollTo(element, 500, options);
                }
            });

        }

        private onPostCommentsSortSettingChange(postCommentSortSetting: PostCommentsSortSetting | undefined) {
            if (postCommentSortSetting) {
                this.sort = postCommentSortSetting;
                if (this.state == OkPostCommentsState.infiniteScrolling) {
                    this.refreshInfiniteLoading();
                } else if (this.state === OkPostCommentsState.loadMore) {
                    this.postComments = [];
                    this.bootstrap();
                }
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



