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
    import { Validate } from "vuelidate-property-decorators";
    import { Component, Vue } from "nuxt-property-decorator"
    import { emailValidators } from "~/validators/email";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils-service/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";

    @Component({
        name: "OkRequestResetPasswordForm"
    })
    export default class extends Vue {

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        requestResetPasswordOperation: CancelableOperation<void> | undefined;

        formWasSubmitted = false;
        submitInProgress = false;

        @Validate({emailValidators})
        email = "";


        destroyed() {
            this.requestResetPasswordOperation?.cancel();
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
            if (this.requestResetPasswordOperation) return;

            try {
                this.requestResetPasswordOperation = CancelableOperation.fromPromise(this.userService.requestResetPassword({
                    email: this.email,
                }));
                await this.requestResetPasswordOperation.value;
                this._onRequested();
            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.requestResetPasswordOperation = undefined;
            }
        }


        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }


        _onRequested() {
            this.$emit('onRequested');
        }
    }
</script>