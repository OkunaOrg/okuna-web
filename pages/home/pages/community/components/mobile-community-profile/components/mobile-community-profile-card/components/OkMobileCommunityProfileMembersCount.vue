<template>
    <span class="ok-has-text-primary-invert-80 is-size-6-touch is-size-6" v-line-clamp:20="1">
        <strong class="ok-has-text-primary-invert-80">
            {{humanFriendlyMembersCount}}
        </strong>
        {{ community.usersAdjective || $t('components.community_members_count.members')}}
    </span>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { okunaContainer } from "~/services/inversify";

    @Component({
        name: "OkMobileCommunityProfileMembersCount",
    })
    export default class OkMobileCommunityProfileMembersCount extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;


        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        get humanFriendlyMembersCount() {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(this.community.membersCount);
        }

    }
</script>



