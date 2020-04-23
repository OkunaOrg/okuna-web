<template>
    <div v-if="this.finalCoverUrl" :class="coverClass">
        <ok-covered-image :src="finalCoverUrl" :alt="'cover'"></ok-covered-image>
    </div>
</template>

<style lang="scss">

    .ok-image-cover-medium {
        height: 190px;
    }

    .ok-image-cover-large {
        height: 190px;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkCoverSize } from "~/components/covers/lib/OkCoverSize";
    import OkCoveredImage from '~/components/images/OkCoveredImage.vue';

    @Component({
        name: "OkImageCover",
        components: {OkCoveredImage},
    })
    export default class extends Vue {
        @Prop(String) readonly coverUrl: string;
        @Prop(Object) readonly coverFile: File;

        @Prop({
            type: Number,
            default: OkCoverSize.medium
        }) readonly coverSize: OkCoverSize;

        readonly OkCoverSize = OkCoverSize;

        get finalCoverUrl() {
            if (this.coverFile) return URL.createObjectURL(this.coverFile);
            return this.coverUrl;
        }

        get coverClass() {
            return this.coverSize === OkCoverSize.large ? 'ok-image-cover-large' : 'ok-image-cover-medium';
        }


    }
</script>
