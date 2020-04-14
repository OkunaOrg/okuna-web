<template>
    <b-dropdown aria-role="list" v-if="loggedInUser">
        <button
                class="button is-rounded ok-has-background-primary-highlight ok-has-text-primary-invert is-borderless has-padding-left-10 has-padding-right-10"
                slot="trigger" slot-scope="{ active }"
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


        <b-dropdown-item aria-role="button"
        >
            ASDAS
        </b-dropdown-item>
    </b-dropdown>
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

        $observables!: {
            loggedInUser: IUser
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);


    }
</script>