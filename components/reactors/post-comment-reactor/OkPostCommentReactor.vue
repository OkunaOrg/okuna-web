<template>
    <ok-reaction-emoji-picker @onReactionPicked="onReactionEmojiPicked" :is-full-width="isFullWidth"
                              :is-loading="requestInProgress"/>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { IEmoji } from "~/models/common/emoji/IEmoji";
    import OkReactionEmojiPicker from "~/components/pickers/reaction-emoji-picker/OkReactionEmojiPicker.vue";
    import { IPost } from "~/models/posts/post/IPost";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";
    import { IPostCommentReaction } from "~/models/posts/post-comment-reaction/IPostCommentReaction";

    @Component({
        name: "OkPostCommentReactor",
        components: {OkReactionEmojiPicker},
    })
    export default class OkPostCommentReactor extends Vue {
        @Prop(Object) readonly post: IPost;
        @Prop(Object) readonly postComment: IPostComment;
        @Prop(Boolean) readonly isFullWidth: string;

        requestInProgress = false;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        private reactWithEmojiOperation?: CancelableOperation<IPostCommentReaction>;
        private removeReactionOperation?: CancelableOperation<void>;


        destroyed() {
            if (this.removeReactionOperation) this.removeReactionOperation.cancel();
            if (this.reactWithEmojiOperation) this.reactWithEmojiOperation.cancel();
        }

        onReactionEmojiPicked(emoji: IEmoji) {
            this.reactWithEmoji(emoji);
        }

        private async reactWithEmoji(emoji: IEmoji) {
            if (this.requestInProgress) return;
            this.setRequestInProgress(true);

            try {
                this.reactWithEmojiOperation = CancelableOperation.fromPromise(this.userService.reactToPostComment({
                    post: this.post,
                    postComment: this.postComment,
                    emoji: emoji
                }));

                const postCommentReaction = await this.reactWithEmojiOperation.value;
                this.postComment.setReaction(postCommentReaction);
                this.$emit("onReacted", postCommentReaction);
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.reactWithEmojiOperation = null;
                this.setRequestInProgress(false);
            }
        }

        private setRequestInProgress(requestInProgress) {
            this.$emit("onRequestInProgress", requestInProgress);
            this.requestInProgress = requestInProgress;
        }

    }
</script>
