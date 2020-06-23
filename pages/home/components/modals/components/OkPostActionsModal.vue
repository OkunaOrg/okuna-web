<template>
    <div class="is-flex justify-center align-items-center">
        <ok-post-actions :post="params.post" class="ok-post-actions-modal"></ok-post-actions>
    </div>
</template>

<style lang="scss">
    .ok-post-actions-modal{
        max-width: 350px;
        width: 100%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";
    import { PostActionsModalParams } from '~/services/modal/IModalService';
    import OkPostActions from '~/components/actions/post-actions/OkPostActions.vue';

    @Component({
        name: "OkPostActionsModal",
        components: {OkPostActions, OkPostTheatre},
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

    }
</script>