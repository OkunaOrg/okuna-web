<template>
    <div>
        <template v-if="activeStep === 0">
            <ok-register-user-name-form
                    :initialName="userName"
                    @onUserNameIsValid="onUserNameIsValid"
            />
        </template>
        <template v-else-if="activeStep === 1">
            <ok-register-user-email-form
                    @onUserEmailIsValid="onUserEmailIsValid"
                    :onPrevious="goToPreviousStep"
            />
        </template>
        <template v-else-if="activeStep === 2">
            Pick a username
        </template>
        <template v-else-if="activeStep === 3">
            Pick a password
        </template>
        <template v-else-if="activeStep === 4">
            Guidelines
        </template>
        <template v-else-if="activeStep === 5">
            One last thing
        </template>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { RegistrationResponse } from "~/services/Apis/auth/AuthApiServiceTypes";
    import OkButtonsNavigation from "~/components/navigation/OkButtonsNavigation.vue";
    import OkRegisterUserNameForm from "~/components/forms/register-form/components/OkRegisterUserNameForm.vue";
    import OkRegisterUserEmailForm from "~/components/forms/register-form/components/OkRegisterUserEmailForm.vue";

    @Component({
        name: "OkRegisterForm",
        components: {OkRegisterUserEmailForm, OkRegisterUserNameForm, OkButtonsNavigation}
    })
    export default class extends Vue {

        @Prop({
            type: String,
            required: true,
        }) readonly inviteToken: string;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        registrationOperation?: CancelableOperation<RegistrationResponse> | undefined;

        activeStep = 0;

        formWasSubmitted = false;
        submitInProgress = false;
        areGuidelinesAccepted = false;
        isOfLegalAge = false;

        userName = "";
        userEmail = "";
        userPassword = "";
        userUsername = "";
        userAcceptedGuidelines = false;
        userAcceptedTos = false;

        $refs!: {
            registerUserNameForm: OkRegisterUserNameForm
        };

        onUserNameIsValid(userName: string) {
            this.userName = userName;
            this.goToNextStep();
        }

        onValidUserUsername(userUsername: string) {
            this.userUsername = userUsername;
        }

        onUserEmailIsValid(userEmail: string) {
            this.userEmail = userEmail;
            this.goToNextStep();
        }

        onValidUserPassword(userPassword: string) {
            this.userPassword = userPassword;
        }

        onAcceptedGuidelinesChange(acceptedGuidelines) {
            this.userAcceptedGuidelines = acceptedGuidelines;
        }

        onAcceptedTosChange(acceptedTos) {
            this.userAcceptedTos = acceptedTos;
        }

        onIsOfLegalAgeChange(isOfLegalAge) {
            this.isOfLegalAge = isOfLegalAge;
        }


        destroyed() {
            this.registrationOperation?.cancel();
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
            if (this.registrationOperation) return;

            try {
                this.registrationOperation = CancelableOperation.fromPromise<RegistrationResponse>(this.userService.register({
                    name: this.userName,
                    email: this.userEmail,
                    password: this.userPassword,
                    inviteToken: this.inviteToken,
                    areGuidelinesAccepted: this.userAcceptedGuidelines,
                    //areTosAccepted: this.userAcceptedTos,
                    isOfLegalAge: this.isOfLegalAge
                }));
                const registrationData = await this.registrationOperation.value;
                this._onUserRegistered(registrationData);
            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.registrationOperation = undefined;
            }
        }

        _onUserRegistered(data: RegistrationResponse) {
            this.$emit("onUserRegistered", data);
        }

        goToPreviousStep() {
            this.activeStep = this.activeStep - 1;
        }

        goToNextStep() {
            this.activeStep = this.activeStep + 1;
        }
    }
</script>