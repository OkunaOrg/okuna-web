<template>
    <div class="has-text-centered ok-has-text-primary-invert">
        <form class="has-text-left" @submit.prevent="onSubmit" v-if="!requestedPasswordReset">
            <div class="field">
                <label for="userEmail" class="label is-medium ok-has-text-primary-invert">
                    {{$t('global.snippets.whats_your_email')}}
                </label>
                <div class="control">
                    <input type="email"
                           ref="email"
                           placeholder="e.g. harry@hogwarts.com"
                           class="input is-rounded is-medium ok-input"
                           required
                           id="userEmail" v-model="userEmail">
                </div>
                <div v-if="($v.userEmail.$invalid || !hcaptchaToken) && formWasSubmitted" class="has-padding-top-5">
                    <p class="help is-danger" v-if="!$v.userEmail.required">
                        {{$t('global.errors.email.required')}}
                    </p>
                    <p class="help is-danger" v-else-if="!$v.userEmail.email">
                        {{$t('global.errors.email.invalid')}}
                    </p>
                    <p class="help is-danger" v-else-if="!hcaptchaToken">
                        {{$t('global.errors.captcha.required')}}
                    </p>
                </div>
            </div>
            <ok-buttons-navigation :onNext="onSubmit" class="has-padding-top-20"/>
        </form>
        <div v-else>
            <div class="has-padding-bottom-20">
                <span v-twemoji class="icon is-large">📫</span>
            </div>
            <div class="content">
                <h4>
                    {{ $t('global.snippets.youve_got_mail') }}
                </h4>
                <p>
                    {{ $t('global.snippets.we_have_sent_password_reset_to_mail') }}
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Validate } from "vuelidate-property-decorators";
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
    import { emailValidators } from "~/validators/email";
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

    @Component({
        name: "OkRequestPasswordResetForm",
        components: {OkButtonsNavigation},
        subscriptions: function () {
            return {
                activeTheme: this["themeService"].activeTheme,
            }
        }
    })
    export default class OkRequestPasswordResetForm extends Vue {

        @Prop({
            type: String,
            required: false,
        }) readonly initialEmail: string;


        $refs!: {
            email: HTMLInputElement
        };

        $observables!: {
            activeTheme: BehaviorSubject<ITheme | undefined>,
        };

        requestOperation?: CancelableOperation<void>;
        formWasSubmitted = false;
        submitInProgress = false;


        requestedPasswordReset = false;

        @Validate(emailValidators)
        userEmail = "";

        hcaptchaToken = "";

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private themeService: IThemeService = okunaContainer.get<IThemeService>(TYPES.ThemeService);
        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        mounted() {
            this.$refs.email.focus();
        }


        created() {
            if (this.initialEmail) {
                this.userEmail = this.initialEmail;
            }
        }

        async onSubmit() {
            if (this.submitInProgress) return;
            this.submitInProgress = true;

            const formIsValid = await this._validateAll();

            this.formWasSubmitted = true;
            if (formIsValid) {
                await this.onSubmitWithValidForm();
            }

            this.submitInProgress = false;
        }

        async onSubmitWithValidForm() {
            if (this.requestOperation) return;

            try {
                this.requestOperation = CancelableOperation.fromPromise<void>(this.userService.requestResetPassword({
                    email: this.userEmail,
                    captchaToken: this.hcaptchaToken
                }));

                await this.requestOperation.value;

                this.onRequestedResetWithValidEmail();
            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.requestOperation = undefined;
            }
        }


        private onRequestedResetWithValidEmail() {
            this.requestedPasswordReset = true;
            this.$emit("onRequestedResetWithValidEmail", this.userEmail);
        }


        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }
    }
</script>
