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
        dropdownIsOpen = false;
        $route!: Route;

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser>
        };

        $refs!: {
            dropdownContainer: OkUserNotifications
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

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
