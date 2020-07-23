<template>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label for="userPassword" class="label is-medium ok-has-text-primary-invert has-text-left is-marginless">
                {{$t('global.snippets.choose_a_password')}}
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
            <div v-if="$v.userPassword.$invalid & formWasSubmitted" class="has-padding-top-5 has-text-left">
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
        </div>
        <ok-buttons-navigation :onNext="onSubmit" :onPrevious="onPrevious" class="has-padding-top-20"/>
    </form>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Validate } from "vuelidate-property-decorators";
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { passwordValidators, passwordMaxLength, passwordMinLength } from "~/validators/password";
    import OkButtonsNavigation from "~/components/navigation/OkButtonsNavigation.vue";

    @Component({
        name: "OkRegisterUserPasswordForm",
        components: {OkButtonsNavigation}
    })
    export default class OkRegisterUserPasswordForm extends Vue {

        @Prop({
            type: String,
            required: false,
        }) readonly initialPassword: string;

        @Prop({
            type: Function,
            required: true,
        }) readonly onPrevious: () => Promise<void> | void;

        $refs!: {
            password: HTMLInputElement
        };

        formWasSubmitted = false;

        created() {
            if (this.initialPassword) {
                this.userPassword = this.initialPassword;
            }
        }

        mounted() {
            this.$refs.password.focus();
        }


        @Validate(passwordValidators)
        userPassword = "";


        onSubmit() {
            const formIsValid = this.validateAll();

            this.formWasSubmitted = true;

            if (formIsValid) {
                this.onSubmitWithValidForm();
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

        private onSubmitWithValidForm() {
            this.$emit("onUserPasswordIsValid", this.userPassword);
        }


        private validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }
    }
</script>
