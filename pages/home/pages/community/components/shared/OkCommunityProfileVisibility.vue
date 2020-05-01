<template>
    <div>
        <ok-public-community-icon class="ok-svg-icon-primary-invert-80" v-if="communityIsPublic"></ok-public-community-icon>
        <ok-private-community-icon class="ok-svg-icon-primary-invert-80" v-else></ok-private-community-icon>
        <span class="ok-has-text-primary-invert-80 is-size-6-touch">{{visibilityText}}</span>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkSmartText from "~/components/smart-text/OkSmartText.vue";
    import { ICommunity } from '~/models/communities/community/ICommunity';
    import { CommunityType } from '~/models/communities/community/lib/CommunityType';

    @Component({
        name: "OkCommunityProfileVisibility",
        components: {OkSmartText},
    })
    export default class OkCommunityProfileVisibility extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        get communityIsPublic() {
            return this.community.type === CommunityType.public;
        }


        get visibilityText() {
            return this.communityIsPublic
                ? this.$t("components.community_profile_visibility.public",) :
                this.$t("components.community_profile_visibility.private", );
        }

    }
</script>



