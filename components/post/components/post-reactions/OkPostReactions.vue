<template>
    <div class="is-flex wrap is-in-progress" :class="{'is-loading' : requestInProgress}">
        <div v-for="reactionsEmojiCount in post.reactionsEmojiCounts"
             :key="reactionsEmojiCount.emoji.id" class="has-padding-5">
            <ok-emoji-reaction-button
                    :emoji-count="reactionsEmojiCount"
                    :is-current-reaction="post.reaction && post.reaction.emoji.id === reactionsEmojiCount.emoji.id"
                    @onPressed="onEmojiReactionButtonPressed"
            ></ok-emoji-reaction-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkEmojiReactionButton from "~/components/buttons/emoji-reaction-button/OkEmojiReactionButton.vue";
    import { IReactionsEmojiCount } from "~/models/posts/reactions-emoji-count/IReactionsEmojiCount";
    import { IEmoji } from "~/models/common/emoji/IEmoji";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IPostReaction } from "~/models/posts/post-reaction/IPostReaction";

    @Component({
        name: "OkPostReactions",
        components: {OkEmojiReactionButton},
    })
    export default class OkPostReactions extends Vue {
        @Prop(Object) readonly post: IPost;

        requestInProgress = false;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        private reactWithEmojiOperation?: CancelableOperation<IPostReaction>;
        private removeReactionOperation?: CancelableOperation<void>;


        destroyed() {
            if (this.reactWithEmojiOperation) this.reactWithEmojiOperation.cancel();
            if (this.removeReactionOperation) this.removeReactionOperation.cancel();
        }

        async onEmojiReactionButtonPressed(reactionsEmojiCount: IReactionsEmojiCount) {
            if (this.requestInProgress) return;
            this.requestInProgress = true;

            const tappedEmojiReactionButtonIsCurrentReaction = this.post.reaction && this.post.reaction.emoji.id === reactionsEmojiCount.emoji.id;

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
                this.reactWithEmojiOperation = CancelableOperation.fromPromise(this.userService.reactToPost({
                    post: this.post,
                    emoji: emoji
                }));

                const postReaction = await this.reactWithEmojiOperation.value;
                this.post.setReaction(postReaction);
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.reactWithEmojiOperation = null;
            }
        }

        private async removeCurrentReaction() {
            try {
                this.removeReactionOperation = CancelableOperation.fromPromise(this.userService.deletePostReaction({
                    post: this.post,
                    postReaction: this.post.reaction
                }));
                this.post.clearReaction();
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.removeReactionOperation = null;
            }
        }
    }
</script>
