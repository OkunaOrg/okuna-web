<template>
    <div class="is-flex justify-center align-items-center">
        <ok-post-comment-more-actions :post-comment="params.postComment" :post="params.post"
                                      class="ok-actions-modal"
                                      @onPostCommentDeleted="onPostCommentDeleted"
                                      :on-post-comment-reported="params.onPostCommentReported"></ok-post-comment-more-actions>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { PostCommentActionsModalParams } from "~/services/modal/IModalService";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";
    import OkPostCommentMoreActions from "~/components/actions/post-comment-more-actions/OkPostCommentMoreActions.vue";
    import { IPost } from "~/models/posts/post/IPost";

    @Component({
        name: "OkPostCommentActionsModal",
        components: {OkPostCommentMoreActions},
    })
    export default class OkPostCommentActionsModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: PostCommentActionsModalParams;

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        onPostCommentDeleted(postComment: IPostComment, post: IPost) {
            this.$parent["close"]();
            if (this.params.onPostCommentDeleted) this.params.onPostCommentDeleted(postComment, post);
        }

    }
</script>
