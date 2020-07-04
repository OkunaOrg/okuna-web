<template>
    <div class="is-flex justify-center align-items-center">
        <ok-connections-circles-picker
                :initial-connections-circles="params.initialConnectionsCircles"
                :disabled-connections-circles="params.disabledConnectionsCircles"
                :initial-connections-circles-ids="params.initialConnectionsCirclesIds"
                :disabled-connections-circles-ids="params.disabledConnectionsCirclesIds"
                :title="params.title"
                :action-label="params.actionLabel"
                :on-wants-to-pick-circles="params.onWantsToPickCircles"
                @onPickedCircles="onPickedCircles"
        ></ok-connections-circles-picker>
    </div>
</template>

<style lang="scss">
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";
    import { ConnectionsCirclesPickerModalParams } from "~/services/modal/IModalService";
    import OkPostMoreActions from "~/components/actions/post-more-actions/OkPostMoreActions.vue";
    import OkConnectionsCirclesPicker
        from "~/components/pickers/connections-circles-picker/OkConnectionsCirclesPicker.vue";
    import { ICircle } from "~/models/connections/circle/ICircle";

    @Component({
        name: "OkConnectionsCirclesPickerModal",
        components: {OkConnectionsCirclesPicker, OkPostMoreActions, OkPostTheatre},
    })
    export default class OkConnectionsCirclesPickerModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: ConnectionsCirclesPickerModalParams;

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;


        onPickedCircles(circles: ICircle[]) {
            this.$parent["close"]();
        }


    }
</script>