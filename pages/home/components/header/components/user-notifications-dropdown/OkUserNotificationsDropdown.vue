<template>
    <v-popover offset="30"
               placement="bottom-start"
               :open.sync="dropdownIsOpen"
               v-if="loggedInUser"
               @apply-show="handleStreamReRender"
    >
        <ok-notifications-icon
                class="ok-svg-icon-primary-invert is-icon-2x user-notifications-dropdown-icon"></ok-notifications-icon>
        <div slot="popover" class="ok-has-background-primary has-border-radius-10 ok-has-border-primary-highlight">
            <ok-user-notifications class="user-notifications-dropdown" ref="dropdownContainer"></ok-user-notifications>
        </div>
    </v-popover>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from "nuxt-property-decorator"
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUser } from "~/models/auth/user/IUser";
    import { BehaviorSubject } from "rxjs";
    import OkUserNotifications from "~/components/notifications/OkUserNotifications.vue";
    import { Route } from "vue-router";
    import { IOkLogger } from "~/services/logging/types";
    import { ILoggingService } from "~/services/logging/ILoggingService";
    import { CancelableOperation } from "~/lib/CancelableOperation";

    @Component({
        name: "OkUserNotificationsDropdown",
        components: {OkUserNotifications},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            };
        }
    })
    export default class OkUserNotificationsDropdown extends Vue {

        static pollingUserTimeoutInMs = 2000;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private refreshUserOperation?: CancelableOperation<any>;
        private nextUserRefreshTimeout: number;

        dropdownIsOpen = false;
        $route!: Route;
        hasNewNotification = false;

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser>
        };

        $refs!: {
            dropdownContainer: OkUserNotifications
        };

        private logger: IOkLogger;

        mounted() {
            this.logger = this.loggingService.getLogger({
                name: "OkUserNotificationsDropdown"
            });

            this.userService.loggedInUser.subscribe(this.onLoggedInUser);
        }

        destroyed() {
            this.stopPollingUser();
        }

        private onLoggedInUser(user: IUser | null | undefined) {
            if (user) {
                if(!this.nextUserRefreshTimeout){
                    this.logger.info('Starting polling user');
                    this.pollUser();
                }
            } else {
                this.logger.info('Stopping polling user');
                this.stopPollingUser();
            }
        }

        stopPollingUser() {
            this.refreshUserOperation?.cancel();
            if (this.nextUserRefreshTimeout) {
                clearTimeout(this.nextUserRefreshTimeout);
                this.nextUserRefreshTimeout = undefined;
            }
        }

        async pollUser() {
            this.nextUserRefreshTimeout = setTimeout(async ()=>{
                await this.refreshUser();
                this.pollUser();
            }, OkUserNotificationsDropdown.pollingUserTimeoutInMs);
        }

        async refreshUser() {
            try {
                this.refreshUserOperation = CancelableOperation.fromPromise(this.userService.refreshLoggedInUser());
                const user = await this.refreshUserOperation.value;
                this.onUserRefreshed(user);
            } catch (error) {
                this.logger.error("Failed to refresh user");
            }
        }

        onUserRefreshed(user: IUser){
            
        }


        @Watch("$route")
        onRouteChange(to, from) {
            // Close tooltip
            this.dropdownIsOpen = false;
        }

        handleStreamReRender() {
            this.$refs["dropdownContainer"]["forceReRender"]();
        }


    }
</script>

<style lang="scss" scoped>
    .user-notifications-dropdown-icon {
        top: 0;
    }

    .user-notifications-dropdown {
        width: 400px;
        height: 530px;
        overflow-y: scroll;
        overscroll-behavior-y: none;
    }
</style>
