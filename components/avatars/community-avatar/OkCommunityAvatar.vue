<template>
    <div>
        <ok-image-avatar v-if="community.avatar" :avatar-url="community.avatar" :avatar-size="this.avatarSize"
                         :avatar-border-radius="avatarBorderRadius">
        </ok-image-avatar>
        <ok-letter-avatar v-else :letter="community.name.charAt(0)" :text-color="community.colorInvert"
                          :background-color="community.color" :avatar-size="this.avatarSize"
                          :avatar-border-radius="avatarBorderRadius"></ok-letter-avatar>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkImageAvatar from "~/components/avatars/image-avatar/OkImageAvatar.vue";
    import { OkAvatarBorderRadius } from "~/components/avatars/lib/OkAvatarBorderRadius";
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkLetterAvatar from "~/components/avatars/letter-avatar/OkLetterAvatar.vue";

    @Component({
        name: "OkCommunityAvatar",
        components: {OkLetterAvatar, OkImageAvatar},
    })
    export default class extends Vue {
        @Prop(Object) readonly community: ICommunity;
        @Prop(Number) readonly avatarSize: OkAvatarSize;
        @Prop(Number) readonly avatarBorderRadius: OkAvatarBorderRadius;

    }
</script>
