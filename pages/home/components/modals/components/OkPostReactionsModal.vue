<template>
    <ok-post-reactor :post="params.post" @onReacted="onReacted"
                     :is-full-width="true"
                     @onReactorRequestInProgress="params.onRequestInProgress"></ok-post-reactor>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";
    import { PostReactionsModalParams } from '~/services/modal/IModalService';
    import OkPostReactor from '~/components/reactors/post-reactor/OkPostReactor.vue';
    import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';

    @Component({
        name: "OkPostReactionsModal",
        components: {OkPostReactor, OkPostTheatre},
    })
    export default class OkPostReactionsModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: PostReactionsModalParams;

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        onReacted(postReaction: IPostReaction){
            this.$parent['close']();
            this.params.onReacted(postReaction);
        }

    }
</script>