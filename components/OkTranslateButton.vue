<template>
    <div>
        <ok-loading-indicator v-if="isTranslationInProgress"
                              class="has-width-fit-content"
                              :size="2">
        </ok-loading-indicator>
        <div v-else
             class="ok-has-text-primary-invert-80 is-size-6 has-cursor-pointer"
             role="button"
             @click="toggleTranslateText">
                <span>
                    {{translateButtonText}}
                </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .has-width-fit-content{
        width: fit-content !important;
    }
</style>

<script lang="ts">
    import {Component, Prop, Vue} from "nuxt-property-decorator";
    import OkLoadingIndicator from "~/components/utils/OkLoadingIndicator.vue";
    import {IUtilsService} from "~/services/utils/IUtilsService";
    import {okunaContainer} from "~/services/inversify";
    import {TYPES} from "~/services/inversify-types";
    import {ILocalizationService} from "~/services/localization/ILocalizationService";

    @Component({
        name: "OkTranslateButton",
        components: {OkLoadingIndicator},
    })

    export default class extends Vue {
        @Prop(Function) toggleTranslateText: Function;
        @Prop(Boolean) isShowingTranslation: Boolean;
        @Prop(Boolean) isTranslationInProgress: Boolean;

        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);

        get translateButtonText() {
            if (this.isShowingTranslation) {
                return this.localizationService.localize("components.translate.show_original");
            } else {
                return this.localizationService.localize("components.translate.see_translation");
            }
        }
    }
</script>