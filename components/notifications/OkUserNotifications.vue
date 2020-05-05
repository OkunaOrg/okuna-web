<template>
    <section class="notifications-container" v-if="loggedInUser">
        <div class="notifications-stream">
            <div v-for="notification in notifications" :key="notification.id">
                <ok-user-notification :notification="notification" :currentUser="loggedInUser"></ok-user-notification>
            </div>
        </div>

        <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading"></infinite-loading>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import { Subscription } from "rxjs";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import InfiniteLoading from 'vue-infinite-loading';

    import { IUser } from "~/models/auth/user/IUser";
    import { IUserService } from '~/services/user/IUserService';

    import { INotification } from "~/models/notifications/notification/INotification";
    import { NotificationType } from "~/models/notifications/notification/lib/NotificationType";
    import OkUserNotification from "~/components/notifications/components/notification/OkUserNotification.vue";
    import { BehaviorSubject } from "rxjs";

    @Component({
        name: "OkUserNotifications",
        components: {OkUserNotification},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            };
        }
    })
    export default class OkUserNotifications extends Vue {
        $observables!: {
            loggedInUser?: BehaviorSubject<IUser | undefined>
        };

        $refs!: {
            infiniteLoading: InfiniteLoading
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        notifications: INotification[] = [];

        mounted() {
            if (this.$refs["infiniteLoading"]) {
                this.$refs["infiniteLoading"]["attemptLoad"]();
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
