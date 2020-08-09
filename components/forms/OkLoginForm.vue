<template>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label for="username" class="label has-text-left ok-has-text-primary-invert-80">
                {{$t('global.keywords.username')}}
            </label>
            <div class="control">
                <input type="text" placeholder="e.g. johntravolta" class="input is-rounded is-medium ok-input"
                       required
                       id="username" v-model="username">
            </div>
            <p class="help is-danger has-text-left" v-if="!$v.username.required && $v.username.$dirty">
                {{$t('global.errors.username.required')}}
            </p>
        </div>
        <div class="field">
            <label for="password" class="label has-text-left ok-has-text-primary-invert-80">Password</label>
            <div class="control">
                <input type="password" placeholder="*******" class="input is-rounded is-medium ok-input" required
                       id="password"
                       v-model="password">
            </div>
            <p class="help is-danger has-text-left" v-if="!$v.password.required && $v.password.$dirty">
                {{$t('global.errors.password.required')}}
            </p>
            <p class="help is-danger has-text-left" v-if="!$v.password.minLength && $v.password.$dirty">
                {{$t('global.errors.password.min_length')}}
            </p>
            <p class="help is-danger has-text-left" v-if="!$v.password.maxLength && $v.password.$dirty">
                {{$t('global.errors.password.max_length')}}
            </p>
        </div>
        <div class="field">
            <nuxt-link :to="'/a/request-password-reset'" class="ok-has-text-primary-invert-60">
                {{$t('global.snippets.forgot_password')}}
            </nuxt-link>
        </div>
        <div class="field has-padding-top-20">
            <button class="button is-success is-rounded is-fullwidth is-medium has-background-rainbow has-text-weight-bold"
                    type="submit"
                    :class="{'is-disabled' : submitInProgress}" :disabled="submitInProgress">
                {{$t('global.snippets.login')}}
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
    import { usernameValidators } from "~/validators/username";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUser } from "~/models/auth/user/IUser";

    @Component({
        name: "OkLoginForm"
    })
    export default class extends Vue {

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        loginOperation?: CancelableOperation<IUser>;

        formWasSubmitted = false;
        submitInProgress = false;

        @Validate(usernameValidators)
        username = "";

        @Validate(passwordValidators)
        password = "";


        destroyed() {
            if (this.loginOperation) this.loginOperation.cancel();
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
                this.loginOperation = CancelableOperation.fromPromise<IUser>(this.userService.login({
                    username: this.username,
                    password: this.password
                }));
                const loggedInUser = await this.loginOperation.value;
                this._onUserLoggedIn(loggedInUser);
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


        _onUserLoggedIn(loggedInUser: IUser) {
            this.$emit("onUserLoggedIn", loggedInUser);
        }
    }
</script>
