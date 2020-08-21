<template>
    <v-popover offset="30"
               placement="bottom-start"
               :open.sync="dropdownIsOpen"
               v-if="loggedInUser"
               @apply-show="handleStreamReRender"
    >
        <div class="is-relative">
            <ok-notifications-icon
                    class="ok-svg-icon-primary-invert is-icon-2x user-notifications-dropdown-icon"></ok-notifications-icon>
            <i v-if="hasNewNotificationSubscription"
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
    }

    .user-notifications-dropdown {
        width: 400px;
        height: 530px;
        overflow-y: scroll;
        overscroll-behavior-y: none;
    }
</style>

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
    import { IStorageService } from "~/services/storage/IStorageService";
    import { IOkStorage } from "~/services/storage/lib/okuna-storage/IOkStorage";
    import { INotification } from "~/models/notifications/notification/INotification";

    @Component({
        name: "OkUserNotificationsDropdown",
        components: {OkUserNotifications},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser,
                hasNewNotificationSubscription: this["hasNewNotification"],
            };
        }
    })
    export default class OkUserNotificationsDropdown extends Vue {

        static readonly hasNewNotificationStorageKey = "hasNewNotification";
        static readonly lastNotificationIdStorageKey = "lastNotificationId";
        static readonly pollingLastNotificationTimeoutInMs = 2000;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private storageService: IStorageService = okunaContainer.get<IStorageService>(TYPES.StorageService);
        private refreshUserOperation?: CancelableOperation<INotification[]>;
        private nextUserRefreshTimeout: any;


        private hasNewNotification: BehaviorSubject<boolean | undefined> = new BehaviorSubject(false);
        private lastNotificationId: BehaviorSubject<number | undefined> = new BehaviorSubject(undefined);

        dropdownIsOpen = false;
        $route!: Route;

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser>
        };

        $refs!: {
            okUserNotifications: OkUserNotifications
        };

        private logger: IOkLogger;
        private storage: IOkStorage<any>;


        mounted() {
            this.logger = this.loggingService.getLogger({
                name: "OkUserNotificationsDropdown"
            });
            this.storage = this.storageService.getLocalForageStorage("OkUserNotificationsDropdown");
            this.bootstrap();
        }

        async bootstrap() {
            await this.bootstrapHasNewNotification();
            await this.bootstrapLastNotificationId();
            this.userService.loggedInUser.subscribe(this.onLoggedInUser);
        }

        destroyed() {
            this.stopPollingLastNotification();
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
                this.setHasNewNotification(false);
            }
        }


        private async onLoggedInUser(user: IUser | null | undefined) {
            if (user) {
                if (!this.nextUserRefreshTimeout) {
                    this.logger.info("Starting polling user");
                    this.startPollingLastNotification();
                }
            } else if(user === null){
                this.stopPollingLastNotification();
                this.logger.info('Clearing notifications data');
                this.clearLastNotificationId();
                this.clearHasNewNotification();
            }
        }

        startPollingLastNotification() {
            return this.pollLastNotification();
        }

        stopPollingLastNotification() {
            this.refreshUserOperation?.cancel();
            if (this.nextUserRefreshTimeout) {
                clearTimeout(this.nextUserRefreshTimeout);
                this.nextUserRefreshTimeout = undefined;
            }
        }

        async pollLastNotification() {
            this.nextUserRefreshTimeout = setTimeout(async () => {
                const lastNotification = await this.getLastNotification();
                if (lastNotification) await this.onLastNotification(lastNotification);
                this.pollLastNotification();
            }, OkUserNotificationsDropdown.pollingLastNotificationTimeoutInMs);
        }

        async getLastNotification() {
            try {
                this.refreshUserOperation = CancelableOperation.fromPromise(this.userService.getNotifications({
                    types: [],
                    count: 1
                }));
                const notifications = await this.refreshUserOperation.value;
                if (notifications.length) return notifications[0];
            } catch (error) {
                this.logger.error("Failed to get last notification");
            }
        }

        async onLastNotification(lastNotification: INotification) {
            const lastNotificationId = lastNotification.id;
            const storedLastNotificationId = await this.getLastNotificationId();

            if (storedLastNotificationId) {
                if (lastNotification.id > storedLastNotificationId) {
                    // Its a newer notification
                    await this.setHasNewNotification(true);
                }
            } else if (this.$observables.loggedInUser.value.unreadNotificationsCount) {
                await this.setHasNewNotification(true);
            }

            await this.setLastNotificationId(lastNotificationId);
        }

        handleStreamReRender() {
            this.$refs.okUserNotifications.forceReRender();
        }

        private onHasNewNotification() {
            this.$refs.okUserNotifications.refreshStreams();
        }

        private async bootstrapHasNewNotification() {
            const hasNewNotification = await this.getHasNewNotification();
            this.notifyHasNewNotificationChange(hasNewNotification);
        }

        async setHasNewNotification(hasNewNotification: boolean) {
            if (hasNewNotification) this.onHasNewNotification();
            await this.storage.set(OkUserNotificationsDropdown.hasNewNotificationStorageKey, hasNewNotification);
            this.notifyHasNewNotificationChange(hasNewNotification);
        }

        async getHasNewNotification() {
            return await this.storage.get(OkUserNotificationsDropdown.hasNewNotificationStorageKey);
        }

        clearHasNewNotification() {
            return this.storage.remove(OkUserNotificationsDropdown.hasNewNotificationStorageKey);
        }

        private notifyHasNewNotificationChange(hasNewNotification: boolean) {
            this.hasNewNotification.next(hasNewNotification);
        }

        private async bootstrapLastNotificationId() {
            const lastNotificationId = await this.getLastNotificationId();
            this.notifyLastNotificationIdChange(lastNotificationId);
        }

        async setLastNotificationId(lastNotificationId: number) {
            await this.storage.set(OkUserNotificationsDropdown.lastNotificationIdStorageKey, lastNotificationId);
            this.notifyLastNotificationIdChange(lastNotificationId);
        }

        clearLastNotificationId() {
            return this.storage.remove(OkUserNotificationsDropdown.lastNotificationIdStorageKey);
        }

        async getLastNotificationId() {
            return await this.storage.get(OkUserNotificationsDropdown.lastNotificationIdStorageKey);
        }

        private notifyLastNotificationIdChange(lastNotificationId: number) {
            this.lastNotificationId.next(lastNotificationId);
        }

    }
</script>
