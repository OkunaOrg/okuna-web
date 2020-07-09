<template>
    <figure class="image is-flex justify-center align-items-center has-text-weight-bold has-border-radius-500"
            v-if="activeTheme"
            :class="cssClass"
            :style="cssStyle">
    </figure>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { ITheme } from "~/models/common/theme/ITheme";
    import { OkCirclePreviewSize } from "~/components/circle-preview/OkCirclePreviewSize";
    import { ICircle } from "~/models/connections/circle/ICircle";
    import { IThemeService } from "~/services/theme/IThemeService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { OkThemeColorType } from "~/services/theme/ThemeService";

    @Component({
        name: "OkCirclePreview",
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
            default: OkCirclePreviewSize.medium
        }) readonly circlePreviewSize: OkCirclePreviewSize;

        @Prop({
            type: Object,
            required: true,
        }) readonly circle: ICircle;

        @Prop({
            type: Boolean,
        }) readonly isDisabled: boolean;

        readonly OkCirclePreviewSize = OkCirclePreviewSize;

        private themeService: IThemeService = okunaContainer.get<IThemeService>(TYPES.ThemeService);

        $observables!: {
            activeTheme: BehaviorSubject<ITheme | undefined>,
        };

        get cssStyle() {
            return {
                backgroundColor: this.circle.color.hex(),
                border: `solid 2px ${this.themeService.getColorForThemeColorType(OkThemeColorType.primaryHighlight).hsl().toString()}`,
            };
        }

        get cssClass() {

            const cssClasses = [];

            let sizeClass;

            switch (this.circlePreviewSize) {
                case OkCirclePreviewSize.large:
                    sizeClass = "is-128x128";
                    break;
                case OkCirclePreviewSize.medium:
                    sizeClass = "is-32x32";
                    break;
                case OkCirclePreviewSize.small:
                    sizeClass = "is-24x24";
                    break;
                case OkCirclePreviewSize.extraSmall:
                    sizeClass = "is-16x16";
                    break;
            }

            cssClasses.push(sizeClass);


            if (this.isDisabled) cssClasses.push("is-disabled");

            return cssClasses;

        }


    }
</script>
