<template>
    <div v-if="this.finalAvatarUrl">
        <figure class="image is-16x16"
                v-if="this.avatarSize === this.OkAvatarSize.extraSmall">
            <img :src="this.finalAvatarUrl" alt="avatar" :class="borderRadiusClass">
        </figure>
        <figure class="image is-24x24"
                v-else-if="this.avatarSize === this.OkAvatarSize.small">
            <img :src="this.finalAvatarUrl" alt="avatar" :class="borderRadiusClass">
        </figure>
        <figure class="image is-32x32"
                v-else-if="this.avatarSize === this.OkAvatarSize.medium">
            <img :src="this.finalAvatarUrl" alt="avatar" :class="borderRadiusClass">
        </figure>
        <figure class="image is-128x128"
                v-else-if="this.avatarSize === this.OkAvatarSize.large">
            <img :src="this.finalAvatarUrl" alt="avatar" :class="borderRadiusClass">
        </figure>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { OkAvatarBorderRadius } from "~/components/avatars/lib/OkAvatarBorderRadius";

    @Component({
        name: "OkImageAvatar",
    })
    export default class extends Vue {
        @Prop(String) readonly avatarUrl: string;
        @Prop(Object) readonly avatarFile: File;

        @Prop({
            type: Number,
            default: OkAvatarSize.medium
        }) readonly avatarSize: OkAvatarSize;

        @Prop({
            type: Number,
            default: OkAvatarBorderRadius.rounded
        }) readonly avatarBorderRadius: OkAvatarBorderRadius;

        readonly OkAvatarSize = OkAvatarSize;

        get finalAvatarUrl() {
            if (this.avatarFile) return URL.createObjectURL(this.avatarFile);
            return this.avatarUrl;
        }

        get borderRadiusClass() {
            return this.avatarBorderRadius === OkAvatarBorderRadius.rounded ? "is-semi-rounded" : "is-rounded";
        }


    }
</script>
