<template>
    <form class="has-text-left" @submit.prevent="onSubmit">
        <div class="field">
            <label for="userEmail" class="label is-medium ok-has-text-primary-invert">
                {{$t('global.snippets.whats_your_email')}}
            </label>
            <div class="control">
                <input type="email"
                       ref="email"
                       placeholder="e.g. vincent@vega.com"
                       class="input is-rounded is-medium ok-input"
                       required
                       id="userEmail" v-model="userEmail">
            </div>
            <div v-if="($v.userEmail.$invalid || !emailIsAvailable) && formWasSubmitted" class="has-padding-top-5">
                <p class="help is-danger" v-if="!$v.userEmail.required">
                    {{$t('global.errors.email.required')}}
                </p>
                <p class="help is-danger" v-else-if="!$v.userEmail.email">
                    {{$t('global.errors.email.invalid')}}
                </p>
                <p class="help is-danger" v-else-if="!emailIsAvailable">
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
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
    import { emailValidators } from "~/validators/email";
    import OkButtonsNavigation from "~/components/navigation/OkButtonsNavigation.vue";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";

    @Component({
        name: "OkRegisterUserEmailForm",
        components: {OkButtonsNavigation}
    })
    export default class OkRegisterUserEmailForm extends Vue {

        @Prop({
            type: String,
            required: false,
        }) readonly initialEmail: string;

        @Prop({
            type: Function,
            required: true,
        }) readonly onPrevious: () => Promise<void> | void;

        $refs!: {
            email: HTMLInputElement
        };

        requestOperation?: CancelableOperation<boolean>;
        formWasSubmitted = false;
        submitInProgress = false;

        @Validate(emailValidators)
        userEmail = "";

        emailIsAvailable = true;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        mounted() {
            this.$refs.email.focus();
        }


        created() {
            if (this.initialEmail) {
                this.userEmail = this.initialEmail;
            }
        }

        @Watch("userEmail")
        onUserEmailChange(val: string, oldVal: string) {
            if (!this.emailIsAvailable) this.emailIsAvailable = true;
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
            if (this.requestOperation) return;

            try {
                this.requestOperation = CancelableOperation.fromPromise<boolean>(this.userService.isEmailAvailable({
                    email: this.userEmail
                }));

                this.emailIsAvailable = await this.requestOperation.value;

                if (this.emailIsAvailable) this.onEmailIsAvailable();
            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.requestOperation = undefined;
            }
        }


        private onEmailIsAvailable() {
            this.$emit("onUserEmailIsValid", this.userEmail);
        }


        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }
    }
</script>
