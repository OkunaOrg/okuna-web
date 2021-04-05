<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div class="box ok-has-background-primary-highlight is-paddingless">
            <ok-tile v-if="loggedInUser" :onClick="openUserProfileSettings">
                <template v-slot:leading>
                    <ok-edit-icon class="ok-svg-icon-primary-invert"></ok-edit-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_user.settings.details.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_user.settings.details.description') }}
                    </div>
                </template>
            </ok-tile>

            <ok-tile v-if="loggedInUser" :onClick="toggleFollowersCountVisibility">
                <template v-slot:leading>
                    <ok-followers-icon class="ok-svg-icon-primary-invert"></ok-followers-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_user.settings.followers_count.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_user.settings.followers_count.description') }}
                    </div>
                </template>

                <template v-slot:trailing>
                    <div class="field">
                        <b-switch :value="followersCountVisible"
                                  type="is-success">
                        </b-switch>
                    </div>
                </template>
            </ok-tile>

            <ok-tile v-if="loggedInUser" :onClick="toggleCommunityPostsVisibility">
                <template v-slot:leading>
                    <ok-communities-icon class="ok-svg-icon-primary-invert"></ok-communities-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_user.settings.community_posts.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_user.settings.community_posts.description') }}
                    </div>
                </template>

                <template v-slot:trailing>
                    <div class="field">
                        <b-switch :value="communityPostsVisible"
                                  type="is-success">
                        </b-switch>
                    </div>
                </template>
            </ok-tile>

            <div class="is-size-6 has-padding-left-20 has-padding-right-20 has-padding-top-10 has-padding-bottom-10 has-text-weight-bold">
                {{ $t('manage_user.visibility.title') }}
            </div>

            <ok-tile v-if="loggedInUser" :onClick="openUserVisibilitySettings">
                <template v-slot:leading>
                    <ok-public-visibility-icon v-if="userVisibility === UserVisibility.public" class="ok-svg-icon-primary-invert"></ok-public-visibility-icon>
                    <ok-okuna-visibility-icon v-if="userVisibility === UserVisibility.okuna" class="ok-svg-icon-primary-invert"></ok-okuna-visibility-icon>
                    <ok-private-visibility-icon v-if="userVisibility === UserVisibility.private" class="ok-svg-icon-primary-invert"></ok-private-visibility-icon>
                </template>

                <template v-slot:content>
                    <div v-if="userVisibility === UserVisibility.public">
                        <div class="ok-has-text-primary-invert">
                            {{ $t('manage_user.visibility.public.name') }}
                        </div>
                        <div class="subtitle is-7 ok-has-text-primary-invert-80">
                            {{ $t('manage_user.visibility.public.description') }}
                        </div>
                    </div>

                    <div v-if="userVisibility === UserVisibility.okuna">
                        <div class="ok-has-text-primary-invert">
                            {{ $t('manage_user.visibility.okuna.name') }}
                        </div>
                        <div class="subtitle is-7 ok-has-text-primary-invert-80">
                            {{ $t('manage_user.visibility.okuna.description') }}
                        </div>
                    </div>

                    <div v-if="userVisibility === UserVisibility.private">
                        <div class="ok-has-text-primary-invert">
                            {{ $t('manage_user.visibility.private.name') }}
                        </div>
                        <div class="subtitle is-7 ok-has-text-primary-invert-80">
                            {{ $t('manage_user.visibility.private.description') }}
                        </div>
                    </div>
                </template>
            </ok-tile>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';

    import OkTile from '~/components/tiles/OkTile.vue';

    import { BehaviorSubject } from 'rxjs';
    import { IUser } from '~/models/auth/user/IUser';
    import { TYPES } from '~/services/inversify-types';
    import { IUserService } from '~/services/user/IUserService';
    import { IModalService } from '~/services/modal/IModalService';
    import { IUtilsService } from '~/services/utils/IUtilsService';
    import { okunaContainer } from '~/services/inversify';
    import { UserVisibility } from '~/models/auth/user/lib/UserVisibility';

    @Component({
        name: 'OkUserSettings',
        components: {
            OkTile
        },
        subscriptions: function () {
            return {
                loggedInUser: this['userService'].loggedInUser
            };
        }
    })
    export default class OkUserSettings extends Vue {
        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        UserVisibility = UserVisibility;

        followersCountVisible: boolean = false;
        communityPostsVisible: boolean = false;
        userVisibility: UserVisibility = UserVisibility.public;

        mounted() {
            if (this.userService.loggedInUser) {
                const { profile, visibility } = this.userService.loggedInUser.getValue();
                this.followersCountVisible = profile.followersCountVisible;
                this.communityPostsVisible = profile.communityPostsVisible;
                this.userVisibility = visibility;
            }
        }

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        async toggleFollowersCountVisibility() {
            this.followersCountVisible = !this.followersCountVisible;

            try {
                await this.userService.updateUser({
                    followersCountVisible: this.followersCountVisible
                });
            } catch (err) {
                const handledError = this.utilsService.handleErrorWithToast(err);

                if (handledError.isUnhandled) {
                    throw handledError.error;
                }
            }
        }

        async toggleCommunityPostsVisibility() {
            this.communityPostsVisible = !this.communityPostsVisible;

            try {
                await this.userService.updateUser({
                    communityPostsVisible: this.communityPostsVisible
                });
            } catch (err) {
                const handledError = this.utilsService.handleErrorWithToast(err);

                if (handledError.isUnhandled) {
                    throw handledError.error;
                }
            }
        }

        openUserProfileSettings() {
            this.modalService.openUserProfileSettingsModal();
        }

        openUserVisibilitySettings() {
            this.modalService.openUserVisibilitySettingsModal();
        }
    }
</script>
