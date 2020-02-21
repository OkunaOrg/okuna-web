<template>
    <div v-if="this.finalAvatarUrl">
        <figure class="image is-16x16 is-semi-rounded" v-if="this.avatarSize === this.OkAvatarSize.extraSmall">
            <img :src="this.finalAvatarUrl" alt="avatar">
        </figure>
        <figure class="image is-24x24 is-semi-rounded" v-else-if="this.avatarSize === this.OkAvatarSize.small">
            <img :src="this.finalAvatarUrl" alt="avatar">
        </figure>
        <figure class="image is-32x32 is-semi-rounded" v-else-if="this.avatarSize === this.OkAvatarSize.medium">
            <img :src="this.finalAvatarUrl" alt="avatar">
        </figure>
        <figure class="image is-128x128 is-semi-rounded" v-else-if="this.avatarSize === this.OkAvatarSize.large">
            <img :src="this.finalAvatarUrl" alt="avatar">
        </figure>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkAvatarSize } from "~/components/avatars/lib/AvatarSize";

    @Component({
        name: "OkImageAvatar",
    })
    export default class extends Vue {
        @Prop(String) readonly avatarUrl: string;
        @Prop(Object) readonly avatarFile: File;
        @Prop(Number) readonly avatarSize: OkAvatarSize;

        readonly OkAvatarSize = OkAvatarSize;

        get finalAvatarUrl () {
            if(this.avatarFile) return URL.createObjectURL(this.avatarFile);
            return this.avatarUrl;
        }


    }
</script>
