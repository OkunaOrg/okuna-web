<template>
    <v-popover offset="30"
               placement="bottom"
               :open.sync="dropdownIsOpen"
               v-if="loggedInUser"
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
        <div slot="popover" class="ok-has-background-primary has-border-radius-10 has-overflow-hidden">
            <nav class="menu has-padding-20">
                <p class="menu-label">
                    My Okuna
                </p>
                <ul class="menu-list">
                    <li>
                        <nuxt-link :to="'/'" class="has-no-hover-text-decoration">
                            <span class="icon has-padding-right-10">
                                 <ok-profile-icon
                                        class="ok-svg-icon-primary-invert"></ok-profile-icon>
                            </span>
                            <span>
                                Profile
                            </span>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="'/'" class="is-disabled has-no-hover-text-decoration">
                            <span class="icon has-padding-right-10">
                                 <ok-circles-icon
                                         class="ok-svg-icon-primary-invert"></ok-circles-icon>
                            </span>
                            <span>
                                Circles
                            </span>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="'/'" class="is-disabled has-no-hover-text-decoration">
                            <span class="icon has-padding-right-10">
                                 <ok-lists-icon
                                         class="ok-svg-icon-primary-invert"></ok-lists-icon>
                            </span>
                            <span>
                                Lists
                            </span>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="'/'" class="is-disabled has-no-hover-text-decoration">
                            <span class="icon has-padding-right-10">
                                 <ok-followers-icon
                                         class="ok-svg-icon-primary-invert"></ok-followers-icon>
                            </span>
                            <span>
                                Followers
                            </span>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="'/'" class="is-disabled has-no-hover-text-decoration">
                            <span class="icon has-padding-right-10">
                                 <ok-invites-icon
                                         class="ok-svg-icon-primary-invert"></ok-invites-icon>
                            </span>
                            <span>
                                Invites
                            </span>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="'/'" class="is-disabled has-no-hover-text-decoration">
                            <span class="icon has-padding-right-10">
                                 <ok-moderator-icon
                                         class="ok-svg-icon-primary-invert"></ok-moderator-icon>
                            </span>
                            <span>
                                Moderation tasks
                            </span>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="'/'" class="is-disabled has-no-hover-text-decoration">
                            <span class="icon has-padding-right-10">
                                 <ok-report-icon
                                         class="ok-svg-icon-primary-invert"></ok-report-icon>
                            </span>
                            <span>
                                Moderation penalties
                            </span>
                        </nuxt-link>
                    </li>
                </ul>
                <p class="menu-label">
                    App & Account
                </p>
                <ul class="menu-list">
                    <li>
                        <nuxt-link :to="'/'" class="is-disabled has-no-hover-text-decoration">
                            <span class="icon has-padding-right-10">
                                 <ok-settings-icon
                                         class="ok-svg-icon-primary-invert"></ok-settings-icon>
                            </span>
                            <span>
                                Settings
                            </span>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="'/'" class="has-no-hover-text-decoration">
                            <span class="icon has-padding-right-10">
                                 <ok-customize-icon
                                         class="ok-svg-icon-primary-invert"></ok-customize-icon>
                            </span>
                            <span>
                                Themes
                            </span>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="'/'" class="has-no-hover-text-decoration">
                            <span class="icon has-padding-right-10">
                                 <ok-help-icon
                                         class="ok-svg-icon-primary-invert"></ok-help-icon>
                            </span>
                            <span>
                                Support & Feedback
                            </span>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="'/'" class="has-no-hover-text-decoration">
                            <span class="icon has-padding-right-10">
                                 <ok-link-icon
                                         class="ok-svg-icon-primary-invert"></ok-link-icon>
                            </span>
                            <span>
                                Useful links
                            </span>
                        </nuxt-link>
                    </li>
                </ul>
                <ul class="menu-list ok-has-border-top-primary-highlight has-padding-top-10">
                    <li>
                        <nuxt-link :to="'/'" class="has-no-hover-text-decoration">
                            <span class="icon has-padding-right-10">
                                 <ok-logout-icon
                                         class="ok-svg-icon-primary-invert"></ok-logout-icon>
                            </span>
                            <span>
                                Logout
                            </span>
                        </nuxt-link>
                    </li>
                </ul>
            </nav>
        </div>
    </v-popover>
</template>

<style lang="scss" scoped>

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserAvatar from "~/components/avatars/user-avatar/UserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { OkAvatarBorderRadius } from '~/components/avatars/lib/OkAvatarBorderRadius';
    import { Observable } from '~/node_modules/rxjs';

    @Component({
        name: "OkUserDropdown",
        components: {OkUserAvatar},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkUserDropdown extends Vue {

        OkAvatarSize = OkAvatarSize;
        OkAvatarBorderRadius = OkAvatarBorderRadius;
        dropdownIsOpen = false;

        $observables!: {
            loggedInUser: Record<string, Observable<IUser>>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);


    }
</script>