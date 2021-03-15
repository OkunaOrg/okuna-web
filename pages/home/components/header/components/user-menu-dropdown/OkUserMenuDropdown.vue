<template>
    <v-popover offset="30"
               placement="bottom-start"
               :open.sync="dropdownIsOpen"
               v-if="loggedInUser"
               :popperOptions="popperOptions"
    >
        <!-- This will be the popover target (for the events and position) -->
        <button
                class="button is-rounded ok-has-background-primary-highlight ok-has-text-primary-invert is-borderless has-padding-left-10 has-padding-right-10"
        >
            <ok-user-avatar
                    :user="loggedInUser"
                    :avatar-size="OkAvatarSize.small"
                    :avatar-border-radius="OkAvatarBorderRadius.circle">

            </ok-user-avatar>
            <span class="has-padding-left-10 has-padding-right-10">
                            {{loggedInUser.profile.name}}
                        </span>
            <ok-menu-down-icon class="ok-svg-icon-primary-invert-60 is-icon-2x"></ok-menu-down-icon>
        </button>
        <!-- This will be the content of the popover -->
        <div slot="popover" class="ok-has-background-primary has-border-radius-10 ok-has-border-primary-highlight">
            <ok-user-menu class="ok-user-menu-container" @leaveMenu="handleLeaveMenu"></ok-user-menu>
        </div>
    </v-popover>
</template>

<style lang="scss" scoped>
    .ok-user-menu-container {
        max-height: 85vh;
        overflow-y: auto;
    }
</style>

<script lang="ts">
    import { Component, Vue, Watch } from "nuxt-property-decorator"
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { OkAvatarBorderRadius } from '~/components/avatars/lib/OkAvatarBorderRadius';
    import { BehaviorSubject } from '~/node_modules/rxjs';
    import OkUserMenu from '~/components/menus/OkUserMenu.vue';
    import { Route } from "vue-router";

    @Component({
        name: "OkUserMenuDropdown",
        components: {OkUserMenu, OkUserAvatar},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkUserMenuDropdown extends Vue {

        OkAvatarSize = OkAvatarSize;
        OkAvatarBorderRadius = OkAvatarBorderRadius;
        dropdownIsOpen = false;
        $route!: Route;

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        popperOptions = {
            positionFixed: true,
            modifiers: {
                flip: {
                    enabled: false
                }
            }
        };

        @Watch('$route')
        onRouteChange(to, from){
            // Close tooltip
            this.dropdownIsOpen = false;
        }

        handleLeaveMenu() {
            this.dropdownIsOpen = false;
        }
    }
</script>
