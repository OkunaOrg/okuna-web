<template>
    <figure :style="{ backgroundImage: `url('${src}')`}" class="ok-covered-image">
        <img :alt="alt" :src="src" style="display: none;">
    </figure>
</template>

<style lang="scss" scoped>
    .ok-covered-image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkCoveredImage",
    })
    export default class OkCoveredImage extends Vue {
        @Prop(String) readonly src: string;

        @Prop(String) readonly alt: string;

    }
</script>
