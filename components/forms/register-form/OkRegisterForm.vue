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
                    :initialEmail="userEmail"
                    @onUserEmailIsValid="onUserEmailIsValid"
                    :onPrevious="goToPreviousStep"
            />
        </template>
        <template v-else-if="activeStep === 2">
            <ok-register-user-username-form
                    :initialUsername="userUsername"
                    @onUserUsernameIsValid="onUserUsernameIsValid"
                    :onPrevious="goToPreviousStep"
            />
        </template>
        <template v-else-if="activeStep === 3">
            <ok-register-user-password-form
                    :initialPassword="userPassword"
                    @onUserPasswordIsValid="onUserPasswordIsValid"
                    :onPrevious="goToPreviousStep"
            />
        </template>
        <template v-else-if="activeStep === 4">
            <ok-register-user-documents-form
                    :initialAcceptsDocuments="userAcceptedDocuments"
                    @onUserAcceptedDocumentsChange="onUserAcceptedDocumentsChange"
                    :onPrevious="goToPreviousStep"
                    :onNext="goToNextStep"
            />
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
    import OkRegisterUserUsernameForm from "~/components/forms/register-form/components/OkRegisterUserUsernameForm.vue";
    import OkRegisterUserPasswordForm from "~/components/forms/register-form/components/OkRegisterUserPasswordForm.vue";
    import OkRegisterUserDocumentsForm
        from "~/components/forms/register-form/components/OkRegisterUserDocumentsForm.vue";

    @Component({
        name: "OkRegisterForm",
        components: {
            OkRegisterUserDocumentsForm,
            OkRegisterUserPasswordForm,
            OkRegisterUserUsernameForm, OkRegisterUserEmailForm, OkRegisterUserNameForm, OkButtonsNavigation
        }
    })
    export default class extends Vue {

        @Prop({
            type: String,
            required: true,
        }) readonly inviteToken: string;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        registrationOperation?: CancelableOperation<RegistrationResponse> | undefined;

        activeStep = 4;

        formWasSubmitted = false;
        submitInProgress = false;


        userName = "";
        userEmail = "";
        userPassword = "";
        userUsername = "";
        userAcceptedDocuments = false;
        userIsOfLegalAge = false;

        $refs!: {
            registerUserNameForm: OkRegisterUserNameForm
        };

        onUserNameIsValid(userName: string) {
            this.userName = userName;
            this.goToNextStep();
        }

        onUserUsernameIsValid(userUsername: string) {
            this.userUsername = userUsername;
            this.goToNextStep();
        }

        onUserEmailIsValid(userEmail: string) {
            this.userEmail = userEmail;
            this.goToNextStep();
        }

        onUserPasswordIsValid(userPassword: string) {
            this.userPassword = userPassword;
            this.goToNextStep();
        }

        onUserAcceptedDocumentsChange(userAcceptedDocuments: boolean) {
            this.userAcceptedDocuments = userAcceptedDocuments;
            console.log(userAcceptedDocuments)
        }

        onUserAcceptedDocuments() {
            this.goToNextStep();
        }


        destroyed() {
            this.registrationOperation?.cancel();
        }

        private async onSubmitWithValidForm() {
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
                this.onUserRegistered(registrationData);
            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.registrationOperation = undefined;
            }
        }

        private onUserRegistered(data: RegistrationResponse) {
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