<template>
    <figure :style="{ backgroundImage: `url('${src}')`}" class="ok-fitted-img">
        <img :alt="alt" :src="src" style="display: none;">
    </figure>
</template>

<style lang="scss" scoped>
    .ok-fitted-img {
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
        name: "OkFittedImg",

    })
    export default class OkFittedImg extends Vue {
        @Prop(String) readonly src: string;

        @Prop(String) readonly alt: string;

    }
</script>
