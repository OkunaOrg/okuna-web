<template>
    <div>
        <ok-image-cover :cover-url="user.profile.cover" :cover-size="OkCoverSize.large">
        </ok-image-cover>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkCoverSize } from "~/components/covers/lib/OkCoverSize";
    import { IUser } from "~/models/auth/user/IUser";
    import OkImageCover from "~/components/covers/image-cover/OkImageCover.vue";

    @Component({
        name: "OkUserCover",
        components: {OkImageCover},
    })
    export default class extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        OkCoverSize = OkCoverSize;


        mounted() {
        }

    }
</script>
