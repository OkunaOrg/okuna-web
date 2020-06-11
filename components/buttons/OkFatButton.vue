<template>
    <div v-if="activeTheme" class="is-semi-rounded ok-image-button" :style="buttonCssStyle" role="button">
        <div class="ok-image-button__content">
            <slot name="content"></slot>
        </div>
        <div :style="textCssStyle" class="ok-image-button__text has-padding-left-10 has-padding-right-10"
             :class="textCssClass">
            {{text}}
        </div>
    </div>
</template>

<style lang="scss">

    // For when used in tabs
    .is-active{
        .ok-image-button{
            transform: scale(1);
        }

        .ok-image-button__text {
            font-weight: bold;
        }
    }

    .ok-image-button {
        overflow: hidden;
        height: 85px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        position: relative;
        text-align: center;
        display: flex;
        flex-direction: column;
        min-width: 130px;
        transition: all .2s ease-in-out;
        transform: scale(.90);

        &:hover{
            //transform: scale(1);
        }

        &__content {
            flex: 1;
        }

        &__text {
            &:hover {
                text-decoration: none !important;
            }
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { ITheme } from "~/models/common/theme/ITheme";
    import { IThemeService } from "~/services/theme/IThemeService";
    import Color from "color";
    import { OkThemeColorType } from "~/services/theme/ThemeService";

    @Component({
        name: "OkFatButton",
        components: {},
        subscriptions: function () {
            return {
                activeTheme: this["themeService"].activeTheme
            }
        }
    })
    export default class OkFatButton extends Vue {

        @Prop({
            type: String,
            required: false
        }) readonly backgroundImageSrc: String;

        @Prop({
            type: String,
            required: true
        }) readonly text: String;

        @Prop({
            type: Object,
            required: false
        }) readonly textBackgroundColor: Color;

        @Prop({
            type: Number,
            required: false,
        }) readonly textBackgroundThemeColorType: OkThemeColorType;

        @Prop({
            type: Number,
            required: false,
        }) readonly contentThemeColorType: OkThemeColorType;

        @Prop({
            type: Object,
            required: false
        }) readonly textColor: Color;

        $observables!: {
            activeTheme: BehaviorSubject<ITheme | undefined>
        };


        private themeService: IThemeService = okunaContainer.get<IThemeService>(TYPES.ThemeService);


        get textCssStyle() {
            const activeTheme = this.$observables.activeTheme.value;


            return {
                "backgroundColor": this.textBackgroundColor ? this.textBackgroundColor.hex() : activeTheme.primaryHighlightColor.hsl().string(),
                "color": this.textColor ? this.textColor.hex() : activeTheme.primaryInvertColor.hex(),
            }
        }

        get buttonCssStyle() {
            let style = {};

            if (this.backgroundImageSrc) {
                style["backgroundImage"] = `url('${this.backgroundImageSrc}')`;
            }

            return style;
        }

        get textCssClass() {
            if (!this.textBackgroundThemeColorType) return;

            return this.themeService.getBackgroundClassForThemeColorType(this.textBackgroundThemeColorType)
        }


    }
</script>
