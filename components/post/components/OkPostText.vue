<template>
    <div class="content ok-has-text-primary-invert">
        <!-- IDEA: Create OkTranslatableSmartText -->
        <ok-smart-text :text="postText"></ok-smart-text>
        <ok-translate-button v-if="canTranslatePost"
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
    import {BehaviorSubject} from "rxjs";
    import {IUser} from "~/models/auth/user/IUser";
    import OkTranslateButton from "~/components/OkTranslateButton.vue";

    @Component({
        name: "OkPostText",
        components: {OkTranslateButton, OkLoadingIndicator, OkSmartText},
        subscriptions: function() {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser>
        };

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

        get canTranslatePost() {
            return this.$observables.loggedInUser?.value?.canTranslatePost(this.post);
        }
    }
</script>
