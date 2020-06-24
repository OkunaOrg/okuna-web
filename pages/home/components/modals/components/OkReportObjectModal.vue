<template>

</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";
    import { ReportObjectModalParams } from "~/services/modal/IModalService";

    @Component({
        name: "OkReportObjectModal",
        components: {OkPostTheatre},
    })
    export default class OkReportObjectModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: ReportObjectModalParams;

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

    }
</script>