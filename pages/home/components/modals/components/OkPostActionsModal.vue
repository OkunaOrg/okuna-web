<template>
    <div class="is-flex justify-center align-items-center">
        <ok-post-more-actions :post="params.post" class="ok-actions-modal"
                         @onPostDeleted="onPostDeleted"
                         @onPostCommentsEnabledChange="onPostCommentsEnabledChange"
                         @onPostClosedChange="onPostClosedChange"
                         :on-post-reported="params.onPostReported"></ok-post-more-actions>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";
    import { PostActionsModalParams } from "~/services/modal/IModalService";
    import { IPost } from "~/models/posts/post/IPost";
    import OkPostMoreActions from '~/components/actions/post-more-actions/OkPostMoreActions.vue';

    @Component({
        name: "OkPostActionsModal",
        components: {OkPostMoreActions, OkPostTheatre},
    })
    export default class OkPostActionsModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: PostActionsModalParams;

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        onPostDeleted(post: IPost) {
            this.$parent["close"]();
            if (this.params.onPostDeleted) this.params.onPostDeleted(post);
        }

        onPostCommentsEnabledChange(commentsEnabled: boolean) {
            this.$parent["close"]();
        }

        onPostClosedChange(postIsClosed: boolean) {
            this.$parent["close"]();
        }

    }
</script>
