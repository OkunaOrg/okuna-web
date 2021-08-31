<template>
    <ok-circle-details-form
        :circle="circle"
        :modalTitle="$t('manage_circles.edit_circle.title')"
        :requestInProgress="requestInProgress"
        @submit="handleSubmit"
        @cancel="handleCancelClick"
    >
        <template slot="trailing">
            <ok-circle-users
                :users="circle.users"
                showActionButton
                :isButtonDisabled="requestInProgress"
                :actionButtonText="$t('manage_circles.edit_circle.user_delete')"
                @actionButtonClicked="onWantsToRemoveUserFromCircle"
            ></ok-circle-users>
        </template>
    </ok-circle-details-form>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';

    import OkCircleUsers from '~/components/circles/components/OkCircleUsers.vue';
    import OkCircleDetailsForm from '~/components/forms/OkCircleDetailsForm.vue';

    import { IUser } from '~/models/auth/user/IUser';
    import { ICircle } from '~/models/connections/circle/ICircle';

    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IModalService } from '~/services/modal/IModalService';
    import { IUserService } from '~/services/user/IUserService';
    import { IUtilsService } from '~/services/utils/IUtilsService';

    import { UpdateConnectionsCircleParams } from '~/services/user/UserServiceTypes';

    @Component({
        name: 'OkEditCircle',
        components: {OkCircleDetailsForm, OkCircleUsers}
    })
    export default class OkEditCircle extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly circle: ICircle;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        requestInProgress: boolean = false;

        async handleSubmit(details: UpdateConnectionsCircleParams) {
            try {
                this.requestInProgress = true;
                const circle = await this.userService.updateConnectionsCircle({
                    ...details,
                    circleId: this.circle.id,
                });
                this.modalService.openCircleDetailsModal({
                    circle,
                    isConnectionsCircle: false
                });
            } catch (err) {
                const handledError = this.utilsService.handleErrorWithToast(err);

                if (handledError.isUnhandled) {
                    throw handledError.error;
                }
            } finally {
                this.requestInProgress = false;
            }
        }

        async handleCancelClick() {
            this.modalService.openCircleDetailsModal({
                circle: this.circle,
                isConnectionsCircle: false
            });
        }

        async onWantsToRemoveUserFromCircle(user: IUser) {
            try {
                this.requestInProgress = true;

                const targetUser = await this.userService.getUser({
                    userUsername: user.username
                });

                const newCircles = targetUser.connectedCircles.filter(c => c.id !== this.circle.id);

                await this.userService.updateConnectionWithUser({
                    user,
                    circles: newCircles
                });

                // TODO: probably refactor this; very iffy about it
                this.circle.users = this.circle.users.filter(u => u.id !== user.id);
            } catch (err) {
                const handledError = this.utilsService.handleErrorWithToast(err);

                if (handledError.isUnhandled) {
                    throw handledError.error;
                }
            } finally {
                this.requestInProgress = false;
            }
        }
    }
</script>
