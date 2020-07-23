<template>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label for="userUsername" class="label is-medium ok-has-text-primary-invert has-text-left">
                {{$t('global.snippets.pick_your_username')}}
            </label>
            <div class="control">
                <input type="text"
                       placeholder="e.g. jbiebs"
                       class="input is-rounded is-medium ok-input"
                       required
                       ref="username"
                       id="userUsername" v-model="userUsername">
            </div>
            <div v-if="($v.userUsername.$invalid || !usernameIsAvailable) && formWasSubmitted"
                 class="has-padding-top-5 has-text-left">
                <p class="help is-danger"
                   v-if="!$v.userUsername.required">
                    {{$t('global.errors.user_name.required')}}
                </p>
                <p class="help is-danger"
                   v-if="!$v.userUsername.maxLength">
                    {{usernameMaxLengthError}}
                </p>
                <p class="help is-danger"
                   v-if="!$v.userUsername.minLength">
                    {{onUsernameIsAvailable}}
                </p>
                <p class="help is-danger"
                   v-else-if="!usernameIsAvailable">
                    {{$t('global.errors.user_username.taken')}}
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
    import { usernameValidators, userUsernameMaxLength, userUsernameMinLength } from "~/validators/username";
    import OkButtonsNavigation from "~/components/navigation/OkButtonsNavigation.vue";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { CancelableOperation } from "~/lib/CancelableOperation";

    @Component({
        name: "OkRegisterUserUsernameForm",
        components: {OkButtonsNavigation}
    })
    export default class OkRegisterUserUsernameForm extends Vue {

        @Prop({
            type: String,
            required: false,
        }) readonly initialUsername: string;

        @Prop({
            type: Function,
            required: true,
        }) readonly onPrevious: () => Promise<void> | void;

        $refs!: {
            username: HTMLInputElement
        };

        requestOperation?: CancelableOperation<boolean>;
        formWasSubmitted = false;
        submitInProgress = false;

        @Validate(usernameValidators)
        userUsername = "";

        usernameIsAvailable = true;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        created() {
            if (this.initialUsername) {
                this.userUsername = this.initialUsername;
            }
        }

        mounted() {
            this.$refs.username.focus();
        }


        @Watch("userUsername")
        onUserUsernameChange(val: string, oldVal: string) {
            if (!this.usernameIsAvailable) this.usernameIsAvailable = true;
        }

        async onSubmit() {
            if (this.submitInProgress) return;
            this.submitInProgress = true;

            const formIsValid = await this.validateAll();

            this.formWasSubmitted = true;
            if (formIsValid) {
                await this._onSubmitWithValidForm();
            }

            this.submitInProgress = false;
        }

        async _onSubmitWithValidForm() {
            if (this.requestOperation) return;

            try {
                this.requestOperation = CancelableOperation.fromPromise<boolean>(this.userService.isUsernameAvailable({
                    username: this.userUsername
                }));

                this.usernameIsAvailable = await this.requestOperation.value;

                if (this.usernameIsAvailable) this.onUsernameIsAvailable();
            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.requestOperation = undefined;
            }
        }

        get usernameMaxLengthError() {
            return this.$t("global.errors.user_username.max_length", {
                max: userUsernameMaxLength
            });
        }

        get usernameMinLengthError() {
            return this.$t("global.errors.user_username.min_length", {
                min: userUsernameMinLength
            });
        }


        private onUsernameIsAvailable() {
            this.$emit("onUserUsernameIsValid", this.userUsername);
        }


        private validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }
    }
</script>
