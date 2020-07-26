<template>
    <div>
        <ok-smart-text :text="text"></ok-smart-text>
        <ok-translate-button v-if="canTranslateText"
                             class="has-padding-top-10"
                             :is-showing-translation="showTranslatedText"
                             :is-translation-in-progress="translationInProgress"
                             :toggle-translate-text="toggleTranslatePostText">
        </ok-translate-button>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import {Component, Prop, Vue} from "nuxt-property-decorator"
    import OkSmartText from "~/components/smart-text/OkSmartText.vue";
    import OkTranslateButton from "~/components/smart-text/components/OkTranslateButton.vue";
    import {okunaContainer} from "~/services/inversify";
    import {TYPES} from "~/services/inversify-types";
    import {IUtilsService} from "~/services/utils/IUtilsService";

    @Component({
        name: "OkTranslatableSmartText",
        components: {OkSmartText, OkTranslateButton}
    })

    export default class extends Vue {
        @Prop(Boolean) canTranslateText: Boolean;
        @Prop(Function) translateText: Function;
        @Prop(String) initialText: String;

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        translatedText: String = undefined;
        showTranslatedText: Boolean = false;
        translationInProgress: Boolean = false;

        async toggleTranslatePostText() {
            let showTranslated = !this.showTranslatedText;

            if (showTranslated && !this.translatedText) {
                try {
                    this.translationInProgress = true;
                    this.translatedText = await this.translateText();
                } catch (e) {
                    showTranslated = false;
                    const handledError = this.utilsService.handleErrorWithToast(e);
                    if (handledError.isUnhandled) throw handledError.error;
                } finally {
                    this.translationInProgress = false;
                }
            }

            this.showTranslatedText = showTranslated;
        }

        get text() {
            return this.showTranslatedText ? this.translatedText : this.initialText;
        }
    }
</script>