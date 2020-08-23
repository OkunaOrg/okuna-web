<template>
    <section class="notifications-list" v-if="loggedInUser">
        <div class="notifications-stream">
            <ok-http-list
                    :refresher="notificationsRefresher"
                    :on-programmatic-refresh="notificationsReader"
                    :on-scroll-loader="notificationsOnScrollLoader"
                    ref="okHttpList"
                    list-type="notification">
                <ok-user-notification
                        slot-scope="props"
                        :notification="props.item"
                        :currentUser="loggedInUser"
                ></ok-user-notification>
            </ok-http-list>
        </div>
    </section>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IUser } from "~/models/auth/user/IUser";
    import { IUserService } from "~/services/user/IUserService";
    import { INotification } from "~/models/notifications/notification/INotification";
    import { NotificationType } from "~/models/notifications/notification/lib/NotificationType";
    import OkUserNotification from "~/components/notifications/components/notification/OkUserNotification.vue";
    import { BehaviorSubject } from "rxjs";
    import OkHttpList from "~/components/http-list/OkHttpList.vue";
    import { OkHttpListRefreshParams } from "~/components/http-list/lib/OkHttpListParams";

    @Component({
        name: "OkUserNotificationsStream",
        components: {OkHttpList, OkUserNotification},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            };
        }
    })
    export default class OkUserNotificationsStream extends Vue {

        static infiniteScrollChunkNotificationsCount = 10;

        @Prop(Array) readonly notificationTypes: NotificationType[];

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser | undefined>
        };

        $refs!: {
            okHttpList: OkHttpList<INotification>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        notifications: INotification[] = [];

        async notificationsRefresher(): Promise<INotification[]> {
            return this.userService.getNotifications({
                count: OkUserNotificationsStream.infiniteScrollChunkNotificationsCount,
                types: this.notificationTypes
            });
        }

        async notificationsOnScrollLoader(notifications: INotification[]): Promise<INotification[]> {
            const lastNotification = notifications[notifications.length - 1];
            const lastNotificationId = lastNotification.id;

            return this.userService.getNotifications({
                count: OkUserNotificationsStream.infiniteScrollChunkNotificationsCount,
                types: this.notificationTypes,
                maxId: lastNotificationId
            });
        }

        refresh(params?: OkHttpListRefreshParams) {
            return this.$refs.okHttpList.refresh(params);
        }

        notificationsReader() {
            return this.userService.readNotifications({
                types: this.notificationTypes
            });
        }

    }
</script>
