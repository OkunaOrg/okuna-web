<template>
    <mark class="custom" @click="onClicked">
        <slot></slot>
    </mark>
</template>
<style lang="scss" scoped>


</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkSmartTextHighlightedItem",
    })
    export default class extends Vue {

        @Prop(String) readonly text: string;
        @Prop(Number) readonly index: number;

        mounted() {
        }

        onClicked() {
            if (this.text.startsWith("#")) {
                this.$emit("onHashtagPressed", this.text.substring(1));
            } else if (this.text.startsWith("c/")) {
                this.$emit("onCommunityNamePressed", this.text.substring(2));
            } else if (this.text.startsWith("@")) {
                this.$emit("onUsernamePressed", this.text.substring(1));
            } else {
                this.$emit("onUrlPressed", this.text);
            }
        }


    }
</script>
