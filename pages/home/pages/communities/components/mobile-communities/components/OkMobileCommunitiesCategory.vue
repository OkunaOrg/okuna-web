<template>
    <ok-http-list
            :refresher="communityCategoryRefresher"
            ref="okHttpList"
            list-type="community-mobile"
            :item-class="'has-padding-bottom-10'">
        <nuxt-link slot-scope="props" :to="'/c/' + props.item.name">
            <ok-community-tile :community="props.item"></ok-community-tile>
        </nuxt-link>
    </ok-http-list>
</template>


<style scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import OkCategoryPreviewButton from "~/components/buttons/OkCategoryPreviewButton.vue";
    import OkFatButton from "~/components/buttons/OkFatButton.vue";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import OkHttpList from "~/components/http-list/OkHttpList.vue";
    import { ICommunity } from '~/models/communities/community/ICommunity';
    import { ICategory } from '~/models/common/category/ICategory';
    import OkCommunityTile from '~/components/tiles/OkCommunityTile.vue';

    @Component({
        name:'OkMobileCommunitiesCategory',
        components: {OkCommunityTile, OkHttpList, OkUserAvatar, OkFatButton, OkCategoryPreviewButton},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser,
            }
        }
    })
    export default class OkMobileCommunitiesCategory extends Vue {


        @Prop({
            type: Object,
            required: true
        }) readonly category: ICategory;

        $refs: {
            okHttpList: OkHttpList<ICommunity>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);


        communityCategoryRefresher(): Promise<ICommunity[]> {
            return this.userService.getTrendingCommunities({
                category: this.category
            });
        }

        ensureWasBootstrapped(){
            this.$refs.okHttpList.ensureWasBootstrapped();
        }
    }
</script>
