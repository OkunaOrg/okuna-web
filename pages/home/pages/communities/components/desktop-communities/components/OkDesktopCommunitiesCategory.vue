<template>
    <ok-http-list
            :refresher="communityCategoryRefresher"
            ref="okHttpList"
            list-type="community"
            :items-container-class="'columns is-multiline'" :item-class="'column is-4-touch is-3-desktop'">
        <nuxt-link slot-scope="props" :to="'/c/' + props.item.name">
            <ok-community-card :community="props.item"></ok-community-card>
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
    import OkCommunityCard from '~/components/cards/community-card/OkCommunityCard.vue';

    @Component({
        name:'OkDesktopCommunitiesCategory',
        components: {OkCommunityCard, OkHttpList, OkUserAvatar, OkFatButton, OkCategoryPreviewButton},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser,
            }
        }
    })
    export default class OkDesktopCommunitiesCategory extends Vue {


        @Prop({
            type: Object,
            // If none given, fetches all
            required: false
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
