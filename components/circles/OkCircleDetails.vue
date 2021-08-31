<template>
    <div class="ok-has-background-primary is-semi-rounded has-width-100-percent">
        <div class="box ok-has-background-primary-highlight">
            <div class="columns align-items-center">
                <div class="column">
                    <button
                        class="button is-rounded ok-has-background-primary-highlight ok-has-text-primary-invert has-padding-10 is-size-7"
                        @click="handleCancelClick"
                    >{{ $t('manage_circles.circle_details.back') }}</button>
                </div>

                <div class="column is-narrow" v-if="!isConnectionsCircle">
                    <button
                        class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold has-padding-10 is-size-7"
                        @click="handleEditClick"
                    >{{ $t('manage_circles.circle_details.edit') }}</button>
                </div>
            </div>

            <div class="columns align-items-center">
                <div class="column">
                    <h2 class="is-size-4 ok-has-text-primary-invert has-text-weight-bold">
                        {{ circle.name }}
                    </h2>

                    <p class="ok-has-text-primary-invert" v-if="isConnectionsCircle">
                        {{ $t('manage_circles.circle_details.connections_circle') }}
                    </p>
                </div>

                <div class="column is-narrow">
                    <ok-circle-preview
                        :circle="circle"
                        :circlePreviewSize="circlePreviewSize"
                    ></ok-circle-preview>
                </div>
            </div>

            <ok-circle-users :users="circle.users"></ok-circle-users>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';

    import OkCirclePreview from '~/components/circle-preview/OkCirclePreview.vue';
    import { OkCirclePreviewSize } from '~/components/circle-preview/OkCirclePreviewSize';
    import OkCircleUsers from '~/components/circles/components/OkCircleUsers.vue';

    import { ICircle } from '~/models/connections/circle/ICircle';

    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IModalService } from '~/services/modal/IModalService';

    @Component({
        name: 'OkCircleDetails',
        components: {OkCirclePreview, OkCircleUsers}
    })
    export default class OkCircleDetails extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly circle: ICircle;

        @Prop({
            type: Boolean,
            required: false,
            default: false
        }) readonly isConnectionsCircle: boolean;

        circlePreviewSize = OkCirclePreviewSize.medium;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        handleCancelClick() {
            this.modalService.openCirclesModal();
        }

        handleEditClick() {
            if (this.isConnectionsCircle) {
                // shouldn't ever happen tbh
                return;
            }

            this.modalService.openEditCircleModal({
                circle: this.circle,
            });
        }
    }
</script>
