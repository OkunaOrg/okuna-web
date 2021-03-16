<template>
    <v-popover offset="30"
               placement="bottom-start"
               :open.sync="dropdownIsOpen"
               v-if="loggedInUser"
               @apply-show="handleStreamReRender"
               :popperOptions="popperOptions"
    >
        <div class="is-relative">
            <ok-notifications-icon
                    class="ok-svg-icon-primary-invert is-icon-2x user-notifications-dropdown-icon"></ok-notifications-icon>
            <i v-if="hasNewNotification"
               class="user-notifications-dropdown-icon-bell ok-has-background-accent-gradient"></i>
        </div>
        <div slot="popover" class="ok-has-background-primary has-border-radius-10 ok-has-border-primary-highlight">
            <ok-user-notifications class="user-notifications-dropdown"
                                   ref="okUserNotifications"></ok-user-notifications>
        </div>
    </v-popover>
</template>

<style lang="scss" scoped>
    .user-notifications-dropdown-icon {
        top: 0;
    }

    .user-notifications-dropdown-icon-bell {
        position: absolute;
        height: 10px;
        width: 10px;
        border-radius: 500px;
        top: 0;
        right: -10px;
    }

    .user-notifications-dropdown {
        width: 400px;
        height: 530px;
        max-height: 85vh;
        overflow-y: scroll;
        overscroll-behavior-y: none;
    }
</style>

<script lang="ts">
    import { Component, Vue, Watch } from "nuxt-property-decorator"
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IUser } from "~/models/auth/user/IUser";
    import { BehaviorSubject, Subscription } from "rxjs";
    import OkUserNotifications from "~/components/notifications/OkUserNotifications.vue";
    import { Route } from "vue-router";
    import { IOkLogger } from "~/services/logging/types";
    import { IUserService } from "~/services/user/IUserService";
    import { INotificationsService } from "~/services/notifications/INotificationsService";
    import { ILoggingService } from "~/services/logging/ILoggingService";

    @Component({
        name: "OkUserNotificationsDropdown",
        components: {OkUserNotifications},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser,
            };
        }
    })
    export default class OkUserNotificationsDropdown extends Vue {

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private notificationsService: INotificationsService = okunaContainer.get<INotificationsService>(TYPES.NotificationsService);


        $route!: Route;
        dropdownIsOpen = false;
        hasNewNotification = false;

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser>
        };

        $refs!: {
            okUserNotifications: OkUserNotifications
        };

        private logger: IOkLogger;
        private newNotificationSubscription: Subscription;

        created() {
            this.newNotificationSubscription = this.notificationsService.hasNewNotification.subscribe(this.onHasNewNotification);
            this.logger = this.loggingService.getLogger({
                name: "OkUserNotificationsDropdown"
            });
        }

        destroyed() {
            this.newNotificationSubscription.unsubscribe();
        }

        popperOptions = {
            positionFixed: true,
            modifiers: {
                flip: {
                    enabled: false
                }
            }
        };

        private onHasNewNotification(hasNewNotification: boolean | undefined) {
            if (typeof hasNewNotification === "undefined") return;
            // Only show the new notification icon when dropdown is closed
            if(hasNewNotification){
                if (!this.dropdownIsOpen) this.hasNewNotification = true;
                this.refreshNotifications();
            } else{
                this.hasNewNotification = false;
            }
        }

        @Watch("$route")
        onRouteChange(to, from) {
            // Close tooltip
            this.dropdownIsOpen = false;
        }


        @Watch("dropdownIsOpen")
        onDropdownIsOpenChange(val, oldVal) {
            if (val) {
                // Dropdown was opened
                this.notificationsService.setNoLongerHasNewNotification();
            }
        }

        handleStreamReRender() {
            this.$refs.okUserNotifications.forceReRender();
        }

        private refreshNotifications() {
            this.logger.info(`Refreshing notifications`);

            // Do it as non programmatic so that we dont trigger side effects of programmatic refresh
            this.$refs?.okUserNotifications?.refreshStreams({
                isProgrammaticRefresh: false
            });
        }


    }
</script>
