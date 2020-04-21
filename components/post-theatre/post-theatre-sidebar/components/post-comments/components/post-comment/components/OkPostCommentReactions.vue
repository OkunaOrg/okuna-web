<template>
    <div class="is-flex wrap is-in-progress" :class="{'is-loading' : requestInProgress}">
        <div v-for="reactionsEmojiCount in postComment.reactionsEmojiCounts"
             :key="reactionsEmojiCount.emoji.id" class="has-padding-right-10 has-padding-bottom-5">
            <ok-emoji-reaction-button
                    :size="OkEmojiReactionButtonSize.small"
                    :emoji-count="reactionsEmojiCount"
                    :is-current-reaction="postComment.reaction && postComment.reaction.emoji.id === reactionsEmojiCount.emoji.id"
                    @onPressed="onEmojiReactionButtonPressed"
            ></ok-emoji-reaction-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IEmoji } from "~/models/common/emoji/IEmoji";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IPost } from "~/models/posts/post/IPost";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";
    import { IPostCommentReaction } from "~/models/posts/post-comment-reaction/IPostCommentReaction";
    import OkEmojiReactionButton from "~/components/buttons/emoji-reaction-button/OkEmojiReactionButton.vue";
    import { IReactionsEmojiCount } from "~/models/posts/reactions-emoji-count/IReactionsEmojiCount";
    import { OkEmojiReactionButtonSize } from "~/components/buttons/emoji-reaction-button/lib/OkEmojiReactionButtonSize";

    @Component({
        name: "OkPostCommentReactions",
        components: {OkEmojiReactionButton},
    })
    export default class OkPostCommentReactions extends Vue {
        @Prop(Object) readonly postComment: IPostComment;
        @Prop(Object) readonly post: IPost;

        requestInProgress = false;
        OkEmojiReactionButtonSize = OkEmojiReactionButtonSize;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        private reactWithEmojiOperation?: CancelableOperation<IPostCommentReaction>;
        private removeReactionOperation?: CancelableOperation<void>;


        destroyed() {
            if (this.reactWithEmojiOperation) this.reactWithEmojiOperation.cancel();
            if (this.removeReactionOperation) this.removeReactionOperation.cancel();
        }

        async onEmojiReactionButtonPressed(reactionsEmojiCount: IReactionsEmojiCount) {
            if (this.requestInProgress) return;
            this.requestInProgress = true;

            const tappedEmojiReactionButtonIsCurrentReaction = this.postComment.reaction && this.postComment.reaction.emoji.id === reactionsEmojiCount.emoji.id;

            if (tappedEmojiReactionButtonIsCurrentReaction) {
                // Remove reaction
                await this.removeCurrentReaction();
            } else {
                // Add reaction
                await this.reactWithEmoji(reactionsEmojiCount.emoji);
            }

            this.requestInProgress = false;
        }

        private async reactWithEmoji(emoji: IEmoji) {
            try {
                this.reactWithEmojiOperation = CancelableOperation.fromPromise(this.userService.reactToPostComment({
                    post: this.post,
                    postComment: this.postComment,
                    emoji: emoji
                }));

                const postCommentReaction: IPostCommentReaction = await this.reactWithEmojiOperation.value;
                this.postComment.setReaction(postCommentReaction);
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.reactWithEmojiOperation = null;
            }
        }

        private async removeCurrentReaction() {
            try {
                this.removeReactionOperation = CancelableOperation.fromPromise(this.userService.deletePostCommentReaction({
                    post: this.post,
                    postComment: this.postComment,
                    postCommentReaction: this.postComment.reaction
                }));
                this.postComment.clearReaction();
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.removeReactionOperation = null;
            }
        }
    }
</script>
