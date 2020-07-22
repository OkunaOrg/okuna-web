<template>
    <div class="has-text-centered has-padding-20 ok-has-text-primary-invert" @suggestedCommunities.prevent="onSuggestedCommunities">
        <div>
            <div class="content">
                <h4>
                    {{ $t('global.snippets.get_started_with_communities') }}
                </h4>
            </div>
        </div>
        <div>
            <ok-http-list
                    :showNoMore="false"
                    :refresher="suggestedCommunitiesRefresher"
            >
                <div slot-scope="props" class="has-padding-bottom-20">
                    <div class="is-flex">
                        <ok-community-tile :community="props.item" class="is-flex-1">
                            <template v-slot:trailing>
                                <ok-join-community-button :community="props.item"/>
                            </template>
                        </ok-community-tile>
                    </div>
                </div>
            </ok-http-list>
            <ok-buttons-navigation
                    :onNext="onNext"
                    :nextText="$t('global.keywords.done')"
                    class="has-padding-top-20"/>
        </div>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkButtonsNavigation from "~/components/navigation/OkButtonsNavigation.vue";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import OkHttpList from '~/components/http-list/OkHttpList.vue';
    import { ICommunity } from '~/models/communities/community/ICommunity';
    import OkCommunityTile from '~/components/tiles/OkCommunityTile.vue';
    import OkJoinCommunityButton from '~/components/buttons/OkJoinCommunityButton.vue';

    @Component({
        name: "OkRegisterUserSuggestedCommunities",
        components: {OkJoinCommunityButton, OkCommunityTile, OkHttpList, OkButtonsNavigation}
    })
    export default class OkRegisterUserSuggestedCommunities extends Vue {

        @Prop({
            type: Function,
            required: true,
        }) readonly onNext: () => Promise<void> | void;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        suggestedCommunitiesRefresher(): Promise<ICommunity[]> {
            return this.userService.getSuggestedCommunities({
                appendAuthorizationTokenIfExists: true,
            });
        }


    }
</script>

