<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div class="box ok-has-background-primary-highlight is-paddingless">
            <ok-community-details-form
                :community="community"
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

    import { ICommunity } from '~/models/communities/community/ICommunity';
    import { IUserService } from '~/services/user/IUserService';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { CommunityImages, IModalService } from '~/services/modal/IModalService';
    import { IUtilsService } from '~/services/utils/IUtilsService';
    import { UpdateCommunityParams } from '~/services/user/UserServiceTypes';

    import OkCommunityDetailsForm from '~/components/forms/community-details-form/OkCommunityDetailsForm.vue';

    @Component({
        name: 'OkCommunityDetailsSettings',
        components: {
            OkCommunityDetailsForm
        }
    })
    export default class OkCommunityDetailsSettings extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community?: ICommunity;

        @Prop({
            type: Object,
            required: false
        }) readonly images: CommunityImages;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        requestInProgress: boolean = false;

        async handleFormSubmit(details: UpdateCommunityParams, images: CommunityImages) {
            this.requestInProgress = true;

            try {
                const updatedCommunityDetails: UpdateCommunityParams = {
                    ...details,
                    community: this.community
                };

                await this.userService.updateCommunity(updatedCommunityDetails);

                if (images.avatarUrl === '') {
                    await this.userService.deleteCommunityAvatar({ community: this.community });
                }

                if (images.avatarBlob?.size) {
                    await this.userService.updateCommunityAvatar({
                        community: this.community,
                        avatar: images.avatarBlob
                    });
                }

                if (images.coverUrl === '') {
                    await this.userService.deleteCommunityCover({ community: this.community });
                }

                if (images.coverBlob?.size) {
                    await this.userService.updateCommunityCover({
                        community: this.community,
                        cover: images.coverBlob
                    });
                }

                this.$emit('onSaveComplete');
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
            this.modalService.openCommunitySettingsModal({
                community: this.community
            });
        }
    }
</script>
