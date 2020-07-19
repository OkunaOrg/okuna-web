<template>
    <form class="has-text-left" @submit.prevent="onSubmit">
        <div class="field">
            <label for="acceptsDocuments"
                   class="label is-medium ok-has-text-primary-invert-80 has-text-left is-marginless">
                Please take a moment to read through the following documents.
            </label>
            <p class="help ok-has-text-primary-invert has-text-left has-margin-bottom-15">
                They contain important information about your experience in Okuna.
            </p>
            <div>
                <div class="box ok-has-background-primary-highlight has-padding-10">
                    <article class="media is-flex justify-center align-items-center">
                        <div class="media-left">
                            <figure class="image is-32x32">
                                <span v-twemoji class="icon">👩‍⚖️</span>
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong class="ok-has-text-primary-invert">Terms of use</strong>
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
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
        email: "OkRegisterUserDocumentsForm",
        components: {OkButtonsNavigation}
    })
    export default class OkRegisterUserDocumentsForm extends Vue {

        @Prop({
            type: Boolean,
            required: false,
        }) readonly initialAcceptsDocuments: boolean;

        @Prop({
            type: Function,
            required: true,
        }) readonly onPrevious: () => Promise<void> | void;

        formWasSubmitted = false;

        userAcceptsDocuments = false;

        created() {
            if (typeof this.initialAcceptsDocuments !== 'undefined') {
                this.userAcceptsDocuments = this.initialAcceptsDocuments;
            }
        }

        @Watch("userAcceptsDocuments")
        onFormWasSubmittedChange(val: boolean, oldVal: boolean) {
            this.$emit('onUserAcceptedDocumentsChange', val);
        }

        async onSubmit() {
            this.formWasSubmitted = true;

            if (this.userAcceptsDocuments) {
                this.$emit("onUserAcceptedDocuments");
            }
        }
    }
</script>
