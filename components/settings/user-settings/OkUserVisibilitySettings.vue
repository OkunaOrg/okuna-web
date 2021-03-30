<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div class="box ok-has-background-primary-highlight is-paddingless">
            <ok-tile :disabled="saving" :onClick="() => setUserVisibility(UserVisibility.public)">
                <template v-slot:leading>
                    <ok-public-visibility-icon class="ok-svg-icon-primary-invert"></ok-public-visibility-icon>
                </template>

                <template v-slot:content>
                    <div class="ok-has-text-primary-invert">
                        Public
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        Everyone on the internet can see your profile.
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
                        Okuna
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        Only members of Okuna can see your profile.
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
                        Private
                    </div>
                    <div class="subtitle is-7 ok-has-text-primary-invert-80">
                        Only people you approve can see your profile.
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

        mounted() {
            if (this.userService.loggedInUser) {
                const { visibility } = this.userService.loggedInUser.value;
                this.visibility = visibility;
            }
        }

        async setUserVisibility(visibility: UserVisibility) {
            this.visibility = visibility;
            this.saving = true;

            await this.userService.updateUser({
                visibility: this.visibility
            });

            this.saving = false;
            this.modalService.openUserSettingsModal();
        }
    }
</script>
