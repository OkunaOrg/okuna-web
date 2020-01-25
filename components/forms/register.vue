<template>
    <form @submit.prevent="onSubmit">
        <div class="content has-text-left">
            <h4>
                Create new account
            </h4>
        </div>
        <div class="field">
            <label for="email" class="label has-text-left">E-mail</label>
            <div class="control">
                <input type="email" placeholder="e.g. bruce@batman.com" class="input is-rounded is-medium" required
                       id="email" v-model="email">
            </div>
            <p class="help is-danger has-text-left" v-if="!$v.email.required && $v.email.$dirty">Email is required</p>
            <p class="help is-danger has-text-left" v-if="!$v.email.email && $v.email.$dirty">Email is invalid</p>
        </div>
        <div class="field">
            <label for="password" class="label has-text-left">Pick a password</label>
            <div class="control">
                <input type="password" placeholder="*******" class="input is-rounded is-medium" required id="password"
                       v-model="password">
            </div>
            <p class="help is-danger has-text-left" v-if="!$v.password.required && $v.password.$dirty">Password is
                required</p>
            <p class="help is-danger has-text-left" v-if="!$v.password.minLength && $v.password.$dirty">Password has to
                be
                longer
                than 10 characters</p>
            <p class="help is-danger has-text-left" v-if="!$v.password.maxLength && $v.password.$dirty">Password has to
                be
                smaller
                than 128 characters</p>
        </div>
        <div class="field has-padding-top-20">
            <div class="control">
                <vue-recaptcha sitekey="6Lc9grsUAAAAAMHG1ws1095Ka7iGLdjYKgOZbLCd" ref="recaptcha"
                               v-on:verify="onCaptchaVerified($event)"></vue-recaptcha>
            </div>
            <p class="help is-danger has-text-left">
                    <span v-show="formWasSubmitted && !captchaVerified">
                        Please tick the captcha.
                    </span>
            </p>
        </div>
        <div class="field has-padding-top-20">
            <div class="control">
                <b-checkbox v-model="acceptsConditions">
          <span class="has-padding-lef">By creating an account I acknowledge to have read the <a href=""
                                                                                                 class="has-text-underline">privacy policy</a>, <a
                  href="" class="has-text-underline">terms of use</a> and agree to both.</span>
                </b-checkbox>
                <p class="help is-danger">
                    <span v-show="formWasSubmitted && !acceptsConditions">
                        You can't continue without agreeing to these items.
                    </span>
                </p>
            </div>
        </div>
        <div class="field has-padding-top-20">
            <button class="button is-success is-rounded is-fullwidth is-medium" type="submit"
                    :class="{'is-disabled' : submitInProgress}" :disabled="submitInProgress">
                Create account
            </button>
        </div>
    </form>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Validate } from "vuelidate-property-decorators";
    import { Component, Vue } from "nuxt-property-decorator"
    import { passwordValidators } from "~/validators/password";
    import { emailValidators } from "~/validators/email";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUser";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils-service/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { username } from "~/validators/username";
    import { RegistrationResponse } from "~/services/Apis/auth/types";

    @Component({
        name: "OkRegisterForm"
    })
    export default class extends Vue {

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        registrationOperation?: CancelableOperation<RegistrationResponse> | undefined;

        formWasSubmitted = false;
        submitInProgress = false;
        areGuidelinesAccepted = false;
        isOfLegalAge = false;

        @Validate({emailValidators})
        email = "";

        @Validate({passwordValidators})
        password = "";

        @Validate({userNameValidators: username})
        name = "";

        inviteToken = "";

        destroyed() {
            this.registrationOperation?.cancel();
        }

        async onSubmit() {
            if (this.submitInProgress) return;
            this.submitInProgress = true;

            const formIsValid = await this._validateAll();

            this.formWasSubmitted = true;
            if (formIsValid) {
                await this._onSubmitWithValidForm();
            }

            this.submitInProgress = false;
        }

        async _onSubmitWithValidForm() {
            if (this.registrationOperation) return;

            try {
                this.registrationOperation = CancelableOperation.fromPromise<RegistrationResponse>(this.userService.register({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    inviteToken: this.inviteToken,
                    areGuidelinesAccepted: this.areGuidelinesAccepted,
                    isOfLegalAge: this.isOfLegalAge
                }));
                const registrationData = await this.registrationOperation.value;
                this._onUserRegistered(registrationData);
            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.registrationOperation = undefined;
            }
        }


        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }


        _onUserRegistered(data: RegistrationResponse) {
            this.$emit("onUserRegistered", data);
        }
    }
</script>