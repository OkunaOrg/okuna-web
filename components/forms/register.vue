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
      <p class="help is-danger has-text-left" v-if="!$v.password.minLength && $v.password.$dirty">Password has to be
        longer
        than 10 characters</p>
      <p class="help is-danger has-text-left" v-if="!$v.password.maxLength && $v.password.$dirty">Password has to be
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
  import PalLogo from "../logo";
  import VueRecaptcha from 'vue-recaptcha';
  import {userService} from "../../services/user-service";
  import {utilsService} from "../../services/utils-service";
  import {accontEmailValidations} from "../../validators/account_email";
  import {accountPasswordValidations} from "../../validators/account_password";
  import {CancelToken} from 'axios';


  const GOOGLE_RECAPTCHA_SCRIPT = 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit';

  export default {
    name: 'PalRegisterForm',
    components: {PalLogo, VueRecaptcha},
    data() {
      return {
        formWasSubmitted: false,
        captchaResponse: '',
        captchaVerified: false,
        email: '',
        password: '',
        registerUserCancelTokenSource: null,
        submitInProgress: false,
        acceptsConditions: false
      }
    },
    mounted() {
      this._enableGoogleRecaptcha();
    },
    destroyed() {
      if (this.registerUserCancelTokenSource) this.registerUserCancelTokenSource.cancel();
    },
    validations: {
      email: accontEmailValidations,
      password: accountPasswordValidations
    },
    methods: {
      async onSubmit() {
        if (this.submitInProgress) return;
        this.submitInProgress = true;

        const formIsValid = await this._validateAll();

        this.formWasSubmitted = true;
        if (formIsValid) {
          await this._onSubmitWithValidForm();
        }

        this.submitInProgress = false;
      },
      async _onSubmitWithValidForm() {
        this.registerUserCancelTokenSource = CancelToken.source();

        try {
          const user = await userService.registerUser({
            email: this.email,
            password: this.password,
            acceptsConditions: this.acceptsConditions,
            axiosCancelToken: this.registerUserCancelTokenSource.token,
            axios: this.$axios,
            captchaResponse: this.captchaResponse
          });
          this._onUserCreated(user);
        } catch (error) {
          this._onError(error);
        }
      },
      _validateAll() {
        this.$v.$touch();
        return !this.$v.$invalid && this.captchaVerified && this.acceptsConditions;
      },
      _onUserCreated(user) {
        this.$emit('onUserCreated', user);
      },
      onCaptchaVerified(response) {
        this.captchaVerified = true;
        this.captchaResponse = response;
      },
      _enableGoogleRecaptcha() {
        this._injectGoogleRecaptcha();
      },
      _injectGoogleRecaptcha() {
        const that = this;
        (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement(s);
          js.id = id;
          js.onload = function () {
            that.acceptedRecaptcha = true;
            // remote script has loaded
          };
          js.src = GOOGLE_RECAPTCHA_SCRIPT;
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-recaptcha'));
      },
      _onError(error) {
        console.error(error);
        if (this.toastHandle) this.toastHandle.close();

        const handleErrorResult = utilsService.handleError(error);

        this.toastHandle = this.$buefy.toast.open({
          message: handleErrorResult.message,
          type: 'is-danger',
          queue: true,
          duration: 5000
        });

        if (handleErrorResult.isUnhandled) {
          throw handleErrorResult.error;
        }
      },

    },
  }
</script>
