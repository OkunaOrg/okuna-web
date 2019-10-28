<template>
  <form @submit.prevent="onSubmit">
    <div class="field">
      <label for="email" class="label has-text-left">Your e-mail</label>
      <div class="control">
        <input type="email" placeholder="e.g. bruce@batman.com" class="input is-rounded is-medium" required
               id="email" v-model="email">
      </div>
      <p class="help is-danger has-text-left" v-if="!$v.email.required && $v.email.$dirty">Email is required</p>
      <p class="help is-danger has-text-left" v-if="!$v.email.email && $v.email.$dirty">Email is invalid</p>
    </div>
    <div class="field has-padding-top-20">
      <button class="button is-success is-rounded is-fullwidth is-medium" type="submit"
              :class="{'is-disabled' : submitInProgress}" :disabled="submitInProgress">
        Send reset link
      </button>
    </div>
  </form>
</template>

<style lang="scss">

</style>

<script lang="ts">
  import PalLogo from "../logo";
  import {userService} from "../../services/user-service";
  import {utilsService} from "../../services/utils-service";
  import {accontEmailValidations} from "../../validators/account_email";
  import {CancelToken} from 'axios';


  export default {
    name: 'PalResetPasswordForm',
    components: {PalLogo},
    data() {
      return {
        formWasSubmitted: false,
        email: '',
        resetPasswordCancelTokenSource: null,
        submitInProgress: false,
      }
    },
    mounted() {
    },
    destroyed() {
      if (this.resetPasswordCancelTokenSource) this.resetPasswordCancelTokenSource.cancel();
    },
    validations: {
      email: accontEmailValidations,
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
        this.resetPasswordCancelTokenSource = CancelToken.source();

        try {
          const user = await userService.requestPasswordReset({
            email: this.email,
            axios: this.$axios
          });
          this._onUserLoggedIn(user);
        } catch (error) {
          this._onError(error);
        }
      },
      _validateAll() {
        this.$v.$touch();
        return !this.$v.$invalid;
      },
      _onUserLoggedIn(user) {
        this.$emit('onUserLoggedIn', user);
      },
      _onError(error) {
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
