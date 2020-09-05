<template>
    <div v-if="this.finalAvatarUrl">
        <figure :class="imgClass" v-if="imageFit === OkImageFit.auto">
            <img
                    style="height: 100%; width: 100%"
                    :src="this.finalAvatarUrl" alt="avatar" :class="borderRadiusClass">
        </figure>
        <div :class="imgClass" v-else>
            <ok-covered-image :src="this.finalAvatarUrl" alt="avatar" :class="borderRadiusClass"></ok-covered-image>
        </div>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { OkAvatarBorderRadius } from "~/components/avatars/lib/OkAvatarBorderRadius";
    import { OkImageFit } from "~/components/images/OkImageFit";
    import OkCoveredImage from "~/components/images/OkCoveredImage.vue";

    @Component({
        name: "OkImageAvatar",
        components: {OkCoveredImage},
    })
    export default class extends Vue {
        @Prop(String) readonly avatarUrl: string;
        @Prop(Object) readonly avatarFile: File;

        @Prop({
            type: Number,
            default: OkAvatarSize.medium
        }) readonly avatarSize: OkAvatarSize;

        @Prop({
            type: Number,
            default: OkImageFit.auto
        }) readonly imageFit: OkImageFit;

        @Prop({
            type: Number,
            default: OkAvatarBorderRadius.rounded
        }) readonly avatarBorderRadius: OkAvatarBorderRadius;

        readonly OkAvatarSize = OkAvatarSize;

        readonly OkImageFit = OkImageFit;

        get finalAvatarUrl() {
            if (this.avatarFile) return URL.createObjectURL(this.avatarFile);
            if (this.avatarUrl) return this.avatarUrl;
            return require("./assets/avatar-fallback.jpg");
        }

        get borderRadiusClass() {
            return this.avatarBorderRadius === OkAvatarBorderRadius.rounded ? "is-semi-rounded" : "is-rounded";
        }

        get imgClass() {
            let sizeClass;

            switch (this.avatarSize) {
                case OkAvatarSize.extraSmall:
                    sizeClass = "is-16x16";
                    break;
                case OkAvatarSize.small:
                    sizeClass = "is-24x24";
                    break;
                case OkAvatarSize.medium:
                    sizeClass = "is-32x32";
                    break;
                case OkAvatarSize.extraMedium:
                    sizeClass = "is-64x64";
                    break;
                case OkAvatarSize.large:
                    sizeClass = "is-96x96";
                    break;
                case OkAvatarSize.extraLarge:
                    sizeClass = "is-128x128";
                    break;

            }

            return ["image", sizeClass]
        }


    }
</script>
