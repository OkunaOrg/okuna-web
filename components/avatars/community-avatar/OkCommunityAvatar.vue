<template>
    <div>

    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { ICommunity } from '~/models/communities/community/ICommunity';

    @Component({
        name: "OkCommunityAvatar",
    })
    export default class extends Vue {
        @Prop(Object) readonly community: ICommunity;
        @Prop(Number) readonly avatarSize: OkAvatarSize;


        mounted() {
        }

    }
</script>
