<template>
    <ok-mobile-header
            class="is-flex justify-center align-items-center"
            :background-color="community.color"
            :text-color="community.colorInvert"
    >
        <span class="has-text-weight-bold">c/{{community.name}}</span>
    </ok-mobile-header>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkMobileHeader from '~/components/mobile-only/OkMobileHeader.vue';

    @Component({
        name: "OkMobileCommunityProfileHeader",
        components: {OkMobileHeader},
    })
    export default class OkMobileCommunityProfileHeader extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

    }
</script>



