<template>
    <form class="has-text-left" @submit.prevent="onSubmit">
        <div class="field">
            <label
                   class="label is-medium ok-has-text-primary-invert has-text-left is-marginless">
                {{ $t('global.snippets.please_take_a_moment_to_read_the_following_documents') }}
            </label>
            <p class="help ok-has-text-primary-invert-80 has-text-left has-margin-bottom-15">
                {{ $t('global.snippets.documents_contain_important_information') }}
            </p>
            <div>
                <div class="box ok-has-background-primary-highlight has-padding-10 has-margin-bottom-10">
                    <div
                            class="media is-flex justify-center align-items-center has-cursor-pointer"
                            role="button"
                            tabindex="0"
                            @click="onWantsToOpenCommunityGuidelines">
                        <div class="media-left">
                            <figure class="image is-32x32 is-flex justify-center align-items-center">
                                <span v-twemoji class="icon">🏡</span>
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <strong class="ok-has-text-primary-invert">
                                    {{$t('global.snippets.community_guidelines')}}
                                </strong>
                            </div>
                        </div>
                        <div class="media-right">
                            <figure class="image is-32x32 is-flex justify-center align-items-center">
                                <span class="icon">
                                    <ok-open-in-new-icon class="ok-svg-icon-primary-invert-60"></ok-open-in-new-icon>
                                </span>
                            </figure>
                        </div>
                    </div>
                </div>
                <div class="box ok-has-background-primary-highlight has-padding-10 has-margin-bottom-10">
                    <div
                            class="media is-flex justify-center align-items-center has-cursor-pointer"
                            role="button"
                            tabindex="0"
                            @click="onWantsToOpenTou">
                        <div class="media-left">
                            <figure class="image is-32x32 is-flex justify-center align-items-center">
                                <span v-twemoji class="icon">👩‍⚖️</span>
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <strong class="ok-has-text-primary-invert">
                                    {{$t('global.snippets.terms_of_use')}}
                                </strong>
                            </div>
                        </div>
                        <div class="media-right">
                            <figure class="image is-32x32 is-flex justify-center align-items-center">
                                <span class="icon">
                                    <ok-open-in-new-icon class="ok-svg-icon-primary-invert-60"></ok-open-in-new-icon>
                                </span>
                            </figure>
                        </div>
                    </div>
                </div>
                <div class="box ok-has-background-primary-highlight has-padding-10 has-margin-bottom-10">
                    <div
                            class="media is-flex justify-center align-items-center has-cursor-pointer"
                            role="button"
                            tabindex="0"
                            @click="onWantsToOpenPrivacyPolicy">
                        <div class="media-left">
                            <figure class="image is-32x32 is-flex justify-center align-items-center">
                                <span v-twemoji class="icon">🔐️</span>
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <strong class="ok-has-text-primary-invert">
                                    {{$t('global.snippets.privacy_policy')}}
                                </strong>
                            </div>
                        </div>
                        <div class="media-right">
                            <figure class="image is-32x32 is-flex justify-center align-items-center">
                                <span class="icon">
                                    <ok-open-in-new-icon class="ok-svg-icon-primary-invert-60"></ok-open-in-new-icon>
                                </span>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ok-buttons-navigation :onNext="onNext" :onPrevious="onPrevious" class="has-padding-top-20"/>
    </form>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue} from "nuxt-property-decorator"
    import OkButtonsNavigation from "~/components/navigation/OkButtonsNavigation.vue";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IModalService } from '~/services/modal/IModalService';

    @Component({
        name: "OkRegisterUserDocumentsForm",
        components: {OkButtonsNavigation}
    })
    export default class OkRegisterUserDocumentsForm extends Vue {
        @Prop({
            type: Function,
            required: true,
        }) readonly onPrevious: () => Promise<void> | void;

        @Prop({
            type: Function,
            required: true,
        }) readonly onNext: () => Promise<void> | void;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);


        onWantsToOpenCommunityGuidelines(){
            this.modalService.openCommunityGuidelinesModal();
        }

        onWantsToOpenTou() {
            this.modalService.openTermsOfUseModal();
        }

        onWantsToOpenPrivacyPolicy(){
            this.modalService.openPrivacyPolicyModal();
        }
    }
</script>
