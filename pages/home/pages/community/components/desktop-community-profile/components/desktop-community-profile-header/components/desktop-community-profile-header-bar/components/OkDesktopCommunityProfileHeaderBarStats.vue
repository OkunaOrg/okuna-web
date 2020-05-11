<template>
    <div class="columns ok-has-text-primary-invert">
        <div class="column">
            <div class="is-size-6 is-flex align-center">
                {{ $t('components.community_posts_count.posts')}}
            </div>
            <div class="is-size-5 has-text-weight-bold is-flex align-center">
                {{ humanFriendlyPostsCount }}
            </div>
        </div>
        <div class="column">
            <div class="is-size-6 is-flex align-center">
                {{ community.usersAdjective || $t('components.community_members_count.members') }}
            </div>
            <div class="is-size-5 has-text-weight-bold is-flex align-center">
                {{ humanFriendlyMembersCount }}
            </div>
        </div>
    </div>
</template>


<style lang="scss">

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";

    @Component({
        name: "OkDesktopCommunityProfileHeaderBarStats",
    })
    export default class OkDesktopCommunityProfileHeaderBarStats extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;


        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        get humanFriendlyMembersCount() {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(this.community.membersCount);
        }


        get humanFriendlyPostsCount() {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(this.community.postsCount);
        }

    }
</script>



