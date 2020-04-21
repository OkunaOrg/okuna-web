<template>
    <section v-if="postCommentsSortSetting">
        <div class="columns is-gapless is-mobile">
            <div class="column is-narrow">
                <div class="has-padding-left-25 has-height-100-percent">
                    <ok-vertical-divider></ok-vertical-divider>
                </div>
            </div>
            <div class="column">
                <ok-loading-indicator v-if="loadMoreIsBootstrapping"></ok-loading-indicator>
                <ok-load-more
                        :class="{'is-hidden': loadMoreIsBootstrapping}"
                        :load-more-bottom="loadMoreBottomReplies"
                        :load-more-bottom-text="$t('components.post_comment_replies.load_more')"
                        :load-more-top="loadMoreTopReplies"
                        :load-more-top-text="$t('components.post_comment_replies.load_more')"
                        ref="loadMore">
                    <div v-for="postCommentReply in postCommentReplies" :key="postCommentReply.id">
                        <ok-post-comment :post="post" :post-comment="postCommentReply" :show-replies="false"
                                         :avatar-size="OkAvatarSize.small"
                                         :linked-post-comment-id.sync="linkedPostCommentId"
                                         :linked-post-comment-reply-id.sync="linkedPostCommentReplyId"
                                         :highlighted-post-comment-id.sync="highlightedPostCommentId"
                                         @onWantsToReply="onWantsToReplyToReply(postCommentReply)"></ok-post-comment>
                    </div>
                </ok-load-more>
            </div>
        </div>
    </section>
</template>


