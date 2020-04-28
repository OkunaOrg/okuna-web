<template>
    <figure class="image is-flex justify-center align-items-center has-text-weight-bold"
            :class="cssClass"
            :style="cssStyle">
        <span>{{letter.toUpperCase()}}</span>
    </figure>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { OkAvatarBorderRadius } from "~/components/avatars/lib/OkAvatarBorderRadius";
    import Color from "color";

    @Component({
        name: "OkLetterAvatar",
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
            default: OkAvatarBorderRadius.rounded
        }) readonly avatarBorderRadius: OkAvatarBorderRadius;

        @Prop({
            type: String,
            required: true
        }) readonly letter: String;

        @Prop({
            type: Object,
            required: true,
        }) readonly textColor: Color;

        @Prop({
            type: Object,
            required: true,
        }) readonly backgroundColor: Color;

        readonly OkAvatarSize = OkAvatarSize;

        get cssStyle() {
            return {
                backgroundColor: this.backgroundColor.hex(),
                color: this.textColor.hex(),
            }
        }

        get borderRadiusClass() {
            return;
        }

        get cssClass() {
            let borderRadiusClass = this.avatarBorderRadius === OkAvatarBorderRadius.rounded ? "is-semi-rounded" : "is-rounded";
            let sizeClass;

            switch (this.avatarSize) {
                case OkAvatarSize.large:
                    sizeClass = "is-128x128";
                    break;
                case OkAvatarSize.medium:
                    sizeClass = "is-32x32";
                    break;
                case OkAvatarSize.small:
                    sizeClass = "is-24x24";
                    break;
                case OkAvatarSize.extraSmall:
                    sizeClass = "is-16x16";
                    break;
            }

            return [borderRadiusClass, sizeClass];

        }


    }
</script>
