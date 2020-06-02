<template>
    <div>
        <div class="content">
            <span>
                {{ communitiesCateogry }}
            </span>
        </div>
        <ok-http-list :refresher="communityCategoryRefresher" :on-scroll-loader="communityCategoryOnScrollLoader">
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
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUserService } from "~/services/user/IUserService";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { ICategory } from "~/model/common/category/ICategory";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IUser } from "~/model/auth/user/IUser";
    import OkCategoryPreviewButton from "~/components/buttons/OkCategoryPreviewButton.vue";
    import OkFatButton from "~/components/buttons/OkFatButton.vue";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { OkThemeColorType } from "~/services/theme/ThemeService";
    import Color from "color";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import OkHttpList from "~/components/http-list/OkHttpList.vue";
    import { ICommunity } from '~/models/communities/community/ICommunity';

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

        communitiesCategories: ICategory[] = [];

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>,
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;


        requestInProgress = false;


        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUser);
        }


        communityCategoryRefresher(): Promise<ICommunity[]> {
            return this.userService.getTrendingCommunities({
                community: this.community,
                appendAuthorizationTokenIfExists: true,
            });
        }

        communityCategoryOnScrollLoader(posts: ICommunity[]) {
            const lastPost = posts[posts.length - 1];
            const lastPostId = lastPost.id;


            return this.userService.getCommunityPosts({
                community: this.community,
                maxId: lastPostId,
                count: OkCommunityPostsStream.infiniteScrollChunkPostsCount,
                appendAuthorizationTokenIfExists: true,
            })
        }
    }
</script>



