<template>
    <div class="is-flex justify-center align-items-center">
        <ok-user-more-actions :user="params.user" class="ok-actions-modal"
                              @onDisconnectedFromUser="onDisconnectedFromUser"
                              @onConnectionConfirmed="onConnectionConfirmed"
                              @onUserIsBlockedChange="onUserIsBlockedChange"
                              :on-user-reported="params.onUserReported"></ok-user-more-actions>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { UserActionsModalParams } from "~/services/modal/IModalService";
    import OkUserMoreActions from "~/components/actions/user-more-actions/OkUserMoreActions.vue";
    import { IConnection } from "~/models/connections/connection/IConnection";
    import { IUser } from '~/models/auth/user/IUser';

    @Component({
        name: "OkUserActionsModal",
        components: {OkUserMoreActions},
    })
    export default class OkUserActionsModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: UserActionsModalParams;

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;


        onDisconnectedFromUser(user: IUser) {
            this.$parent["close"]();
        }

        onConnectionConfirmed(connection: IConnection) {
            this.$parent["close"]();
        }


        onUserIsBlockedChange(isBlocked: boolean) {
            this.$parent["close"]();
        }

    }
</script>
