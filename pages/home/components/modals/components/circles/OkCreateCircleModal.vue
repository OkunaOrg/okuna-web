<template>
    <div class="is-flex justify-center align-items-center">
        <ok-circle-details-form
            class="ok-generic-modal"
            :modalTitle="$t('manage_circles.create_circle.title')"
            :requestInProgress="requestInProgress"
            @submit="handleSubmit"
            @cancel="handleCancelClick"
        />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkCircleDetailsForm from '~/components/forms/OkCircleDetailsForm.vue';

    import { CreateConnectionsCircleParams } from '~/services/user/UserServiceTypes';

    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { CreateCircleModalParams, IModalService } from '~/services/modal/IModalService';
    import { IUserService } from '~/services/user/IUserService';
    import { IUtilsService } from '~/services/utils/IUtilsService';

    @Component({
        name: 'OkCreateCircleModal',
        components: {OkCircleDetailsForm}
    })
    export default class OkCreateCircleModal extends Vue {
        @Prop({
            type: Object,
            required: false
        }) readonly params: CreateCircleModalParams;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        requestInProgress: boolean = false;

        async handleSubmit(details: CreateConnectionsCircleParams) {
            try {
                this.requestInProgress = true;
                await this.userService.createConnectionsCircle(details);
                this.modalService.openCirclesModal();
            } catch (err) {
                const handledError = this.utilsService.handleErrorWithToast(err);

                if (handledError.isUnhandled) {
                    throw handledError.error;
                }
            } finally {
                this.requestInProgress = false;
            }
        }

        handleCancelClick() {
            this.modalService.openCirclesModal();
        }
    }
</script>
