<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div
                class="box ok-has-background-primary-highlight is-paddingless">
            <ok-user-connection-tiles :user="user"></ok-user-connection-tiles>
            <ok-block-user-tile :user="user" v-if="canBlockOrUnblockUser"></ok-block-user-tile>
            <ok-report-user-tile :user="user" :on-user-reported="onUserReported"></ok-report-user-tile>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkTile from "~/components/tiles/OkTile.vue";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import OkReportUserTile from "~/components/tiles/action/OkReportUserTile.vue";
    import OkBlockUserTile from '~/components/tiles/action/OkBlockUserTile.vue';
    import OkUserConnectionTiles from '~/components/tiles/grouped-actions/connect-with-user/OkUserConnectionTiles.vue';
    import { IUser } from '~/models/auth/user/IUser';

    @Component({
        name: "OkUserMoreActions",
        components: {
            OkUserConnectionTiles,
            OkBlockUserTile, OkReportUserTile, OkTile
        },
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkUserMoreActions extends Vue {


        @Prop({
            type: Object,
            required: false
        }) readonly user: IUser;

        @Prop({
            type: Function,
            required: false
        }) readonly onUserReported: (user: IUser) => void;


        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);


        onUserDeleted(user: IUser) {
            this.$emit("onUserDeleted", user);
        }

        onUserCommentsEnabledChange(commentsEnabled: boolean) {
            this.$emit("onUserCommentsEnabledChange", commentsEnabled);
        }

        onUserClosedChange(userIsClosed: boolean) {
            this.$emit("onUserClosedChange", userIsClosed);
        }

        get canBlockOrUnblockUser() {
            return this.$observables.loggedInUser.value.canBlockOrUnblockUser(this.user);
        }



    }
</script>