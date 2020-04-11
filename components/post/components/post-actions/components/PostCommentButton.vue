<template>
    <button
            class="button is-rounded ok-has-background-primary-highlight is-borderless is-fullwidth is-flex align-items-center has-no-hover-text-decoration"
            @click="onWantsToCommentPosts">
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
    import OkEmojiReactionButton from "~/components/buttons/emoji-reaction-button/EmojiReactionButton.vue";
    import { IModalService } from "~/services/modal-service/IModalService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";

    @Component({
        name: "OkPostCommentButton",
        components: {OkEmojiReactionButton},
    })
    export default class OkPostCommentButton extends Vue {
        @Prop(Object) readonly post: IPost;
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);


        mounted() {
        }

        onWantsToCommentPosts() {
            this.modalService.openPostModal({
                post: this.post
            });
        }

        get postPath() {
            return `/p/${this.post.uuid}`;
        }

    }
</script>
