<template>
    <section v-if="postCommentsSortSetting">
        <mt-loadmore :bottom-method="loadBottom" :bottom-status.sync="loadMoreStatus">
            <div v-for="postComment in postCommentReplies" :key="postComment.id">
                <ok-post-comment :post="post" :post-comment="postComment" class="has-padding-20" :show-replies="false"
                                 @onWantsToReply="onWantsToReplyToComment"></ok-post-comment>
            </div>

            <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="loadMoreStatus !== 'loading'" :class="{ 'rotate': loadMoreStatus === 'drop' }">↓</span>
                <span v-show="loadMoreStatus === 'loading'">Loading...</span>
            </div>
        </mt-loadmore>
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
    import { PostCommentsSortSetting } from '~/services/user-preferences-service/libs/PostCommentsSortSetting';

    @Component({
        name: "OkPostCommentReplies",
        components: {
            OkPostComment: () => import("~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/OkPostComment.vue"),
        },
        subscriptions: function () {
            return {
                postCommentsSortSetting: this.userPreferencesService.postCommentsSortSetting
            }
        }
    })
    export default class OkPostCommentReplies extends Vue {

        static readonly loadMoreItemsCount = 5;

        @Prop(Object) readonly post: IPost;
        @Prop(Object) readonly postComment: IPostComment;

        $route!: Route;
        postCommentReplies: IPostComment[] = [];
        allLoaded: boolean;
        loadMoreStatus: string = '';

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private userPreferencesService: IUserPreferencesService = okunaContainer.get<IUserPreferencesService>(TYPES.UserPreferencesService);

        $refs!: {
            loadmore: any
        };


        mounted() {
            this.postCommentReplies = this.postComment.replies;
        }

        onWantsToReplyToComment(postComment: IPostComment, post: IPost) {
            this.$emit("onWantsToReplyToReply", postComment, post);
        }

        loadBottom(id) {
            let lastPostCommentId;
            const lastPostComment = this.postCommentReplies[this.postCommentReplies.length - 1];
            if (lastPostComment) lastPostCommentId = lastPostComment.id;
            const currentSort: PostCommentsSortSetting = this.$observables["postCommentsSortSetting"].value;

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

            this.userService.getPostCommentReplies({
                post: this.post,
                postComment: this.postComment,
                maxId: maxId,
                minId: minId,
                countMax: OkPostCommentReplies.loadMoreItemsCount,
                countMin: OkPostCommentReplies.loadMoreItemsCount,
                sort: currentSort,
            }).then((postCommentReplies) => {
                if (postCommentReplies.length) {
                    this.postCommentReplies.push(...postCommentReplies);
                    this.$refs["loadmore"].onBottomLoaded(id);
                } else {
                    this.allLoaded = true;// if all data are loaded
                }
            });
        }

        /**
         * To be called from another component
         */
        addPostComment(postComment: IPostComment) {
            this.postCommentReplies.unshift(postComment);
        }

    }
</script>



