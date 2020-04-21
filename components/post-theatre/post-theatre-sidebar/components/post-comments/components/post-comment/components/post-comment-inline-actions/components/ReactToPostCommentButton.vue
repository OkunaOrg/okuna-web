<template>
    <v-popover class="has-width-100-percent ok-post-comment-react-button-container"
               offset="20"
               placement="bottom-start"
               :open.sync="reactTooltipIsOpen"
               trigger="manual"
    >
        <!-- This will be the popover target (for the events and position) -->
        <span class="ok-has-text-primary-invert-60 has-text-weight-bold is-size-7 has-cursor-pointer"
              :class="{'ok-has-text-accent': postComment.reaction, 'has-text-weight-bold': postComment.reaction}"
              role="button" @click="onReactButtonPressed">
            {{ postComment.reaction ? postComment.reaction.emoji.keyword : 'React'}}
        </span>
        <!-- This will be the content of the popover -->
        <ok-reaction-emoji-picker slot="popover" @onReactionPicked="onReactionEmojiPicked"
                                  :is-loading="requestInProgress"/>
    </v-popover>
</template>

<style lang="scss">
    .ok-post-comment-react-button-container {
        .trigger {
            width: 100% !important;
            text-align: center;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkEmojiReactionButton from "~/components/buttons/emoji-reaction-button/OkEmojiReactionButton.vue";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { IEmoji } from "~/models/common/emoji/IEmoji";
    import OkReactionEmojiPicker from "~/components/pickers/reaction-emoji-picker/OkReactionEmojiPicker.vue";
    import { IPostCommentReaction } from "~/models/posts/post-comment-reaction/IPostCommentReaction";
    import { IPost } from "~/models/posts/post/IPost";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { IModalService } from "~/services/modal/IModalService";

    @Component({
        name: "OkReactToPostCommentButton",
        components: {OkReactionEmojiPicker, OkEmojiReactionButton},
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution
            }
        }
    })
    export default class OkReactToPostCommentButton extends Vue {
        @Prop(Object) readonly post: IPost;
        @Prop(Object) readonly postComment: IPostComment;

        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        requestInProgress = false;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        private reactWithEmojiOperation?: CancelableOperation<IPostCommentReaction>;
        private removeReactionOperation?: CancelableOperation<void>;

        reactTooltipIsOpen = false;

        destroyed() {
            if (this.removeReactionOperation) this.removeReactionOperation.cancel();
            if (this.reactWithEmojiOperation) this.reactWithEmojiOperation.cancel();
        }

        async onReactButtonPressed() {
            if (this.requestInProgress) return;

            if (this.postComment.reaction) {
                await this.removeCurrentReaction();
            } else {
                this.onWantsToReactToPostComment();
            }
        }

        onWantsToReactToPostComment() {
            if (this.$observables.environmentResolution.value === EnvironmentResolution.desktop) {
                this.openReactionsPicker();
            } else {
                this.modalService.openPostCommentReactionsModal({
                    post: this.post,
                    postComment: this.postComment,
                    onRequestInProgress: this.onReactorRequestInProgress,
                    onReacted: this.onReacted
                });
            }
        }


        onReactionEmojiPicked(emoji: IEmoji) {
            this.reactWithEmoji(emoji);
        }

        onReactorRequestInProgress(requestInProgress: boolean) {
            this.requestInProgress = requestInProgress;
        }

        onReacted(postCommentReaction: IPostCommentReaction) {
            this.closeReactionsPicker();
        }

        private closeReactionsPicker() {
            this.reactTooltipIsOpen = false;
        }

        private openReactionsPicker() {
            this.reactTooltipIsOpen = true;
        }

        private async removeCurrentReaction() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;
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
                this.requestInProgress = false;
            }
        }


        private async reactWithEmoji(emoji: IEmoji) {
            if (this.requestInProgress) return;
            this.requestInProgress = true;

            try {
                this.reactWithEmojiOperation = CancelableOperation.fromPromise(this.userService.reactToPostComment({
                    post: this.post,
                    postComment: this.postComment,
                    emoji: emoji
                }));

                const postCommentReaction = await this.reactWithEmojiOperation.value;
                this.postComment.setReaction(postCommentReaction);
                this.reactTooltipIsOpen = false;
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.reactWithEmojiOperation = null;
                this.requestInProgress = false;
            }
        }

    }
</script>
