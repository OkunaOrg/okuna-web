<template>
    <span :class="charactersCountCssClass" class="is-size-6"> {{ characterCount }} / {{ maxCharacters }}</span>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"

    @Component({
        name: "OkCharacterCount",
    })
    export default class OkCharacterCount extends Vue {

        @Prop(Number) readonly maxCharacters: string;
        @Prop(Number) readonly characterCount: string;

        exceededMaxCharacters = false;

        @Watch("characterCount")
        onChildChanged(val: number, oldVal: number) {
            this.exceededMaxCharacters = this.characterCount > this.maxCharacters;
        }

        get charactersCountCssClass() {
            return this.exceededMaxCharacters ? "ok-has-text-error" : "ok-has-text-primary-invert-60"
        }
    }
</script>
