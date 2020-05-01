<template>
    <span class="ok-has-text-primary-invert-80 is-size-6-touch is-size-5">
        <strong class="ok-has-text-primary-invert-80">
            {{humanFriendlyPostsCount}}
        </strong>
        {{$t('components.community_posts_count.posts')}}
    </span>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { okunaContainer } from "~/services/inversify";

    @Component({
        name: "OkMobileCommunityProfilePostsCount",
    })
    export default class OkMobileCommunityProfilePostsCount extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;


        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        get humanFriendlyPostsCount() {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(this.community.postsCount);
        }

    }
</script>



