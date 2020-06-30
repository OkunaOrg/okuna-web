<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div
                class="box ok-has-background-primary-highlight is-paddingless">
            <ok-edit-user-tile :user="user" @onUserEdited="onUserEdited" v-if="canEditUser"></ok-edit-user-tile>
            <ok-close-user-tile :user="user" @onUserClosedChange="onUserClosedChange"
                                v-if="canCloseOrOpenUser"></ok-close-user-tile>
            <ok-enable-user-comments-tile :user="user" @onUserCommentsEnabledChange="onUserCommentsEnabledChange"
                                          v-if="canEnableOrDisableUserComments"></ok-enable-user-comments-tile>
            <ok-delete-user-tile :user="user" @onUserDeleted="onUserDeleted" v-if="canDeleteUser"></ok-delete-user-tile>
            <ok-report-user-tile :user="user" :on-user-reported="onUserReported"
                                 v-if="canReportUser"></ok-report-user-tile>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/users/user/IUser";
    import OkTile from "~/components/tiles/OkTile.vue";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IUser } from "~/models/auth/user/IUser";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import OkReportUserTile from "~/components/tiles/action/OkReportUserTile.vue";
    import OkDeleteUserTile from "~/components/tiles/action/OkDeleteUserTile.vue";
    import OkEditUserTile from "~/components/tiles/action/OkEditUserTile.vue";
    import OkCloseUserTile from "~/components/tiles/action/OkCloseUserTile.vue";
    import OkEnableUserCommentsTile from "~/components/tiles/action/OkEnableUserCommentsTile.vue";

    @Component({
        name: "OkUserMoreActions",
        components: {
            OkEnableUserCommentsTile,
            OkCloseUserTile, OkEditUserTile, OkDeleteUserTile, OkReportUserTile, OkTile
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

        get canReportUser() {
            return this.$observables.loggedInUser.value.canReportUser(this.user);
        }

        get canDeleteUser() {
            return this.$observables.loggedInUser.value.canDeleteUser(this.user);
        }

        get canEditUser() {
            return this.$observables.loggedInUser.value.canEditUser(this.user);
        }

        get canCloseOrOpenUser(): boolean {
            return this.$observables.loggedInUser.value.canCloseOrOpenUser(this.user);
        }

        get canEnableOrDisableUserComments(): boolean {
            return this.$observables.loggedInUser.value.canEnableOrDisableUserComments(this.user);
        }


    }
</script>