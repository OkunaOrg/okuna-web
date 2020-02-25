<template>
    <v-popover class="has-width-100-percent ok-post-react-button-container"
               offset="20"
               placement="bottom-end"
               :open.sync="reactTooltipIsOpen"
               trigger="manual"
    >
        <!-- This will be the popover target (for the events and position) -->
        <button
                class="button is-rounded ok-has-background-primary-highlight is-borderless is-fullwidth is-flex align-items-center"
                :class="{'ok-has-background-accent-gradient': post.reaction, 'is-loading': requestInProgress}"
                @click="onReactButtonPressed"
        >
                        <span class="image is-16x16" v-if="post.reaction">
                            <img :src="post.reaction.emoji.image" :alt="post.reaction.emoji.keyword">
                        </span>
            <ok-react-icon class="is-icon-2x ok-svg-icon-primary-invert" v-else></ok-react-icon>
            <span class="has-padding-left-10"
                  :class="{'has-text-weight-bold': post.reaction, 'has-text-white': post.reaction, 'ok-has-text-primary-invert' : !post.reaction}">
                            {{post.reaction ? post.reaction.emoji.keyword : 'React'}}
                        </span>
        </button>
        <!-- This will be the content of the popover -->
        <ok-reaction-emoji-picker slot="popover" @onReactionPicked="onReactionEmojiPicked" :is-loading="requestInProgress"/>
    </v-popover>
</template>

<style lang="scss">
    .ok-post-react-button-container{
        .trigger{
            width: 100% !important;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkEmojiReactionButton from "~/components/buttons/emoji-reaction-button/EmojiReactionButton.vue";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils-service/IUtilsService";
    import { IEmoji } from '~/models/common/emoji/IEmoji';
    import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';
    import OkReactionEmojiPicker from '~/components/pickers/reaction-emoji-picker/ReactionEmojiPicker.vue';

    @Component({
        name: "OkPostReactButton",
        components: {OkReactionEmojiPicker, OkEmojiReactionButton},
    })
    export default class OkPostReactButton extends Vue {
        @Prop(Object) readonly post: IPost;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        private reactWithEmojiOperation?: CancelableOperation<IPostReaction>;
        private removeReactionOperation?: CancelableOperation<void>;

        requestInProgress = false;


        reactTooltipIsOpen = false;

        destroyed() {
            if (this.removeReactionOperation) this.removeReactionOperation.cancel();
            if (this.reactWithEmojiOperation) this.reactWithEmojiOperation.cancel();
        }

        get postHasReaction(){
            return !! this.post.reaction;
        }

        async onReactButtonPressed() {
            if (this.requestInProgress) return;

            if (this.post.reaction) {
                await this.removeCurrentReaction();
            } else {
                this.openReactionsPicker();
            }

        }

        onReactionEmojiPicked(emoji: IEmoji){
            this.reactWithEmoji(emoji);
        }

        private openReactionsPicker() {
            this.reactTooltipIsOpen = true;
        }

        private async removeCurrentReaction() {
            if(this.requestInProgress) return;
            this.requestInProgress = true;
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
                this.requestInProgress = false;
            }
        }


        private async reactWithEmoji(emoji: IEmoji) {
            if(this.requestInProgress) return;
            this.requestInProgress = true;

            try {
                this.reactWithEmojiOperation = CancelableOperation.fromPromise(this.userService.reactToPost({
                    post: this.post,
                    emoji: emoji
                }));

                const postReaction = await this.reactWithEmojiOperation.value;
                this.post.setReaction(postReaction);
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
