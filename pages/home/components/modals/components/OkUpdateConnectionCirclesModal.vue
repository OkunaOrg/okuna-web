<template>
    <div class="is-flex justify-center align-items-center">
        <ok-connections-circles-picker></ok-connections-circles-picker>
    </div>
</template>

<style lang="scss">
    .ok-post-actions-modal {
        max-width: 350px;
        width: 100%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";
    import { PostActionsModalParams } from "~/services/modal/IModalService";
    import { IPost } from "~/models/posts/post/IPost";
    import OkPostMoreActions from '~/components/actions/post-more-actions/OkPostMoreActions.vue';
    import OkConnectionsCirclesPicker
        from '~/components/pickers/connections-circles-picker/OkConnectionsCirclesPicker.vue';

    @Component({
        name: "OkUpdateConnectionCirclesModal",
        components: {OkConnectionsCirclesPicker, OkPostMoreActions, OkPostTheatre},
    })
    export default class OkUpdateConnectionCirclesModal extends Vue {
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