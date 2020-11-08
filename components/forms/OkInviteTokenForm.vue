<template>
    <form @submit.prevent="onSubmit" class="is-flex flex-direction-column">
        <div class="field">
            <label for="inviteToken" class="label has-text-left ok-has-text-primary-invert-80 is-medium">
                {{$t('global.snippets.paste_your_invite_code')}}
            </label>
            <div class="control">
                <input type="text"
                       placeholder="e.g. eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjIwMTF9.GKY4j11It9IYdTF1yg90XT6r9dFvMxBd-xWs1zu-xjE"
                       class="input is-rounded is-medium ok-input"
                       required
                       id="inviteToken" v-model="inviteToken">
            </div>
            <div v-if="$v.inviteToken.$invalid || !tokenValid" class="has-padding-top-5">
                <p class="help is-danger has-text-left" v-if="!$v.inviteToken.required && $v.inviteToken.$dirty">
                    {{$t('global.errors.invite_token.required')}}
                </p>
                <p class="help is-danger has-text-left" v-else-if="formWasSubmitted && !tokenValid">
                    {{$t('global.errors.invite_token.invalid')}}
                </p>
            </div>
        </div>
        <div class="field has-text-left ok-has-text-primary-invert">
             <span>
                    {{$t('global.snippets.dont_have_one')}}
             </span>
            <a href="https://about.okuna.io/" rel="nofollow noopener noreferrer" target="_blank" class="ok-has-text-primary-invert-60">
                {{$t('global.snippets.request_one')}}.
            </a>
        </div>
        <div class="is-flex-1 flex-direction-column-reverse">
            <div class="field has-padding-top-20">
                <button class="button is-success is-rounded is-fullwidth is-medium has-background-rainbow has-text-weight-bold"
                        type="submit"
                        :class="{'is-disabled' : submitInProgress}" :disabled="submitInProgress">
                    {{$t('global.keywords.validate')}}
                </button>
            </div>
        </div>
    </form>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Validate } from "vuelidate-property-decorators";
    import { Component, Vue, Watch } from "nuxt-property-decorator"
    import { inviteTokenValidators } from "~/validators/invite-token";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";

    @Component({
        name: "OkInviteTokenForm"
    })
    export default class OkInviteTokenForm extends Vue {

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        requestOperation?: CancelableOperation<boolean>;

        formWasSubmitted = false;
        submitInProgress = false;
        tokenValid = false;

        @Validate(inviteTokenValidators)
        inviteToken = "";


        destroyed() {
            if (this.requestOperation) this.requestOperation.cancel();
        }

        @Watch("inviteToken")
        onInviteTokenChanged(val: string, oldVal: string) {
            // Reset the tokenvalid on change
            if (!this.tokenValid) this.tokenValid = true;
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
            let inviteToken = this.inviteToken;

            if (this.utilsService.isUrl(this.inviteToken)) {
                const queryParams = this.utilsService.getQueryStringParams(this.inviteToken);
                inviteToken = queryParams.token;
            }

            try {
                this.requestOperation = CancelableOperation.fromPromise<boolean>(this.userService.isInviteTokenValid({
                    token: inviteToken
                }));
                this.tokenValid = await this.requestOperation.value;
                if (this.tokenValid) this._onTokenIsValid(inviteToken);
            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.requestOperation = undefined;
            }
        }


        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }


        _onTokenIsValid(inviteToken: string) {
            this.$emit("onTokenIsValid", inviteToken);
        }
    }
</script>
