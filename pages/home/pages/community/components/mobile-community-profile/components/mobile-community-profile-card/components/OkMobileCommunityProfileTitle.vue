<template>
    <strong class="ok-has-text-primary-invert is-size-5-touch">{{community.title}}</strong>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";

    @Component({
        name: "OkMobileCommunityProfileTitle",
        components: {},
    })
    export default class OkMobileCommunityProfileTitle extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

    }
</script>



