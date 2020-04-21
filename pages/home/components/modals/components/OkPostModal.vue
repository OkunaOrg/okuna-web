<template>
    <ok-post-theatre :post="params.post"></ok-post-theatre>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";
    import { PostModalParams } from '~/services/modal/IModalService';

    @Component({
        name: "OkPostModal",
        components: {OkPostTheatre},
    })
    export default class OkPostModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: PostModalParams;

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

    }
</script>