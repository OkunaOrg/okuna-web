<template>
    <div>
        <div class="content">
            <span>
                {{ communityCategory.name }}
            </span>
        </div>
        <ok-http-list :refresher="communityCategoryRefresher">
            <div slot-scope="props">
                {{props.item}}
            </div>
        </ok-http-list>
    </div>
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

    @Component({
        components: {OkHttpList, OkUserAvatar, OkFatButton, OkCategoryPreviewButton},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser,
                environmentResolution: this["environmentService"].environmentResolution
            }
        }
    })
    export default class OkDesktopCommunitiesYouCategory extends Vue {


        @Prop({
            type: Object,
            required: true
        }) readonly communityCategory: ICategory;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);


        communityCategoryRefresher(): Promise<ICommunity[]> {
            return this.userService.getTrendingCommunities({
                category: this.communityCategory
            });
        }
    }
</script>



