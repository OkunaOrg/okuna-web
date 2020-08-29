<template>
    <ok-user-avatar v-if="loggedInUser"
                    :user="loggedInUser"
                    :avatar-size="avatarSize"
                    :avatar-border-radius="avatarBorderRadius"/>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { IUser } from "~/models/auth/user/IUser";
    import { OkAvatarBorderRadius } from "~/components/avatars/lib/OkAvatarBorderRadius";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "~/node_modules/rxjs";

    @Component({
        name: "OkLoggedInUserAvatar",
        components: {OkUserAvatar},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkLoggedInUserAvatar extends Vue {
        @Prop(Number) readonly avatarSize: OkAvatarSize;
        @Prop(Number) readonly avatarBorderRadius: OkAvatarBorderRadius;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

    }
</script>
