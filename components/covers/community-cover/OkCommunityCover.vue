<template>
    <ok-image-cover
            :cover-url="community.cover"
            :cover-size="coverSize">
    </ok-image-cover>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkCoverSize } from "~/components/covers/lib/OkCoverSize";
    import OkImageCover from "~/components/covers/image-cover/OkImageCover.vue";
    import { ICommunity } from "~/models/communities/community/ICommunity";

    @Component({
        name: "OkCommunityCover",
        components: {OkImageCover},
    })
    export default class extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        @Prop({
            type: Number,
            default: OkCoverSize.medium
        }) readonly coverSize: OkCoverSize;

    }
</script>
