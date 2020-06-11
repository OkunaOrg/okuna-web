<template>
    <figure :style="{ backgroundImage: `url('${src}')`}" class="has-width-100-percent has-height-100-percent ok-covered-image has-background-contained">
        <img :alt="alt" :src="src" style="display: none;">
    </figure>
</template>

<style lang="scss" scoped>
    .ok-contained-img {
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkContainedImage",

    })
    export default class OkContainedImage extends Vue {
        @Prop(String) readonly src: string;

        @Prop(String) readonly alt: string;

    }
</script>
