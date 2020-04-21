<template>
    <button v-if="environmentResolution"
            class="button is-rounded ok-has-background-primary-highlight is-borderless is-fullwidth is-flex align-items-center has-no-hover-text-decoration"
            @click="onWantsToCommentPost">
        <ok-comment-icon class="is-icon-2x ok-svg-icon-primary-invert"></ok-comment-icon>
        <span class="has-padding-left-10 ok-has-text-primary-invert">
                            Comment
        </span>
    </button>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkEmojiReactionButton from "~/components/buttons/emoji-reaction-button/OkEmojiReactionButton.vue";
    import { IModalService } from "~/services/modal/IModalService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { INavigationService } from "~/services/navigation/INavigationService";

    @Component({
        name: "OkCommentPostButton",
        components: {OkEmojiReactionButton},
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution
            }
        }
    })
    export default class OkCommentPostButton extends Vue {
        @Prop(Object) readonly post: IPost;

        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;

        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);


        mounted() {
        }

        onWantsToCommentPost() {
            if (this.$observables.environmentResolution.value === EnvironmentResolution.desktop) {
                this.modalService.openPostModal({
                    post: this.post
                });
            } else {
                this.navigationService.navigateToPost({
                    post: this.post
                });
            }
        }

    }
</script>
