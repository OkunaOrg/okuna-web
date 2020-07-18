<template>
    <form class="has-text-left">
        <div class="field">
            <label for="userEmail" class="label is-medium ok-has-text-primary-invert-80">
                {{$t('global.snippets.whats_your_email')}}
            </label>
            <div class="control">
                <input type="email"
                       placeholder="e.g. vincent@vega.com"
                       class="input is-rounded is-medium ok-input"
                       required
                       id="userEmail" v-model="userEmail">
            </div>
            <div v-if="$v.userEmail.$invalid" class="has-padding-top-5">
                <p class="help is-danger" v-if="!$v.userEmail.required && ($v.userEmail.$dirty || formWasSubmitted)">
                    {{$t('global.errors.email.required')}}
                </p>
                <p class="help is-danger" v-else-if="!$v.userEmail.email && ($v.userEmail.$dirty || formWasSubmitted)">
                    {{$t('global.errors.email.invalid')}}
                </p>
                <p class="help is-danger" v-else-if="!emailIsAvailable && ($v.userEmail.$dirty || formWasSubmitted)">
                    {{$t('global.errors.email.taken')}}
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
    import { emailValidators } from "~/validators/email";
    import OkButtonsNavigation from '~/components/navigation/OkButtonsNavigation.vue';
    @Component({
        email: "OkRegisterUserEmailForm",
        components: {OkButtonsNavigation}
    })
    export default class OkRegisterUserEmailForm extends Vue {

        @Prop({
            type: Function,
            required: true,
        }) readonly onPrevious: () => Promise | void;
        
        formWasSubmitted = false;

        @Validate(emailValidators)
        userEmail = "";

        onSubmit() {
            const formIsValid = this._validateAll();

            this.formWasSubmitted = true;

            if (formIsValid) {
                this._onSubmitWithValidForm();
            }
        }
        
        get emailMaxLengthError (){
            return this.$t('global.errors.user_email.max_length', {
                max: userEmailMaxLength
            });
        }

        get emailMinLengthError (){
            return this.$t('global.errors.user_email.min_length', {
                min: userEmailMinLength
            });
        }

        _onSubmitWithValidForm() {
            this.$emit('onUserEmailIsValid', this.userEmail);
        }


        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }
    }
</script>
