<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div
                class="box ok-has-background-primary-highlight is-paddingless">
            <ok-tile :onClick="toggleNotificationsSoundIsEnabled">
                <template v-slot:leading>
                    <ok-notifications-icon
                            class="ok-svg-icon-primary-invert"></ok-notifications-icon>
                </template>

                <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{$t('global.snippets.notifications_sound')}}
                            </span>
                </template>
                <template v-slot:trailing>
                    <div class="field">
                        <b-switch :value="notificationsSoundIsEnabled"
                                  type="is-success">
                        </b-switch>
                    </div>
                </template>
            </ok-tile>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import OkTile from "~/components/tiles/OkTile.vue";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IUser } from "~/models/auth/user/IUser";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IModalService } from "~/services/modal/IModalService";
    import { IUserPreferencesService } from "~/services/user-preferences/IUserPreferencesService";

    @Component({
        name: "OkApplicationSettings",
        components: {
            OkTile
        },
        subscriptions: function () {
            return {
                notificationsSoundIsEnabled: this["userPreferencesService"].notificationsSoundIsEnabled,
            };
        }
    })
    export default class OkApplicationSettings extends Vue {

        userPreferencesService: IUserPreferencesService = okunaContainer.get<IUserPreferencesService>(TYPES.UserPreferencesService);

        $observables!: {
            notificationsSoundIsEnabled: BehaviorSubject<boolean | undefined>
        };

        toggleNotificationsSoundIsEnabled() {
            this.userPreferencesService.setNotificationsSoundIsEnabled(!this.$observables.notificationsSoundIsEnabled.value);
        }

    }
</script>
