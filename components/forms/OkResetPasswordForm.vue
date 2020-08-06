<template>
    <div class="has-text-centered ok-has-text-primary-invert">
        <form class="has-text-left" @submit.prevent="onSubmit" v-if="!resettedPassword">
            <div class="field">
                <label for="userPassword"
                       class="label is-medium ok-has-text-primary-invert has-text-left is-marginless">
                    {{$t('global.snippets.pick_a_new_password')}}
                </label>
                <p class="help ok-has-text-primary-invert-80 has-text-left has-margin-bottom-15">
                    {{passwordRequirementText}}
                </p>
                <div class="control">
                    <input type="password"
                           class="input is-rounded is-medium ok-input"
                           required
                           ref="password"
                           id="userPassword" v-model="userPassword">
                </div>
                <div v-if="($v.userPassword.$invalid) & formWasSubmitted" class="has-padding-top-5 has-text-left">
                    <p class="help is-danger"
                       v-if="!$v.userPassword.required">
                        {{$t('global.errors.password.required')}}
                    </p>
                    <p class="help is-danger"
                       v-if="!$v.userPassword.maxLength">
                        {{passwordMaxLengthError}}
                    </p>
                    <p class="help is-danger"
                       v-if="!$v.userPassword.minLength">
                        {{passwordMinLengthError}}
                    </p>
                </div>
                <ok-buttons-navigation :onNext="onSubmit" class="has-padding-top-20"/>
            </div>
        </form>
        <div v-else>
            <div class="has-padding-bottom-20">
                <span v-twemoji class="icon is-large">🥳</span>
            </div>
            <div class="content">
                <h4>
                    {{ $t('global.snippets.password_changed') }}
                </h4>
                <p>
                    {{ $t('global.snippets.sending_you_to_login_in') }}
                </p>
            </div>
            <ok-buttons-navigation :onNext="navigateToLogin" :nextText="$t('global.snippets.login')"/>
        </div>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Validate } from "vuelidate-property-decorators";
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import { Route } from "vue-router";
    import { passwordValidators } from "~/validators/password";
    import OkButtonsNavigation from "~/components/navigation/OkButtonsNavigation.vue";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { IThemeService } from "~/services/theme/IThemeService";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { ITheme } from "~/models/common/theme/ITheme";
    import { passwordMaxLength, passwordMinLength } from "~/validators/password";
    import { INavigationService } from "~/services/navigation/INavigationService";

    @Component({
        name: "OkResetPasswordForm",
        components: {OkButtonsNavigation},
        subscriptions: function () {
            return {
                activeTheme: this["themeService"].activeTheme,
            }
        }
    })
    export default class OkResetPasswordForm extends Vue {

        @Prop({
            type: String,
            required: false,
        }) readonly initialPassword: string;

        $route!: Route;

        $refs!: {
            password: HTMLInputElement
        };

        $observables!: {
            activeTheme: BehaviorSubject<ITheme | undefined>,
        };

        requestOperation?: CancelableOperation<void>;
        formWasSubmitted = false;
        submitInProgress = false;


        resettedPassword = false;

        @Validate(passwordValidators)
        userPassword = "";

        hcaptchaToken = "";
        resetPasswordToken = "";

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private themeService: IThemeService = okunaContainer.get<IThemeService>(TYPES.ThemeService);
        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);


        mounted() {
            this.$refs.password.focus();
            const token = this.$route?.query?.["token"];
            if (token) {
                this.resetPasswordToken = token as string;
            } else {
                this.navigationService.navigateToLogin();
            }
        }


        created() {
            if (this.initialPassword) {
                this.userPassword = this.initialPassword;
            }
        }


        get passwordMaxLengthError() {
            return this.$t("global.errors.password.max_length", {
                max: passwordMaxLength
            });
        }

        get passwordMinLengthError() {
            return this.$t("global.errors.password.min_length", {
                min: passwordMinLength
            });
        }

        get passwordRequirementText() {
            return this.$t("global.snippets.password_requirement", {
                min: passwordMinLength,
                max: passwordMaxLength
            });
        }

        navigateToLogin() {
            this.navigationService.navigateToLogin();
        }


        async onSubmit() {
            if (this.submitInProgress) return;
            this.submitInProgress = true;

            const formIsValid = await this._validateAll();

            this.formWasSubmitted = true;
            if (formIsValid && this.resetPasswordToken) {
                await this.onSubmitWithValidForm();
            }

            this.submitInProgress = false;
        }

        async onSubmitWithValidForm() {
            if (this.requestOperation) return;

            try {
                this.requestOperation = CancelableOperation.fromPromise<void>(this.userService.resetPassword({
                    newPassword: this.userPassword,
                    captchaToken: this.hcaptchaToken,
                    resetToken: this.resetPasswordToken
                }));

                await this.requestOperation.value;

                this.onRequestedResetWithValidPassword();
            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.requestOperation = undefined;
            }
        }


        private onRequestedResetWithValidPassword() {
            this.resettedPassword = true;
            this.$emit("onRequestedResetWithValidPassword", this.userPassword);
        }


        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }
    }
</script>
