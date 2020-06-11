<template>
    <section class="section">
        <div class="container" v-if="loggedInUser">
            <b-tabs
                    @change="onTabChanged"
                    v-model="activeTab"
                    :multiline="environmentResolution === EnvironmentResolution.desktop"
            >
                <b-tab-item label="You">
                    <template slot="header">
                        <div class="has-padding-right-10 has-padding-bottom-10">
                            <ok-fat-button
                                    :text-background-theme-color-type="OkThemeColorType.accentGradient"
                                    :text-color="youButtonTextColor"
                                    :text="$t('global.keywords.you')">
                                <template slot="content">
                                    <div class="is-flex justify-center align-items-center has-height-100-percent">
                                        <ok-user-avatar :user="loggedInUser"></ok-user-avatar>
                                    </div>
                                </template>
                            </ok-fat-button>
                        </div>
                    </template>
                    <ok-desktop-communities-you-category></ok-desktop-communities-you-category>
                </b-tab-item>
                <b-tab-item label="All">
                    <template slot="header">
                        <div class="has-padding-right-10 has-padding-bottom-10">
                            <ok-fat-button
                                    :backgroundImageSrc="allButtonBackgroundImage"
                                    :text-color="youButtonTextColor"
                                    :text-background-color="allButtonTextColor"
                                    :text="$t('global.keywords.all')">
                            </ok-fat-button>
                        </div>
                    </template>
                    <ok-desktop-communities-category
                            ref="okDesktopCommunitiesCategory_0"></ok-desktop-communities-category>
                </b-tab-item>
                <template v-for="(communityCategory, index) in communitiesCategories">
                    <b-tab-item
                            :key="index"
                            :label="communityCategory.title">
                        <template slot="header">
                            <div class="has-padding-right-10 has-padding-bottom-10">
                                <ok-category-preview-button :category="communityCategory"></ok-category-preview-button>
                            </div>
                        </template>
                        <h2 class="title ok-has-text-primary-invert">
                            {{ communityCategory.title }}
                        </h2>
                        <ok-desktop-communities-category :ref="'okDesktopCommunitiesCategory_' + (index + 1)"
                                                         :category="communityCategory"></ok-desktop-communities-category>
                    </b-tab-item>
                </template>
            </b-tabs>
        </div>
    </section>
</template>


<style scoped>

</style>

<script lang="ts">
    import { Component, Vue, Watch } from "nuxt-property-decorator"
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUserService } from "~/services/user/IUserService";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import OkCategoryPreviewButton from "~/components/buttons/OkCategoryPreviewButton.vue";
    import OkFatButton from "~/components/buttons/OkFatButton.vue";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { OkThemeColorType } from "~/services/theme/ThemeService";
    import Color from "color";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { ICategory } from "~/models/common/category/ICategory";
    import { IUser } from "~/models/auth/user/IUser";
    import OkDesktopCommunitiesCategory
        from "~/pages/home/pages/communities/components/desktop-communities/components/OkDesktopCommunitiesCategory.vue";
    import OkDesktopCommunitiesYouCategory
        from "~/pages/home/pages/communities/components/desktop-communities/components/OkDesktopCommunitiesYouCategory.vue";

    @Component({
        components: {
            OkDesktopCommunitiesYouCategory,
            OkDesktopCommunitiesCategory, OkUserAvatar, OkFatButton, OkCategoryPreviewButton
        },
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser,
                environmentResolution: this["environmentService"].environmentResolution
            }
        }
    })
    export default class OkDesktopCommunitiesPage extends Vue {


        communitiesCategories: ICategory[] = [];

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>,
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;


        requestInProgress = false;
        OkThemeColorType = OkThemeColorType;
        Color = Color;

        activeTab = 0;

        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private requestOperation?: CancelableOperation<any>;

        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUser);
        }

        get youButtonTextColor() {
            return Color("white");
        }

        get allButtonTextColor() {
            return Color("#2d2d2d");
        }

        get allButtonBackgroundImage() {
            return require("./../../assets/category_all.png");
        }

        onTabChanged(newActiveTab: number) {
            // First tab is the You tab
            if (newActiveTab === 0) return;

            let categoryElement = this.$refs[`okDesktopCommunitiesCategory_${newActiveTab - 1}`];
            if (categoryElement[0]) categoryElement = categoryElement[0];

            this.$nextTick(() => {
                categoryElement['ensureWasBootstrapped']();
            });
        }

        private onLoggedInUser(user: IUser) {
            if (typeof user === "undefined") return;
            this.refreshCategories();
        }


        private async refreshCategories() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;


            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.getCategories());

                this.communitiesCategories = await this.requestOperation.value;
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }
    }
</script>



