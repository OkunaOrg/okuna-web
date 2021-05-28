<template>
    <div>
        <ok-public-community-icon class="ok-svg-icon-primary-invert-80" v-if="!communityIsClosed"></ok-public-community-icon>
        <ok-private-community-icon class="ok-svg-icon-primary-invert-80" v-else></ok-private-community-icon>
        <span class="ok-has-text-primary-invert-80 is-size-6-touch">{{visibilityText}}</span>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkSmartText from "~/components/smart-text/OkSmartText.vue";
    import { ICommunity } from '~/models/communities/community/ICommunity';

    @Component({
        name: "OkCommunityProfileVisibility",
        components: {OkSmartText},
    })
    export default class OkCommunityProfileVisibility extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        get communityIsClosed() {
            return this.community.closed
        }


        get visibilityText() {
            return this.communityIsClosed
                ? this.$t("global.closed_comunity") :
                this.$t("global.open_comunity");
        }

    }
</script>



