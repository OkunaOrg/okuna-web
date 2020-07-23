<template>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label for="userName" class="label is-medium ok-has-text-primary-invert has-text-left">
                {{$t('global.snippets.whats_your_name')}}
            </label>
            <div class="control">
                <input type="text"
                       ref="name"
                       placeholder="e.g. Pablo Picasso"
                       class="input is-rounded is-medium ok-input"
                       required
                       id="userName" v-model="userName">
            </div>
            <div v-if="$v.userName.$invalid && formWasSubmitted" class="has-padding-top-5 has-text-left">
                <p class="help is-danger"
                   v-if="!$v.userName.required">
                    {{$t('global.errors.user_name.required')}}
                </p>
                <p class="help is-danger"
                   v-if="!$v.userName.maxLength">
                    {{nameMaxLengthError}}
                </p>
                <p class="help is-danger"
                   v-if="!$v.userName.minLength">
                    {{nameMinLengthError}}
                </p>
            </div>
        </div>
        <ok-buttons-navigation :onNext="onSubmit" class="has-padding-top-20"/>
    </form>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Validate } from "vuelidate-property-decorators";
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { userNameMaxLength, userNameMinLength, userNameValidators } from "~/validators/user-name";
    import OkButtonsNavigation from "~/components/navigation/OkButtonsNavigation.vue";

    @Component({
        name: "OkRegisterUserNameForm",
        components: {OkButtonsNavigation}
    })
    export default class OkRegisterUserNameForm extends Vue {

        @Prop({
            type: String,
            required: false,
        }) readonly initialName: string;

        $refs!: {
            name: HTMLInputElement
        };

        formWasSubmitted = false;

        created() {
            if (this.initialName) {
                this.userName = this.initialName;
            }
        }

        mounted() {
            this.$refs.name.focus();
        }

        @Validate(userNameValidators)
        userName = "";

        onSubmit() {
            const formIsValid = this._validateAll();

            this.formWasSubmitted = true;

            if (formIsValid) {
                this._onSubmitWithValidForm();
            }
        }

        get nameMaxLengthError() {
            return this.$t("global.errors.user_name.max_length", {
                max: userNameMaxLength
            });
        }

        get nameMinLengthError() {
            return this.$t("global.errors.user_name.min_length", {
                min: userNameMinLength
            });
        }

        _onSubmitWithValidForm() {
            this.$emit("onUserNameIsValid", this.userName);
        }


        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }
    }
</script>
