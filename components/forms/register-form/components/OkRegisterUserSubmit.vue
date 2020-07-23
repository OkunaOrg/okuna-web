<template>
    <div class="has-text-centered has-padding-20 ok-has-text-primary-invert" @submit.prevent="onSubmit">
        <div v-if="requestInProgress">
            <div class="has-padding-bottom-20">
                <span v-twemoji class="icon is-large">🥚</span>
            </div>
            <div class="content">
                <h4>
                    {{ $t('global.snippets.hang_in_there') }}
                </h4>
                <p>
                    {{ $t('global.snippets.were_creating_your_account') }}
                </p>
            </div>
        </div>
        <div v-else-if="hasError">
            <div class="has-padding-bottom-20">
                <span v-twemoji class="icon is-large">😭</span>
            </div>
            <div class="content">
                <h4>
                    {{ $t('global.snippets.oh_no') }}
                </h4>
                <p>
                    {{ $t('global.snippets.we_couldnt_create_your_account') }}
                </p>
                <p>
                    {{ $t('global.snippets.we_have_recorded_the_error') }}
                </p>
            </div>
            <ok-buttons-navigation
                    :onNext="registerUser"
                    :nextText="$t('global.keywords.retry')"
                    class="has-padding-top-20"/>
        </div>
        <div v-else>
            <div class="has-padding-bottom-20">
                <span v-twemoji class="icon is-large">🐣</span>
            </div>
            <div class="content">
                <h4>
                    {{ $t('global.snippets.awww_yeah') }}
                </h4>
                <p>
                    {{ $t('global.snippets.your_account_is_ready') }}
                </p>
            </div>
            <ok-buttons-navigation
                    :onNext="onNext"
                    class="has-padding-top-20"/>
        </div>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkButtonsNavigation from "~/components/navigation/OkButtonsNavigation.vue";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { TYPES } from "~/services/inversify-types";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { RegistrationResponse } from "~/services/Apis/auth/AuthApiServiceTypes";

    @Component({
        name: "OkRegisterUserSubmit",
        components: {OkButtonsNavigation}
    })
    export default class OkRegisterUserSubmit extends Vue {

        @Prop({
            type: Function,
            required: true,
        }) readonly onNext: () => Promise<void> | void;

        @Prop({
            type: String, required: true
        })
        userName: string;

        @Prop({
            type: String, required: true
        })
        userUsername: string;

        @Prop({
            type: String, required: true
        })
        userEmail: string;

        @Prop({
            type: String, required: true
        })
        userPassword: string;

        @Prop({
            type: String, required: true
        })
        inviteToken: string;

        @Prop({
            type: Boolean, required: true
        })
        areGuidelinesAccepted: boolean;

        @Prop({
            type: Boolean, required: true
        })
        isOfLegalAge: boolean;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        registrationOperation?: CancelableOperation<RegistrationResponse> | undefined;

        hasError = false;
        requestInProgress = false;

        mounted() {
            this.registerUser();
        }


        async registerUser() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;
            this.hasError = false;

            try {

                this.registrationOperation = CancelableOperation.fromPromise(
                    this.userService.register({
                        userUsername: this.userUsername,
                        name: this.userName,
                        email: this.userEmail,
                        password: this.userPassword,
                        inviteToken: this.inviteToken,
                        areGuidelinesAccepted: true,
                        isOfLegalAge: true
                    })
                );

                const registrationData = await this.registrationOperation.value;

                this.$emit("onUserRegistered", registrationData);

            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
                this.hasError = true;
            } finally {
                this.requestInProgress = false;
                this.registrationOperation = undefined;
            }
        }


    }
</script>

