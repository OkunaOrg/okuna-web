<template>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label for="email" class="label has-text-left ok-has-text-primary">E-mail</label>
            <div class="control">
                <input type="email" placeholder="e.g. bruce@batman.com" class="input is-rounded is-medium ok-input" required
                       id="email" v-model="email">
            </div>
            <p class="help is-danger has-text-left" v-if="!$v.email.required && $v.email.$dirty">Email is required</p>
            <p class="help is-danger has-text-left" v-if="!$v.email.email && $v.email.$dirty">Email is invalid</p>
        </div>
        <div class="field">
            <label for="password" class="label has-text-left ok-has-text-primary">Password</label>
            <div class="control">
                <input type="password" placeholder="*******" class="input is-rounded is-medium ok-input" required id="password"
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
        <div class="field">
            <nuxt-link :to="localePath('reset-password')" class="ok-has-text-secondary">
                Forgot password?
            </nuxt-link>
        </div>
        <div class="field has-padding-top-20">
            <button class="button is-success is-rounded is-fullwidth is-medium has-background-rainbow has-text-weight-bold" type="submit"
                    :class="{'is-disabled' : submitInProgress}" :disabled="submitInProgress">
                Login
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

    @Component({
        name: "OkLoginForm"
    })
    export default class extends Vue {

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        loginOperation?: CancelableOperation<void>;

        formWasSubmitted = false;
        submitInProgress = false;

        @Validate({emailValidators})
        email = "";

        @Validate({passwordValidators})
        password = "";


        destroyed() {
            //this.loginOperation?.cancel();
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
            if (this.loginOperation) return;

            try {
                this.loginOperation = CancelableOperation.fromPromise(this.userService.login({
                    email: this.email,
                    password: this.password
                }));
                await this.loginOperation.value;
                this._onUserLoggedIn();
            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.loginOperation = undefined;
            }
        }


        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }


        _onUserLoggedIn() {
            this.$emit("onUserLoggedIn");
        }
    }
</script>
