<template>
    <strong class="ok-has-text-primary-invert is-size-7-touch">{{community.title}}</strong>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";

    @Component({
        name: "OkCommunityProfileTitle",
        components: {},
    })
    export default class OkCommunityProfileTitle extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

    }
</script>



