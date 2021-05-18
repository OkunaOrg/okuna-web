<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div class="box ok-has-background-primary-highlight is-paddingless">
            <ok-community-details-form
                :communityStub="communityStub"
                :images="images"
                :requestInProgress="requestInProgress"
                @submit="handleFormSubmit"
                @cancel="handleCancelClick"
            ></ok-community-details-form>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';

    import OkCommunityDetailsForm from '~/components/forms/community-details-form/OkCommunityDetailsForm.vue';

    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { CommunityImages, IModalService } from '~/services/modal/IModalService';
    import { INavigationService } from '~/services/navigation/INavigationService';
    import { IUserService } from '~/services/user/IUserService';
    import { CreateCommunityParams } from '~/services/user/UserServiceTypes';
    import { IUtilsService } from '~/services/utils/IUtilsService';

    @Component({
        name: 'OkCreateCommunityForm',
        components: {
            OkCommunityDetailsForm
        }
    })
    export default class OkCreateCommunityForm extends Vue {
        @Prop({
            type: Object,
            required: false
        }) readonly communityStub?: CreateCommunityParams;

        @Prop({
            type: Object,
            required: false
        }) readonly images?: CommunityImages;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        requestInProgress: boolean = false;

        async handleFormSubmit(details: CreateCommunityParams, images: CommunityImages) {
            this.requestInProgress = true;

            try {
                const communityDetails: CreateCommunityParams = {
                    ...details,
                    ...(images.avatarBlob && { avatar: images.avatarBlob }),
                    ...(images.coverBlob && { cover: images.coverBlob })
                };

                const community = await this.userService.createCommunity(communityDetails);
                this.$emit('onComplete');
                await this.navigationService.navigateToCommunity({ community });
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
            this.$emit('onComplete');
        }
    }
</script>
