<template>
    <ok-post-comment-reactor :post="params.post" :post-comment="params.postComment" @onReacted="onReacted"
                     :is-full-width="true"
                     @onReactorRequestInProgress="params.onRequestInProgress"></ok-post-comment-reactor>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { PostCommentReactionsModalParams } from "~/services/modal/IModalService";
    import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';
    import OkPostCommentReactor from '~/components/reactors/post-comment-reactor/OkPostCommentReactor.vue';

    @Component({
        name: "OkPostCommentReactionsModal",
        components: {OkPostCommentReactor},
    })
    export default class OkPostCommentReactionsModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: PostCommentReactionsModalParams;

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        onReacted(postCommentReaction: IPostCommentReaction){
            this.$parent['close']();
            this.params.onReacted(postCommentReaction);
        }

    }
</script>