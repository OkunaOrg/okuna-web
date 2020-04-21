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
        <ok-post-reactor slot="popover" :post="post" @onReacted="onReacted"
                         @onReactorRequestInProgress="onReactorRequestInProgress"></ok-post-reactor>
    </v-popover>
</template>

<style lang="scss">
    .ok-post-react-button-container {
        .trigger {
            width: 100% !important;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkEmojiReactionButton from "~/components/buttons/emoji-reaction-button/OkEmojiReactionButton.vue";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { IPostReaction } from "~/models/posts/post-reaction/IPostReaction";
    import OkReactionEmojiPicker from "~/components/pickers/reaction-emoji-picker/OkReactionEmojiPicker.vue";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { IModalService } from "~/services/modal/IModalService";
    import OkPostReactor from "~/components/reactors/post-reactor/OkPostReactor.vue";

    @Component({
        name: "OkReactToPostButton",
        components: {OkPostReactor, OkReactionEmojiPicker, OkEmojiReactionButton},
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution
            }
        }
    })
    export default class OkReactToPostButton extends Vue {
        @Prop(Object) readonly post: IPost;


        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        reactTooltipIsOpen = false;
        requestInProgress = false;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        private removeReactionOperation?: CancelableOperation<void>;


        destroyed() {
            if (this.removeReactionOperation) this.removeReactionOperation.cancel();
        }

        async onReactButtonPressed() {
            if (this.requestInProgress) return;

            if (this.post.reaction) {
                await this.removeCurrentReaction();
            } else {
                this.onWantsToReactToPost();
            }

        }

        private onWantsToReactToPost() {
            if (this.$observables.environmentResolution.value === EnvironmentResolution.desktop) {
                this.openReactionsPicker();
            } else {
                this.modalService.openPostReactionsModal({
                    post: this.post,
                    onRequestInProgress: this.onReactorRequestInProgress,
                    onReacted: this.onReacted
                });
            }
        }

        onReacted(postReaction: IPostReaction) {
            this.closeReactionsPicker();
        }

        onReactorRequestInProgress(requestInProgress: boolean) {
            this.requestInProgress = requestInProgress;
        }

        private openReactionsPicker() {
            this.reactTooltipIsOpen = true;
        }

        private closeReactionsPicker() {
            this.reactTooltipIsOpen = false;
        }

        private async removeCurrentReaction() {
            if (this.requestInProgress) return;
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

    }
</script>
