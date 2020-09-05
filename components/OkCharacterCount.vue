<template>
    <span :class="charactersCountCssClass" class="is-size-6">
        {{remainingCharacters}}
    </span>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"

    @Component({
        name: "OkCharacterCount",
    })
    export default class OkCharacterCount extends Vue {

        @Prop(Number) readonly maxCharacters: number;
        @Prop(Number) readonly characterCount: number;

        exceededMaxCharacters = false;

        @Watch("characterCount")
        onChildChanged(val: number, oldVal: number) {
            this.exceededMaxCharacters = this.characterCount > this.maxCharacters;
        }

        get charactersCountCssClass() : string{
            return this.exceededMaxCharacters ? "ok-has-text-error" : "ok-has-text-primary-invert-60"
        }

        get remainingCharacters() : number{
            return this.maxCharacters - this.characterCount;
        }
    }
</script>