<style scoped lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";
    import { IPost } from "~/models/posts/post/IPost";
    import { IUserPreferencesService } from "~/services/user-preferences/IUserPreferencesService";
    import { PostCommentsSortSetting } from "~/services/user-preferences/libs/PostCommentsSortSetting";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import OkLoadMore from "~/components/utils/load-more/OkLoadMore.vue";
    import OkVerticalDivider from "~/components/utils/OkVerticalDivider.vue";
    import { LoadMoreStatus } from "~/components/utils/load-more/lib/LoadMoreStatus";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import OkLoadingIndicator from "~/components/utils/OkLoadingIndicator.vue";
    import { ReplyToReplyParams } from "~/components/post-theatre/post-theatre-sidebar/lib/PostTheatreEventParams";

    @Component({
        name: "OkPostCommentReplies",
        components: {
            OkLoadingIndicator,
            OkVerticalDivider,
            OkLoadMore,
            OkPostComment: () => import("~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/OkPostComment.vue"),
        },
        subscriptions: function () {
            return {
                postCommentsSortSetting: this["userPreferencesService"].postCommentsSortSetting
            }
        }
    })
    export default class OkPostCommentReplies extends Vue {

        static readonly loadMoreItemsCount = 5;

        @Prop(Object) readonly post: IPost;
        @Prop(Object) readonly postComment: IPostComment;

        @Prop({
            type: Number,
        }) readonly linkedPostCommentId: number;

        @Prop({
            type: Number,
        }) readonly linkedPostCommentReplyId: number;

        @Prop({
            type: Number,
        }) readonly highlightedPostCommentId: number;

        $route!: Route;

        postCommentReplies: IPostComment[] = [];
        OkAvatarSize = OkAvatarSize;
        loadMoreIsBootstrapping = true;

        private bootstrapPostCommentRepliesForLinkedPostCommentOperation: CancelableOperation<IPostComment[]>;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private userPreferencesService: IUserPreferencesService = okunaContainer.get<IUserPreferencesService>(TYPES.UserPreferencesService);

        $refs!: {
            loadMore: OkLoadMore
        };

        $observables!: {
            postCommentsSortSetting: BehaviorSubject<PostCommentsSortSetting>
        };

        mounted() {
            this.postCommentReplies = this.postComment.replies;
            this.bootstrapLoadMoreItems();
        }

        destroyed() {
            if (this.bootstrapPostCommentRepliesForLinkedPostCommentOperation) this.bootstrapPostCommentRepliesForLinkedPostCommentOperation.cancel();
        }

        onWantsToReplyToReply(postCommentReplyingTo: IPostComment) {
            const params: ReplyToReplyParams = {
                postCommentReplyingTo: postCommentReplyingTo,
                parentPostComment: this.postComment,
                post: this.post
            };
            this.$emit("onWantsToReplyToReply", params);
        }

        @Watch("linkedPostCommentReplyId")
        onChildChanged(val: string, oldVal: string) {
            this.bootstrapLoadMoreItems();
        }


        private async bootstrapLoadMoreItems() {
            this.loadMoreIsBootstrapping = true;

            const isLinkedPostCommentReplies = this.postComment.id === this.linkedPostCommentId;
            if (isLinkedPostCommentReplies && this.linkedPostCommentReplyId) {
                const postCommentAlreadyIncludesLinkedPostCommentReply = !!this.postCommentReplies.find((postCommentReply) => postCommentReply.id === this.linkedPostCommentReplyId);
                if (postCommentAlreadyIncludesLinkedPostCommentReply) {
                    // Use existing post comment replies
                    this.bootstrapPostCommentRepliesWithPostComment();
                } else {
                    // Fetch new post comment replies with the linkedPostComment
                    await this.bootstrapPostCommentRepliesForLinkedPostComment();
                }

            } else {
                this.bootstrapPostCommentRepliesWithPostComment();
            }

            this.loadMoreIsBootstrapping = false;
        }

        private bootstrapPostCommentRepliesWithPostComment() {
            this.postCommentReplies = this.postComment.replies;

            this.$refs.loadMore.setTopStatus(LoadMoreStatus.allLoaded);

            if (this.postCommentReplies.length === this.postComment.repliesCount) {
                this.$refs.loadMore.setBottomStatus(LoadMoreStatus.allLoaded);
            }
        }

        private async bootstrapPostCommentRepliesForLinkedPostComment() {
            if (this.bootstrapPostCommentRepliesForLinkedPostCommentOperation) return;
            const currentSort: PostCommentsSortSetting = this.$observables.postCommentsSortSetting.value;

            try {
                this.bootstrapPostCommentRepliesForLinkedPostCommentOperation = CancelableOperation.fromPromise(this.userService.getPostCommentReplies({
                    post: this.post,
                    postComment: this.postComment,
                    sort: currentSort,
                    maxId: this.linkedPostCommentReplyId,
                    minId: this.linkedPostCommentReplyId,
                    countMax: OkPostCommentReplies.loadMoreItemsCount,
                    // I dont get why +1 but shantanu does it and it works (?)
                    countMin: OkPostCommentReplies.loadMoreItemsCount + 1
                }));

                const postCommentReplies = await this.bootstrapPostCommentRepliesForLinkedPostCommentOperation.value;

                if (postCommentReplies.length) {
                    this.postCommentReplies = postCommentReplies;
                    let olderPostCommentRepliesCount = 0;
                    let newerPostCommentRepliesCount = 0;

                    this.postCommentReplies.forEach((postComment) => {
                        if (postComment.id === this.linkedPostCommentId) return;
                        postComment.id < this.linkedPostCommentReplyId ? olderPostCommentRepliesCount++ : newerPostCommentRepliesCount++;
                    });

                    switch (currentSort) {
                        case PostCommentsSortSetting.oldestFirst:
                            // Older will be on top, newer on bottom
                            if (newerPostCommentRepliesCount < OkPostCommentReplies.loadMoreItemsCount) {
                                this.$refs.loadMore.setBottomStatus(LoadMoreStatus.allLoaded);
                            }

                            if (olderPostCommentRepliesCount < OkPostCommentReplies.loadMoreItemsCount) {
                                this.$refs.loadMore.setTopStatus(LoadMoreStatus.allLoaded);
                            }
                            break;
                        case PostCommentsSortSetting.newestFirst:
                            // Newer will be on top, older on bottom
                            if (olderPostCommentRepliesCount < OkPostCommentReplies.loadMoreItemsCount) {
                                this.$refs.loadMore.setBottomStatus(LoadMoreStatus.allLoaded);
                            }

                            if (newerPostCommentRepliesCount < OkPostCommentReplies.loadMoreItemsCount) {
                                this.$refs.loadMore.setTopStatus(LoadMoreStatus.allLoaded);
                            }
                            break;
                        default:
                            throw new Error("Unsupported PostCommentsSortSetting on OkPostCommentReplies");
                    }

                } else {
                    throw new Error("Bootstrap load more state returned no comments ");
                }

            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.bootstrapPostCommentRepliesForLinkedPostCommentOperation = undefined;
            }

        }

        async loadMoreTopReplies(): Promise<boolean> {
            let firstPostCommentId;
            const firstPostComment = this.postCommentReplies[0];
            if (firstPostComment) firstPostCommentId = firstPostComment.id;
            const currentSort: PostCommentsSortSetting = this.$observables.postCommentsSortSetting.value;

            let maxId;
            let minId;

            if (firstPostCommentId) {
                switch (currentSort) {
                    case PostCommentsSortSetting.newestFirst:
                        minId = firstPostCommentId + 1;
                        break;
                    case PostCommentsSortSetting.oldestFirst:
                        // No clue why +1 but @Shantanu did it like this on the mobile app
                        maxId = firstPostCommentId;
                        break;
                    default:
                        throw new Error("Unsupported PostCommentsSortSetting on OkPostCommentReplies");
                }
            }

            const postCommentReplies = await this.userService.getPostCommentReplies({
                post: this.post,
                postComment: this.postComment,
                maxId: maxId,
                minId: minId,
                countMax: OkPostCommentReplies.loadMoreItemsCount,
                countMin: OkPostCommentReplies.loadMoreItemsCount,
                sort: currentSort,
            });


            if (postCommentReplies.length) {
                this.postCommentReplies.unshift(...postCommentReplies);
            }

            const canLoadMore = postCommentReplies.length && postCommentReplies.length === OkPostCommentReplies.loadMoreItemsCount;

            return canLoadMore;
        }

        async loadMoreBottomReplies(): Promise<boolean> {
            let lastPostCommentId;
            const lastPostComment = this.postCommentReplies[this.postCommentReplies.length - 1];
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
                        throw new Error("Unsupported PostCommentsSortSetting on OkPostCommentReplies");
                }
            }

            const postCommentReplies = await this.userService.getPostCommentReplies({
                post: this.post,
                postComment: this.postComment,
                maxId: maxId,
                minId: minId,
                countMax: OkPostCommentReplies.loadMoreItemsCount,
                countMin: OkPostCommentReplies.loadMoreItemsCount,
                sort: currentSort,
            });


            if (postCommentReplies.length) {
                this.postCommentReplies.push(...postCommentReplies);
            }

            const canLoadMore = postCommentReplies.length && postCommentReplies.length === OkPostCommentReplies.loadMoreItemsCount;

            return canLoadMore;
        }

        /**
         * To be called from another component
         */
        addPostComment(postComment: IPostComment) {
            this.postCommentReplies.unshift(postComment);
        }

    }
</script>



