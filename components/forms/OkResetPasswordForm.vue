<template>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label for="newPassword" class="label has-text-left">New password</label>
            <div class="control">
                <input type="password" class="input is-rounded is-medium" required
                       id="newPassword" v-model="newPassword">
            </div>
            <p class="help is-danger has-text-left" v-if="!$v.newPassword.required && $v.newPassword.$dirty">Password is
                required</p>
            <p class="help is-danger has-text-left" v-if="!$v.newPassword.password && $v.newPassword.$dirty">Password is
                invalid</p>
        </div>
        <div class="field has-padding-top-20">
            <button class="button is-success is-rounded is-fullwidth is-medium" type="submit"
                    :class="{'is-disabled' : submitInProgress}" :disabled="submitInProgress">
                Change password
            </button>
        </div>
    </form>
</template>

<style lang="scss">

</style>
<script lang="ts">
    import { Validate } from "vuelidate-property-decorators";
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { passwordValidators } from "~/validators/password";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";

    @Component({
        name: "OkResetPasswordForm"
    })
    export default class extends Vue {

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        requestResetPasswordOperation: CancelableOperation;

        formWasSubmitted = false;
        submitInProgress = false;

        @Validate({passwordValidators})
        newPassword = "";

        @Prop({
            required: true
        })
        public resetToken = "";

        destroyed() {
            this.requestResetPasswordOperation.cancel();
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
                this.requestResetPasswordOperation = CancelableOperation.fromPromise(this.userService.resetPassword({
                    resetToken: this.resetToken,
                    newPassword: this.newPassword,
                }));
                await this.requestResetPasswordOperation.value;
                this._onPasswordReset();
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


        _onPasswordReset() {
            this.$emit("onPasswordReset");
        }
    }
</script>