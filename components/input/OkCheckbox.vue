<template>
    <b-checkbox
            :disabled="disabled"
            style="pointer-events: none"
            v-model="checked">
    </b-checkbox>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"

    @Component({
        name: "OkCheckbox",
    })
    export default class OkCheckbox extends Vue {

        @Prop({
            type: Boolean,
            required: true
        }) readonly checked: boolean;

        @Prop({
            type: Boolean,
            required: false,
            default: false,
        }) readonly disabled: boolean;
    }
</script>
