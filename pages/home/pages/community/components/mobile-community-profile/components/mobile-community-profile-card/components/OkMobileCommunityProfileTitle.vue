<template>
    <strong class="ok-has-text-primary-invert is-size-5-touch" v-line-clamp:20="lineClamp">{{community.title}}</strong>
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

        @Prop({
            type: Number,
            required: false
        }) readonly lineClamp: number;



    }
</script>



