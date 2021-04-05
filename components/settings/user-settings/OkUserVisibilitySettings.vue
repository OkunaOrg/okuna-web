<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div class="box ok-has-background-primary-highlight is-paddingless">
            <ok-tile :disabled="saving" :onClick="() => setUserVisibility(UserVisibility.public)">
                <template v-slot:leading>
                    <ok-public-visibility-icon class="ok-svg-icon-primary-invert"></ok-public-visibility-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_user.visibility.public.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_user.visibility.public.description') }}
                    </div>
                </template>

                <template v-slot:trailing>
                    <div class="field">
                        <b-radio v-model="visibility" type="is-success" :native-value="UserVisibility.public"></b-radio>
                    </div>
                </template>
            </ok-tile>

            <ok-tile :disabled="saving" :onClick="() => setUserVisibility(UserVisibility.okuna)">
                <template v-slot:leading>
                    <ok-okuna-visibility-icon class="ok-svg-icon-primary-invert"></ok-okuna-visibility-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_user.visibility.okuna.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_user.visibility.okuna.description') }}
                    </div>
                </template>

                <template v-slot:trailing>
                    <div class="field">
                        <b-radio v-model="visibility" type="is-success"  :native-value="UserVisibility.okuna"></b-radio>
                    </div>
                </template>
            </ok-tile>

            <ok-tile :disabled="saving" :onClick="() => setUserVisibility(UserVisibility.private)">
                <template v-slot:leading>
                    <ok-private-visibility-icon class="ok-svg-icon-primary-invert"></ok-private-visibility-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        {{ $t('manage_user.visibility.private.name') }}
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        {{ $t('manage_user.visibility.private.description') }}
                    </div>
                </template>

                <template v-slot:trailing>
                    <div class="field">
                        <b-radio v-model="visibility" type="is-success" :native-value="UserVisibility.private"></b-radio>
                    </div>
                </template>
            </ok-tile>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';

    import { BehaviorSubject } from 'rxjs';

    import OkTile from '~/components/tiles/OkTile.vue';
    import { IUser } from '~/models/auth/user/IUser';
    import { UserVisibility } from '~/models/auth/user/lib/UserVisibility';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IModalService } from '~/services/modal/IModalService';
    import { IUserService } from '~/services/user/IUserService';
    import { IUtilsService } from '~/services/utils/IUtilsService';

    @Component({
        name: 'OkUserVisibilitySettings',
        components: {
            OkTile
        },
        subscriptions: function () {
            return {
                loggedInUser: this['userService'].loggedInUser
            };
        }
    })
    export default class OkUserVisibilitySettings extends Vue {
        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        UserVisibility = UserVisibility;
        visibility: UserVisibility = UserVisibility.public;
        saving: boolean = false;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        mounted() {
            if (this.userService.loggedInUser) {
                const { visibility } = this.userService.loggedInUser.value;
                this.visibility = visibility;
            }
        }

        async setUserVisibility(visibility: UserVisibility) {
            this.visibility = visibility;
            this.saving = true;

            try {
                await this.userService.updateUser({
                    visibility: this.visibility
                });
            } catch (err) {
                const handledError = this.utilsService.handleErrorWithToast(err);

                if (handledError.isUnhandled) {
                    throw handledError.error;
                }
            } finally {
                this.saving = false;
                this.modalService.openUserSettingsModal();
            }
        }
    }
</script>
