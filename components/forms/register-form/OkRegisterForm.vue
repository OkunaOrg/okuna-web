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
                    :onPrevious="goToPreviousStep"
                    :onNext="goToNextStep"
            />
        </template>
        <template v-else-if="activeStep === 5">
            <ok-register-user-accepts-documents
                    :initialAcceptsDocuments="userAcceptedDocuments"
                    :onPrevious="goToPreviousStep"
                    :onNext="goToNextStep"
            />
        </template>
        <template v-else-if="activeStep === 6">
            <ok-register-user-submit
                    :userName="userName"
                    :userUsername="userUsername"
                    :userEmail="userEmail"
                    :userPassword="userPassword"
                    :inviteToken="inviteToken"
                    :onNext="goToNextStep"
                    @onUserRegistered="onUserRegistered"
            />
        </template>
        <template v-else-if="activeStep === 7">
            <ok-register-user-suggested-communities
                    :onNext="onRegistrationDone"
            />
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
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { RegistrationResponse } from "~/services/Apis/auth/AuthApiServiceTypes";
    import OkButtonsNavigation from "~/components/navigation/OkButtonsNavigation.vue";
    import OkRegisterUserNameForm from "~/components/forms/register-form/components/OkRegisterUserNameForm.vue";
    import OkRegisterUserEmailForm from "~/components/forms/register-form/components/OkRegisterUserEmailForm.vue";
    import OkRegisterUserUsernameForm from "~/components/forms/register-form/components/OkRegisterUserUsernameForm.vue";
    import OkRegisterUserPasswordForm from "~/components/forms/register-form/components/OkRegisterUserPasswordForm.vue";
    import OkRegisterUserDocumentsForm
        from "~/components/forms/register-form/components/OkRegisterUserDocumentsForm.vue";
    import OkRegisterUserAcceptsDocuments
        from "~/components/forms/register-form/components/OkRegisterUserAcceptsDocuments.vue";
    import OkRegisterUserSubmit from "~/components/forms/register-form/components/OkRegisterUserSubmit.vue";
    import OkRegisterUserSuggestedCommunities
        from '~/components/forms/register-form/components/OkRegisterUserSuggestedCommunities.vue';
    import { INavigationService } from '~/services/navigation/INavigationService';

    @Component({
        name: "OkRegisterForm",
        components: {
            OkRegisterUserSuggestedCommunities,
            OkRegisterUserSubmit,
            OkRegisterUserAcceptsDocuments,
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
        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);

        registrationOperation?: CancelableOperation<RegistrationResponse> | undefined;

        activeStep = 0;

        formWasSubmitted = false;
        submitInProgress = false;


        userName = "";
        userEmail = "";
        userPassword = "";
        userUsername = "";
        userAcceptedDocuments = false;

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

        destroyed() {
            this.registrationOperation?.cancel();
        }

        async onUserRegistered(data: RegistrationResponse) {
            this.$emit("onUserRegistered", data);
            await this.userService.loginWithAuthToken(data.token);
        }

        onRegistrationDone() {
            this.navigationService.navigateToHome();
        }

        goToPreviousStep() {
            this.activeStep = this.activeStep - 1;
        }

        goToNextStep() {
            this.activeStep = this.activeStep + 1;
        }
    }
</script>