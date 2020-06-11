<template>
    <figure :style="{ backgroundImage: `url('${src}')`}" class="has-width-100-percent has-height-100-percent ok-covered-image has-background-covered">
        <img :alt="alt" :src="src" style="display: none;">
    </figure>
</template>

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
