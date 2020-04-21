<template>
    <span class="ok-has-text-primary-invert-80 is-size-6 has-cursor-pointer" role="button" @click="onWantsToViewAllComments">
        {{viewAllCommentsText}}
    </span>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkEmojiReactionButton from "~/components/buttons/emoji-reaction-button/OkEmojiReactionButton.vue";
    import { TYPES } from "~/services/inversify-types";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { okunaContainer } from "~/services/inversify";
    import { IModalService } from '~/services/modal/IModalService';
    import { EnvironmentResolution } from '~/services/environment/lib/EnvironmentResolution';
    import { BehaviorSubject } from '~/node_modules/rxjs';
    import { INavigationService } from '~/services/navigation/INavigationService';

    @Component({
        name: "OkPostCommentCounts",
        components: {OkEmojiReactionButton},
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution
            }
        }
    })
    export default class OkPostCommentCounts extends Vue {
        @Prop(Object) readonly post: IPost;

        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };


        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);
        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);

        mounted() {
        }


        onWantsToViewAllComments() {
            if (this.$observables.environmentResolution.value === EnvironmentResolution.desktop) {
                this.modalService.openPostModal({
                    post: this.post
                });
            } else {
                this.navigationService.navigateToPost({
                    post: this.post
                })
            }
        }


        get viewAllCommentsText() {
            const isSingleComment = this.post.commentsCount === 1;
            return isSingleComment ? "View 1 comment" : `View all ${this.post.commentsCount} comments`
        }
    }
</script>
