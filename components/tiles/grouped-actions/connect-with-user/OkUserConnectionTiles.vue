<template>
   <div v-if="user">
       <template
               v-if="user.isConnected &&
            !user.isFullyConnected &&
            !user.isPendingConnectionConfirmation"
       >
           <ok-disconnect-from-user-tile :user="user" :title="$t('global.snippets.cancel_connection_request')" @onDisconnectedFromUser="onDisconnectedFromUser"></ok-disconnect-from-user-tile>
           <ok-update-connection-circles-tile :user="user"></ok-update-connection-circles-tile>
       </template>
       <template v-else-if="user.isPendingConnectionConfirmation">
           <ok-confirm-connection-with-user-tile :user="user" @onConnectionConfirmed="onConnectionConfirmed"></ok-confirm-connection-with-user-tile>
           <ok-disconnect-from-user-tile :user="user" @onDisconnectedFromUser="onDisconnectedFromUser"></ok-disconnect-from-user-tile>
       </template>
       <template v-else-if="user.isFullyConnected">
           <ok-update-connection-circles-tile :user="user"></ok-update-connection-circles-tile>
           <ok-disconnect-from-user-tile :user="user" @onDisconnectedFromUser="onDisconnectedFromUser"></ok-disconnect-from-user-tile>
       </template>
       <template v-else>
           <ok-connect-with-user-tile :user="user"></ok-connect-with-user-tile>
       </template>
   </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkTile from "~/components/tiles/OkTile.vue";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { IUserService } from "~/services/user/IUserService";
    import { ToastType } from "~/services/toast/lib/ToastType";
    import { IToastService } from "~/services/toast/IToastService";
    import { ILocalizationService } from "~/services/localization/ILocalizationService";
    import { IUser } from "~/models/auth/user/IUser";
    import OkDisconnectFromUserTile
        from '~/components/tiles/grouped-actions/connect-with-user/components/OkDisconnectFromUserTile.vue';
    import OkUpdateConnectionCirclesTile
        from '~/components/tiles/grouped-actions/connect-with-user/components/OkUpdateConnectionCirclesTile.vue';
    import OkConfirmConnectionWithUserTile
        from '~/components/tiles/grouped-actions/connect-with-user/components/OkConfirmConnectionWithUserTile.vue';
    import OkConnectWithUserTile
        from '~/components/tiles/grouped-actions/connect-with-user/components/OkConnectWithUserTile.vue';
    import { IConnection } from '~/models/connections/connection/IConnection';

    @Component({
        name: "OkUserConnectionTiles",
        components: {
            OkConnectWithUserTile,
            OkConfirmConnectionWithUserTile, OkUpdateConnectionCirclesTile, OkDisconnectFromUserTile, OkTile},
    })
    export default class OkUserConnectionTiles extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        onDisconnectedFromUser(user: IUser){
            this.$emit('onDisconnectedFromUser', user);
        }

        onConnectionConfirmed(connection: IConnection){
            this.$emit('onConnectionConfirmed', connection);
        }
    }
</script>
