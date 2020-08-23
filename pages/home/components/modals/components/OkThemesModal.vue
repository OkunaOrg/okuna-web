<template>
    <div class="is-flex justify-center align-items-center" v-if="activeTheme">
        <div class="ok-has-background-primary is-semi-rounded">
            <div class="box ok-has-background-primary-highlight has-height-100-percent" style="max-width: 420px">
                <div class="columns is-multiline is-mobile is-centered" v-if="curatedThemes && curatedThemes.length">
                    <div
                        class="ok-themes-wrapper is-narrow has-padding-20"
                        v-for="theme in curatedThemes"
                        :key="theme.id"
                        @click="onThemeClick(theme)"
                    >
                        <div class="ok-theme-circle has-margin-bottom-10" :class="{ 'ok-has-border-accent': theme === activeTheme }">
                            <div class="accent-gradient" :style="getThemeGradientStyles(theme)"></div>
                            <div class="primary" :style="getThemePrimaryStyles(theme)"></div>
                        </div>
                        <div class="ok-has-text-primary-invert is-size-7 has-text-centered">{{ theme.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import { BehaviorSubject } from "rxjs";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IThemeService } from "~/services/theme/IThemeService";
    import { ITheme } from "~/models/common/theme/ITheme";
    import { ThemeModalParams } from "~/services/modal/IModalService";

    @Component({
        name: "OkThemesModal",
        subscriptions: function () {
            return {
                activeTheme: this["themeService"].activeTheme
            };
        }
    })
    export default class OkThemesModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: ThemeModalParams;

        $observables!: {
            activeTheme: BehaviorSubject<ITheme | undefined>
        }

        private themeService: IThemeService = okunaContainer.get<IThemeService>(TYPES.ThemeService);

        private curatedThemes: ITheme[] = this.themeService.getCuratedThemes();

        getThemePrimaryStyles(theme: ITheme) {
            return {
                background: theme.primaryColor.hex()
            };
        }

        getThemeGradientStyles(theme: ITheme) {
            const [ from, to ] = theme.accentGradient.map(c => c.hex());
            return {
                background: from,
                backgroundImage: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`
            };
        }

        onThemeClick(theme: ITheme) {
            return this.themeService.setActiveTheme(theme);
        }

        onClosePressed() {
            this.$parent["close"]();
        }
    }
</script>

<style lang="scss">
    .ok-themes-wrapper {
        cursor: pointer;
        width: 100px;
    }

    .ok-theme-circle {
        width: 40px;
        height: 40px;
        font-size: 0;
        border-radius: 100%;
        overflow: hidden;
        transform: rotate(-45deg);
        border: 3px solid transparent;
        margin: 0 auto;

        .primary, .accent-gradient {
            width: 50%;
            height: 40px;
            display: inline-block;
        }

        &.ok-has-border-accent {
            border-width: 3px !important;
        }
    }
</style>
