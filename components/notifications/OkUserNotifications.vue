<template>
    <section class="notifications-container" v-if="loggedInUserReady">
        <div class="notifications-stream">
            <div v-for="notification in notifications" :key="notification.id">
                <ok-user-notification :notification="notification"></ok-user-notification>
            </div>
        </div>

        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import { Route } from "vue-router";
    import { Subscription } from "rxjs";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";

    import { IUser } from "~/models/auth/user/IUser";
    import { IUserService } from '~/services/user/IUserService';

    import { INotification } from "~/models/notifications/notification/INotification";
    import { NotificationType } from "~/models/notifications/notification/lib/NotificationType";
    import OkUserNotification from "~/components/notifications/components/notification/OkUserNotification.vue";

    @Component({
        name: "OkUserNotifications",
        components: {OkUserNotification}
    })
    export default class OkUserNotifications extends Vue {
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        notifications: INotification[] = [];
        loggedInUserReady = false;

        private loggedInUserSubscription: Subscription;

        mounted() {
            this.loggedInUserSubscription = this.userService.loggedInUser.subscribe(this.onLoggedInUser);
        }

        destroyed() {
            this.loggedInUserSubscription.unsubscribe();
        }

        onLoggedInUser(loggedInUser: IUser) {
            if (loggedInUser) {
                this.loggedInUserReady = true;
            }
        }

        infiniteHandler($state) {
            let lastNotificationId;
            const lastNotification = this.notifications[this.notifications.length - 1];
            if (lastNotification) {
                lastNotificationId = lastNotification.id;
            }

            this.userService.getNotifications({
                maxId: lastNotificationId,
                count: 10,
                types: NotificationType.values()
            }).then(userNotifications => {
                if (userNotifications.length) {
                    this.notifications.push(...userNotifications);
                    $state.loaded();
                } else {
                    $state.complete();
                }
            });
        }
    }
</script>
