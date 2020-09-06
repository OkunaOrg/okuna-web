<template>
    <div
            role="button"
            class="is-flex has-no-text-decoration is-paddingless">
        <ok-circle-preview :circle="circle" :circlePreviewSize="OkCirclePreviewSize.extraSmall"/>
        <span class="has-padding-left-5 is-size-7"> {{circle.name}} </span>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICircle } from "~/models/connections/circle/ICircle";
    import OkCirclePreview from "~/components/circle-preview/OkCirclePreview.vue";
    import { OkCirclePreviewSize } from '~/components/circle-preview/OkCirclePreviewSize';

    @Component({
        name: "OkCircleButton",
        components: {OkCirclePreview},
    })
    export default class OkCircleButton extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly circle: ICircle;

        OkCirclePreviewSize = OkCirclePreviewSize;


    }
</script>
