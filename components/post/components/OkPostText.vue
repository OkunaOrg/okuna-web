<template>
    <div class="content ok-has-text-primary-invert">
        <ok-smart-text :text="postText"></ok-smart-text>
        <!-- TODO(komposten): Wrap this up as a custom component so it's reusable for comments? -->
        <!-- TODO(komposten): Only show this if we can translate the post -->
        <div class="has-padding-top-10">
            <ok-loading-indicator v-if="translationInProgress"
                                  class="has-width-fit-content"
                                  :size="2">
            </ok-loading-indicator>
            <div v-else
                 class="ok-has-text-primary-invert-80 is-size-6 has-cursor-pointer"
                 role="button"
                 @click="toggleTranslatePostText">
                <span>
                    {{translateButtonText}}
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .has-width-fit-content{
        width: fit-content !important;
    }
</style>

<script lang="ts">
    import {Component, Prop, Vue} from "nuxt-property-decorator"
    import {IPost} from "~/models/posts/post/IPost";
    import OkSmartText from "~/components/smart-text/OkSmartText.vue";
    import {ILocalizationService} from "~/services/localization/ILocalizationService";
    import {okunaContainer} from "~/services/inversify";
    import {TYPES} from "~/services/inversify-types";
    import {IUserService} from "~/services/user/IUserService";
    import OkLoadingIndicator from "~/components/utils/OkLoadingIndicator.vue";
    import {IToastService} from "~/services/toast/IToastService";
    import {ToastType} from "~/services/toast/lib/ToastType";
    import {IUtilsService} from "~/services/utils/IUtilsService";

    @Component({
        name: "OkPostText",
        components: {OkLoadingIndicator, OkSmartText},
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        translatedText: String = undefined;
        showTranslatedText: Boolean = false;
        translationInProgress: Boolean = false;

        async toggleTranslatePostText() {
            let showTranslated = !this.showTranslatedText;

            if (showTranslated && !this.translatedText) {
                try {
                    this.translationInProgress = true;
                    this.translatedText = await this.userService.translatePost({post: this.post});
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

        get postText() {
            return this.showTranslatedText ? this.translatedText : this.post.text;
        }

        get translateButtonText() {
            if (this.showTranslatedText) {
                return this.localizationService.localize("components.translate.show_original");
            } else {
                return this.localizationService.localize("components.translate.see_translation");
            }
        }
    }
</script>
