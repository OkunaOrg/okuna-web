<template>
    <ok-mobile-header class="is-flex justify-center align-items-center">
        <div>
            <b-skeleton width="80px"></b-skeleton>
        </div>
    </ok-mobile-header>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import OkMobileHeader from '~/components/mobile-only/OkMobileHeader.vue';

    @Component({
        name: "OkMobileCommunityProfilePageSkeletonHeader",
        components: {OkMobileHeader}
    })
    export default class OkMobileCommunityProfilePageSkeletonHeader extends Vue {}
</script>
