<template>
    <div>
        <ok-notifications-icon
                v-if="loggedInUser"
                class="ok-svg-icon-primary-invert is-icon-2x user-notifications-dropdown-icon"></ok-notifications-icon>
        <i v-if="hasNewNotification"
           class="user-notifications-dropdown-icon-bell ok-has-background-accent-gradient"></i>
    </div>
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
</style>

<script lang="ts">


    import { TYPES } from "../../../../../services/inversify-types";
    import { okunaContainer } from "../../../../../services/inversify";
    import { INotificationsService } from "../../../../../services/notifications/INotificationsService";
    import { Component, Vue, Watch } from "nuxt-property-decorator"
    import { BehaviorSubject, Subscription } from "rxjs";
    import { IUser } from "../../../../../models/auth/user/IUser";
    import { Route } from "vue-router";
    import { IUserService } from '~/services/user/IUserService';

    @Component({
        name: "OkMobileNotificationsIcon",
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser,
            };
        }
    })
    export default class OkMobileNotificationsIcon extends Vue {

        private notificationsService: INotificationsService = okunaContainer.get<INotificationsService>(TYPES.NotificationsService);
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);


        $route!: Route;
        hasNewNotification = false;

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser>
        };


        private newNotificationSubscription: Subscription;

        created() {
            this.newNotificationSubscription = this.notificationsService.hasNewNotification.subscribe(this.onHasNewNotification);
        }

        destroyed() {
            this.newNotificationSubscription.unsubscribe();
        }

        @Watch("$route")
        onRouteChange(to, from) {
            if (to.name === "notifications") {
                this.notificationsService.setNoLongerHasNewNotification();
            }
        }

        private onHasNewNotification(hasNewNotification: boolean | undefined) {
            if (typeof hasNewNotification === "undefined") return;
            // Only show the new notification icon when dropdown is closed
            if (hasNewNotification) {
                if (this.$route.name !== "notifications") this.hasNewNotification = true;
            } else {
                this.hasNewNotification = false;
            }
        }

    }
</script>
