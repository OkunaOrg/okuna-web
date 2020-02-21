<template>
    <div>
        <ok-image-avatar :avatar-url="user.profile.avatar" :avatar-size="this.avatarSize">
        </ok-image-avatar>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkAvatarSize } from "~/components/avatars/lib/AvatarSize";
    import { IUser } from '~/models/auth/user/IUser';
    import OkImageAvatar from '~/components/avatars/image-avatar/ImageAvatar.vue';

    @Component({
        name: "OkUserAvatar",
        components: {OkImageAvatar},
    })
    export default class extends Vue {
        @Prop(Object) readonly user: IUser;
        @Prop(Number) readonly avatarSize: OkAvatarSize;



        mounted() {
            console.log(this.user);
        }

    }
</script>
