<template>
    <figure class="image is-flex justify-center align-items-center has-text-weight-bold"
            v-if="activeTheme"
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
    import { IThemeService } from "~/services/theme/IThemeService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { OkThemeColorType } from "~/services/theme/ThemeService";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { ITheme } from "~/models/common/theme/ITheme";

    @Component({
        name: "OkLetterAvatar",
        subscriptions: function () {
            return {
                activeTheme: this["themeService"].activeTheme,
            }
        }
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

        private themeService: IThemeService = okunaContainer.get<IThemeService>(TYPES.ThemeService);


        $observables!: {
            activeTheme: BehaviorSubject<ITheme | undefined>,
        };

        get cssStyle() {
            return {
                backgroundColor: this.backgroundColor
                    ? this.backgroundColor.hex()
                    : this.themeService.getColorForThemeColorType(OkThemeColorType.primaryInvert).hex(),
                color: this.textColor ? this.textColor.hex() : this.themeService.getColorForThemeColorType(OkThemeColorType.primary).hex(),
            };
        }

        get borderRadiusClass() {
            return;
        }

        get cssClass() {
            let borderRadiusClass = this.avatarBorderRadius === OkAvatarBorderRadius.rounded ? "is-semi-rounded" : "is-rounded";
            let sizeClass;
            let textClass;

            switch (this.avatarSize) {
                case OkAvatarSize.extraLarge:
                    sizeClass = "is-128x128";
                    break;
                case OkAvatarSize.large:
                    sizeClass = "is-96x96";
                    textClass = "is-size-2"
                    break;
                case OkAvatarSize.medium:
                    sizeClass = "is-32x32";
                    break;
                case OkAvatarSize.extraMedium:
                    sizeClass = "is-64x64";
                    textClass = "is-size-2";
                    break;
                case OkAvatarSize.small:
                    sizeClass = "is-24x24";
                    break;
                case OkAvatarSize.extraSmall:
                    sizeClass = "is-16x16";
                    textClass = "is-size-7";
                    break;
            }


            return [borderRadiusClass, sizeClass, textClass];

        }


    }
</script>
