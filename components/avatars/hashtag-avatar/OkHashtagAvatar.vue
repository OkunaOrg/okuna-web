<template>
    <div>
        <ok-image-avatar v-if="hashtag.image" :avatar-url="hashtag.image" :avatar-size="this.avatarSize"
                         :image-fit="imageAvatarFit"
                         :avatar-border-radius="avatarBorderRadius">
        </ok-image-avatar>
        <ok-letter-avatar v-else letter="#" :text-color="hashtag.colorInvert"
                          :background-color="hashtag.color" :avatar-size="this.avatarSize"
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
    import OkLetterAvatar from "~/components/avatars/letter-avatar/OkLetterAvatar.vue";
    import { IHashtag } from "~/models/common/hashtag/IHashtag";
    import { OkImageFit } from "~/components/images/OkImageFit";

    @Component({
        name: "OkHashtagAvatar",
        components: {OkLetterAvatar, OkImageAvatar},
    })
    export default class extends Vue {
        @Prop(Object) readonly hashtag: IHashtag;
        @Prop(Number) readonly avatarSize: OkAvatarSize;
        @Prop(Number) readonly avatarBorderRadius: OkAvatarBorderRadius;

        imageAvatarFit = OkImageFit.covered;

        mounted() {

        }

    }
</script>
