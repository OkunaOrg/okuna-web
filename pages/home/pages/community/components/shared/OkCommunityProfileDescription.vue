<template>
    <ok-smart-text :text="community.description" class="is-size-7-touch ok-has-text-primary-invert"></ok-smart-text>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkSmartText from '~/components/smart-text/OkSmartText.vue';
    import { ICommunity } from '~/models/communities/community/ICommunity';

    @Component({
        name: "OkCommunityProfileDescription",
        components: {OkSmartText},
    })
    export default class OkCommunityProfileDescription extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

    }
</script>



