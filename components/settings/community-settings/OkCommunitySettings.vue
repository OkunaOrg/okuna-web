<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div class="box ok-has-background-primary-highlight is-paddingless" v-if="loggedInUser">
            <ok-tile v-if="canChangeDetails" :onClick="openCommunityDetailsSettings">
                <template v-slot:leading>
                    <ok-communities-icon class="ok-svg-icon-primary-invert"></ok-communities-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_community.settings.details.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_community.settings.details.description') }}
                    </div>
                </template>
            </ok-tile>

            <ok-tile v-if="canManageAdministrators" :onClick="openCommunityAdministratorsSettings">
                <template v-slot:leading>
                    <ok-administrator-icon class="ok-svg-icon-primary-invert"></ok-administrator-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_community.settings.administrators.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_community.settings.administrators.description') }}
                    </div>
                </template>
            </ok-tile>

            <ok-tile v-if="canManageModerators" :onClick="openCommunityModeratorsSettings">
                <template v-slot:leading>
                    <ok-moderator-icon class="ok-svg-icon-primary-invert"></ok-moderator-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_community.settings.moderators.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_community.settings.moderators.description') }}
                    </div>
                </template>
            </ok-tile>

            <ok-tile v-if="canBanOrUnban" :onClick="openCommunityBannedUsersSettings">
                <template v-slot:leading>
                    <ok-blocked-icon class="ok-svg-icon-primary-invert"></ok-blocked-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_community.settings.banned_users.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_community.settings.banned_users.description') }}
                    </div>
                </template>
            </ok-tile>

            <ok-tile v-if="canBanOrUnban" :disabled="true">
                <template v-slot:leading>
                    <ok-moderator-icon class="ok-svg-icon-primary-invert"></ok-moderator-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_community.settings.moderation_reports.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_community.settings.moderation_reports.description') }}
                    </div>
                </template>
            </ok-tile>

            <ok-tile v-if="canCloseOrOpenPosts" :disabled="true">
                <template v-slot:leading>
                    <ok-closed-posts-icon class="ok-svg-icon-primary-invert"></ok-closed-posts-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_community.settings.closed_posts.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_community.settings.closed_posts.description') }}
                    </div>
                </template>
            </ok-tile>

            <ok-tile :disabled="true">
                <template v-slot:leading>
                    <ok-email-icon class="ok-svg-icon-primary-invert"></ok-email-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_community.settings.invite.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_community.settings.invite.description') }}
                    </div>
                </template>
            </ok-tile>

            <ok-tile v-if="isFavorite" :onClick="unfavoriteCommunity">
                <template v-slot:leading>
                    <ok-unfavorite-community-icon class="ok-svg-icon-primary-invert"></ok-unfavorite-community-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_community.settings.favorite.name_unfavorite') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_community.settings.favorite.description_unfavorite') }}
                    </div>
                </template>
            </ok-tile>

            <ok-tile v-else :onClick="favoriteCommunity">
                <template v-slot:leading>
                    <ok-favorite-community-icon class="ok-svg-icon-primary-invert"></ok-favorite-community-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_community.settings.favorite.name_favorite') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_community.settings.favorite.description_favorite') }}
                    </div>
                </template>
            </ok-tile>

            <ok-tile v-if="isCreator" :onClick="confirmCommunityDeletion">
                <template v-slot:leading>
                    <ok-delete-community-icon class="ok-svg-icon-primary-invert"></ok-delete-community-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_community.settings.delete.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_community.settings.delete.description') }}
                    </div>
                </template>
            </ok-tile>

            <ok-tile v-if="!canBanOrUnban" :disabled="true">
                <template v-slot:leading>
                    <ok-report-icon class="ok-svg-icon-primary-invert"></ok-report-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_community.settings.report.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_community.settings.report.description') }}
                    </div>
                </template>
            </ok-tile>

            <ok-tile v-if="!isCreator && canBanOrUnban" :onClick="leaveCommunity">
                <template v-slot:leading>
                    <ok-leave-community-icon class="ok-svg-icon-primary-invert"></ok-leave-community-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_community.settings.leave.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_community.settings.leave.description') }}
                    </div>
                </template>
            </ok-tile>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { BehaviorSubject } from 'rxjs';

    import OkTile from '~/components/tiles/OkTile.vue';
    import { IUser } from '~/models/auth/user/IUser';
    import { ICommunity } from '~/models/communities/community/ICommunity';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IModalService } from '~/services/modal/IModalService';
    import { INavigationService } from '~/services/navigation/INavigationService';
    import { IUserService } from '~/services/user/IUserService';
    import { IUtilsService } from '~/services/utils/IUtilsService';

    @Component({
        name: 'OkCommunitySettings',
        components: { OkTile },
        subscriptions: function () {
            return {
                loggedInUser: this['userService'].loggedInUser
            };
        }
    })
    export default class OkCommunitySettings extends Vue {
        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        isFavorite: boolean = false;
        isCreator: boolean = false;

        canChangeDetails: boolean = false;
        canManageAdministrators: boolean = false;
        canManageModerators: boolean = false;
        canBanOrUnban: boolean = false;
        canCloseOrOpenPosts: boolean = false;

        mounted() {
            this.isFavorite = this.community.isFavorite;
            this.isCreator = this.userService.loggedInUser.value.isCreatorOfCommunity(this.community);
            this.canChangeDetails = this.userService.loggedInUser.value.canChangeDetailsOfCommunity(this.community);
            this.canManageAdministrators = this.userService.loggedInUser.value.canManageCommunityAdministrators(this.community);
            this.canManageModerators = this.userService.loggedInUser.value.canManageCommunityModerators(this.community);
            this.canBanOrUnban = this.userService.loggedInUser.value.canBanOrUnbanUsersInCommunity(this.community);
            this.canCloseOrOpenPosts = this.userService.loggedInUser.value.canCloseOrOpenPostInCommunity(this.community);
        }

        openCommunityDetailsSettings() {
            this.modalService.openCommunityDetailsSettingsModal({
                community: this.community
            });
        }

        openCommunityAdministratorsSettings() {
            this.modalService.openCommunityAdministratorsSettingsModal({
                community: this.community
            });
        }

        openCommunityModeratorsSettings() {
            this.modalService.openCommunityModeratorsSettingsModal({
                community: this.community
            });
        }

        openCommunityBannedUsersSettings() {
            this.modalService.openCommunityBansSettingsModal({
                community: this.community
            });
        }

        cancelCommunityDeletion() {
            const community = this.community;

            return () => {
                this.modalService.openCommunitySettingsModal({
                    community
                });
            };
        }

        deleteCommunity() {
            const community = this.community;

            return async () => {
                try {
                    await this.userService.deleteCommunity({ community });
                    this.navigationService.navigateToHome();
                } catch (err) {
                    const handledError = this.utilsService.handleErrorWithToast(err);

                    if (handledError.isUnhandled) {
                        throw handledError.error;
                    }
                }
            };
        }

        confirmCommunityDeletion() {
            this.modalService.openConfirmationModal({
                title: this.$t('manage_community.delete.delete_confirmation.title').toString(),
                contents: this.$t('manage_community.delete.delete_confirmation.contents').toString(),
                confirmationButtonText: this.$t('global.keywords.yes').toString(),
                cancelButtonText: this.$t('global.keywords.no').toString(),
                confirmationCallback: this.deleteCommunity(),
                cancelCallback: this.cancelCommunityDeletion()
            });
        }

        async favoriteCommunity() {
            try {
                await this.userService.favoriteCommunity({
                    community: this.community
                });

                this.isFavorite = true;
            } catch (err) {
                const handledError = this.utilsService.handleErrorWithToast(err);

                if (handledError.isUnhandled) {
                    throw handledError.error
                }
            }
        }

        async unfavoriteCommunity() {
            try {
                await this.userService.unfavoriteCommunity({
                    community: this.community
                });

                this.isFavorite = false;
            } catch (err) {
                const handledError = this.utilsService.handleErrorWithToast(err);

                if (handledError.isUnhandled) {
                    throw handledError.error
                }
            }
        }

        async leaveCommunity() {
            try {
                await this.userService.leaveCommunity({
                    community: this.community
                });

                this.modalService.ensureHasNoActiveModal();
            } catch (err) {
                const handledError = this.utilsService.handleErrorWithToast(err);

                if (handledError.isUnhandled) {
                    throw handledError.error;
                }
            }
        }
    }
</script>
