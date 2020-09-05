<template>
    <div class="ok-post-creator-content has-height-100-percent is-flex flex-direction-column">
        <ok-mobile-header>
            <template v-slot:leading>
                <div class="has-padding-10 has-cursor-pointer" @click="onWantsToGoToPreviousStep" role="button">
                    <ok-chevron-left-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-chevron-left-icon>
                </div>
            </template>
            <span class="ok-has-text-primary-invert has-text-weight-bold">
                    {{ $t('global.snippets.share_to_community')}}
                </span>
            <template v-slot:trailing>
                <div class="has-padding-10">
                    <button class="button is-success is-rounded ok-has-background-accent-gradient has-text-weight-bold is-small"
                            @click="onWantsToGoNext"
                            :disabled="!hasSelectedCommunity"
                    >
                        {{ $t("global.keywords.share") }}
                    </button>
                </div>
            </template>
        </ok-mobile-header>
        <div class="is-paddingless is-marginless is-flex-1 is-relative">
            <div class="ok-has-absolute-y-overflow has-padding-10">
                <ok-http-list
                        :searcher="searcher"
                        :refresher="communitiesRefresher"
                        :onScrollLoader="communitiesOnScrollLoader"
                        :show-no-more="false"
                >
                    <div slot-scope="props">
                        <div class="columns is-mobile has-cursor-pointer" @click="()=> onCommunityClicked(props.item)">
                            <div class="column">
                                <ok-community-tile
                                        :community="props.item">
                                </ok-community-tile>
                            </div>
                            <div class="column is-narrow is-flex align-items-center justify-center">
                                <ok-checkbox :checked="communityIsSelected(props.item)"/>
                            </div>
                        </div>
                    </div>
                </ok-http-list>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkMobileHeader from "~/components/mobile-only/OkMobileHeader.vue";
    import OkHttpList from "~/components/http-list/OkHttpList.vue";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import OkCheckbox from "~/components/input/OkCheckbox.vue";
    import { OkPostStudioData } from "~/components/post-studio/lib/OkPostCreatorTypes";
    import OkCommunityTile from "~/components/tiles/OkCommunityTile.vue";
    import { ICommunity } from '~/models/communities/community/ICommunity';

    @Component({
        name: "OkPostStudioCommunityStep",
        components: {
            OkCommunityTile,
            OkCheckbox,
            OkHttpList,
            OkMobileHeader,
        },
    })
    export default class OkPostStudioCommunityStep extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly data: OkPostStudioData;

        selectedCommunity: ICommunity = null;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        onWantsToGoToPreviousStep() {
            this.$emit("onWantsToGoToPreviousStep", this.postStudioData);
        }

        onWantsToGoNext() {
            this.$emit("onWantsToGoToNextStep", this.postStudioData);
        }

        get postStudioData() {
            return {
                community: this.selectedCommunity,
                ...this.data,
            };
        }


        async communitiesRefresher(): Promise<ICommunity[]> {
            return this.userService.getJoinedCommunities();
        }


        async communitiesOnScrollLoader(communities: ICommunity[]): Promise<ICommunity[]> {
            return this.userService.getJoinedCommunities({
                offset: communities.length
            });
        }

        async searcher(query: string) {
            return this.userService.searchJoinedCommunities({
                query
            });
        }

        onCommunityClicked(community: ICommunity) {
            if (this.selectedCommunity?.id === community.id) {
                // Remove
                this.selectedCommunity = null;
            } else {
                // Add
                this.selectedCommunity = community;
            }
        }

        communityIsSelected(community: ICommunity) {
            return this.selectedCommunity?.id === community.id;
        }


        get hasSelectedCommunity() {
            return !!this.selectedCommunity;
        }
    }
</script>
