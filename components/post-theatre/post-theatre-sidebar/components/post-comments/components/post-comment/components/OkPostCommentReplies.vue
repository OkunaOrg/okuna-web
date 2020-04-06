<template>
    <section v-if="postCommentsSortSetting">
        <div class="columns is-gapless">
            <div class="column is-narrow">
                <div class="has-padding-left-25 has-height-100-percent">
                    <ok-vertical-divider></ok-vertical-divider>
                </div>
            </div>
            <div class="column">
                <ok-load-more
                        :load-more-bottom="loadMoreReplies"
                        :load-more-bottom-text="loadMoreRepliesText"
                        ref="loadMore">
                    <div v-for="postComment in postCommentReplies" :key="postComment.id">
                        <ok-post-comment :post="post" :post-comment="postComment" :show-replies="false"
                                         :avatar-size="OkAvatarSize.small"
                                         @onWantsToReply="onWantsToReplyToComment"></ok-post-comment>
                    </div>
                </ok-load-more>
            </div>
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
    import { IUserPreferencesService } from "~/services/user-preferences-service/IUserPreferencesService";
    import { PostCommentsSortSetting } from "~/services/user-preferences-service/libs/PostCommentsSortSetting";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import OkLoadMore from "~/components/utils/load-more/LoadMore.vue";
    import OkVerticalDivider from "~/components/utils/VerticalDivider.vue";
    import { LoadMoreStatus } from "~/components/utils/load-more/lib/LoadMoreStatus";
    import { OkAvatarSize } from "~/components/avatars/lib/AvatarSize";

    @Component({
        name: "OkPostCommentReplies",
        components: {
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

        $route!: Route;

        postCommentReplies: IPostComment[] = [];
        OkAvatarSize = OkAvatarSize;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private userPreferencesService: IUserPreferencesService = okunaContainer.get<IUserPreferencesService>(TYPES.UserPreferencesService);

        $refs!: {
            loadMore: OkLoadMore
        };

        $observables!: {
            postCommentsSortSetting: BehaviorSubject<PostCommentsSortSetting>
        };


        mounted() {
            this.postCommentReplies = this.postComment.replies;
            if (this.postCommentReplies.length === this.postComment.repliesCount) {
                this.$refs.loadMore.setBottomStatus(LoadMoreStatus.allLoaded);
            }
        }

        onWantsToReplyToComment(postComment: IPostComment, post: IPost) {
            this.$emit("onWantsToReplyToReply", postComment, post);
        }

        async loadMoreReplies(): Promise<boolean> {
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

            const canLoadMore = postCommentReplies.length === OkPostCommentReplies.loadMoreItemsCount;

            return canLoadMore;
        }

        /**
         * To be called from another component
         */
        addPostComment(postComment: IPostComment) {
            this.postCommentReplies.unshift(postComment);
        }

        get loadMoreRepliesText() {
            const currentSort: PostCommentsSortSetting = this.$observables.postCommentsSortSetting.value;

            let text;

            //const remainingReplies = this.postComment.repliesCount - this.postCommentReplies.length;

            switch (currentSort) {
                case PostCommentsSortSetting.newestFirst:
                    text = "Load {{repliesCount}} older replies";
                    break;
                case PostCommentsSortSetting.oldestFirst:
                    text = "Load {{repliesCount}} replies";
                    break;
                default:
                    break;
            }

            return this.$t("components.post_comment_replies.load_more");
        }

    }
</script>



