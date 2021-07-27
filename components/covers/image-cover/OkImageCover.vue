<template>
    <div v-if="this.finalCoverUrl" :class="coverClass">
        <ok-covered-image :src="finalCoverUrl" :alt="'cover'"></ok-covered-image>
    </div>
</template>

<style lang="scss">
    .ok-image-cover-extra-small {
        height: 115px;

        @include for-size(desktop-up) {
            height: 150px;
        }
    }

    .ok-image-cover-small {
        height: 140px;

        @include for-size(desktop-up) {
            height: 190px;
        }
    }

    .ok-image-cover-medium {
        height: 160px;

        @include for-size(desktop-up) {
            height: 240px;
        }
    }

    .ok-image-cover-large {
        height: 190px;

        @include for-size(desktop-up) {
            height: 300px;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkCoverSize } from "~/components/covers/lib/OkCoverSize";
    import OkCoveredImage from "~/components/images/OkCoveredImage.vue";

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
            if (this.coverUrl) return this.coverUrl;
            return require("./assets/cover-fallback.jpg");
        }

        get coverClass() {
            switch (this.coverSize) {
                case OkCoverSize.extraSmall:
                    return "ok-image-cover-extra-small";
                case OkCoverSize.small:
                    return "ok-image-cover-small";
                case OkCoverSize.medium:
                    return "ok-image-cover-medium";
                case OkCoverSize.large:
                    return "ok-image-cover-large";

            }
        }


    }
</script>
