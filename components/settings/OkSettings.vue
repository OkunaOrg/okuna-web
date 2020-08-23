<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div
                class="box ok-has-background-primary-highlight is-paddingless">
            <ok-tile :disabled="true" v-if="loggedInUser">
                <template v-slot:leading>
                    <ok-account-icon
                            class="ok-svg-icon-primary-invert"></ok-account-icon>
                </template>

                <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{$t('global.snippets.account_settings')}}
                            </span>
                </template>
            </ok-tile>
            <ok-tile :onClick="openApplicationSettings">
                <template v-slot:leading>
                    <ok-cellphone-icon
                            class="ok-svg-icon-primary-invert"></ok-cellphone-icon>
                </template>

                <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{$t('global.snippets.application_settings')}}
                            </span>
                </template>
            </ok-tile>
            <ok-tile :disabled="true">
                <template v-slot:leading>
                    <ok-developer-icon
                            class="ok-svg-icon-primary-invert"></ok-developer-icon>
                </template>

                <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{$t('global.snippets.developer_settings')}}
                            </span>
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

    @Component({
        name: "OkSettings",
        components: {
            OkTile
        },
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkSettings extends Vue {

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        openApplicationSettings() {
            this.modalService.openApplicationSettingsModal();
        }

    }
</script>
