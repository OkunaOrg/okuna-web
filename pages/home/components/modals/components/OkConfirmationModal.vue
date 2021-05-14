<template>
    <div class="is-flex justify-center align-items-center">
        <div class="ok-has-background-primary is-semi-rounded">
            <div class="box ok-has-background-primary-highlight">
                <div class="has-margin-bottom-20 has-text-centered">
                    <h2 class="is-size-5 has-text-weight-bold" v-if="params.title">
                        {{ params.title }}
                    </h2>

                    <p>
                        {{ params.contents }}
                    </p>
                </div>

                <div class="columns">
                    <div class="column" v-if="params.showCancelButton || params.showCancelButton === undefined">
                        <button
                            class="button is-rounded is-borderless has-width-100-percent ok-has-background-primary-highlight ok-has-text-primary-invert"
                            @click.prevent="onWantsToCancel"
                            :disabled="actionPressed"
                        >
                            {{ cancelButtonText }}
                        </button>
                    </div>

                    <div class="column" v-if="params.showConfirmationButton || params.showConfirmationButton === undefined">
                        <button
                            class="button is-rounded is-borderless has-width-100-percent ok-has-background-accent has-text-white has-text-weight-bold"
                            @click.prevent="onWantsToConfirm"
                            :disabled="actionPressed"
                        >
                            {{ confirmationButtonText }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { ConfirmationModalParams, IModalService } from '~/services/modal/IModalService';

    @Component({
        name: 'OkConfirmationModal'
    })
    export default class OkConfirmationModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: ConfirmationModalParams;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        actionPressed: boolean = false;

        onWantsToConfirm() {
            this.actionPressed = true;

            if (!this.params.confirmationCallback) {
                this.modalService.ensureHasNoActiveModal();
                return;
            }

            this.params.confirmationCallback();
        }

        onWantsToCancel() {
            this.actionPressed = true;

            if (!this.params.cancelCallback) {
                this.modalService.ensureHasNoActiveModal();
                return;
            }

            this.params.cancelCallback();
        }

        get confirmationButtonText() {
            if (this.params.confirmationButtonText) {
                return this.params.confirmationButtonText;
            }

            return this.$t('global.keywords.ok');
        }

        get cancelButtonText() {
            if (this.params.cancelButtonText) {
                return this.params.cancelButtonText;
            }

            return this.$t('global.keywords.cancel');
        }
    }
</script>
