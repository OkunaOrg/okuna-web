<template>
    <div>
        <ok-image-avatar :avatar-url="user.profile.avatar" :avatar-size="this.avatarSize"
                         :avatar-border-radius="avatarBorderRadius">
        </ok-image-avatar>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { IUser } from "~/models/auth/user/IUser";
    import OkImageAvatar from "~/components/avatars/image-avatar/OkImageAvatar.vue";
    import { OkAvatarBorderRadius } from "~/components/avatars/lib/OkAvatarBorderRadius";

    @Component({
        name: "OkUserAvatar",
        components: {OkImageAvatar},
    })
    export default class extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;
        @Prop(Number) readonly avatarSize: OkAvatarSize;
        @Prop(Number) readonly avatarBorderRadius: OkAvatarBorderRadius;


        mounted() {
        }

    }
</script>
