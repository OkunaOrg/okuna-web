<template>
    <div>
        <div>
            <h2 class="title ok-has-text-primary-invert">
                {{$t('pages.home.communities.favorites.title')}}
            </h2>
            <ok-http-list
                    :refresher="favoriteCommunitiesRefresher"
                    ref="okHttpList"
                    list-type="community-mobile"
                    :limit="4"
                    :show-no-more="false"
                    :item-class="'has-padding-bottom-10'">
                <nuxt-link slot-scope="props" :to="'/c/' + props.item.name">
                    <ok-community-tile :community="props.item"></ok-community-tile>
                </nuxt-link>
            </ok-http-list>
            <div role="button" @click="openFavoriteCommunitiesModal()">
              <span class="is-size-6 ok-has-text-primary-invert-60 has-cursor-pointer" role="button">
                {{$t('pages.home.communities.favorites.see_all_communities')}}
              </span>
                <ok-chevron-right-icon></ok-chevron-right-icon>
            </div>
        </div>
        <div class="has-padding-top-20">
            <h2 class="title ok-has-text-primary-invert">
                {{$t('pages.home.communities.administrated.title')}}
            </h2>
            <ok-http-list
                    :refresher="administratedCommunitiesRefresher"
                    ref="okHttpList"
                    list-type="community-mobile"
                    :limit="4"
                    :show-no-more="false"
                    :item-class="'has-padding-bottom-10'">
                <nuxt-link slot-scope="props" :to="'/c/' + props.item.name">
                    <ok-community-tile :community="props.item"></ok-community-tile>
                </nuxt-link>
            </ok-http-list>
            <div role="button" @click="openAdministratedCommunitiesModal()">
              <span class="is-size-6 ok-has-text-primary-invert-60 has-cursor-pointer" role="button">
                {{$t('pages.home.communities.administrated.see_all_communities')}}
              </span>
                <ok-chevron-right-icon></ok-chevron-right-icon>
            </div>
        </div>
        <div class="has-padding-top-20">
            <h2 class="title ok-has-text-primary-invert">
                {{$t('pages.home.communities.moderated.title')}}
            </h2>
            <ok-http-list
                    :refresher="moderatedCommunitiesRefresher"
                    ref="okHttpList"
                    list-type="community-mobile"
                    :limit="4"
                    :show-no-more="false"
                    :item-class="'has-padding-bottom-10'">
                <nuxt-link slot-scope="props" :to="'/c/' + props.item.name">
                    <ok-community-tile :community="props.item"></ok-community-tile>
                </nuxt-link>
            </ok-http-list>
            <div role="button" @click="openModeratedCommunitiesModal()">
              <span class="is-size-6 ok-has-text-primary-invert-60 has-cursor-pointer" role="button">
                {{$t('pages.home.communities.moderated.see_all_communities')}}
              </span>
                <ok-chevron-right-icon></ok-chevron-right-icon>
            </div>
        </div>
        <div class="has-padding-top-20">
            <h2 class="title ok-has-text-primary-invert">
                {{$t('pages.home.communities.joined.title')}}
            </h2>
            <ok-http-list
                    :refresher="joinedCommunitiesRefresher"
                    ref="okHttpList"
                    list-type="community-mobile"
                    :limit="4"
                    :show-no-more="false"
                    :item-class="'has-padding-bottom-10'">
                <nuxt-link slot-scope="props" :to="'/c/' + props.item.name">
                    <ok-community-tile :community="props.item"></ok-community-tile>
                </nuxt-link>
            </ok-http-list>
            <div role="button" @click="openJoinedCommunitiesModal()">
              <span class="is-size-6 ok-has-text-primary-invert-60 has-cursor-pointer" role="button">
                {{$t('pages.home.communities.joined.see_all_communities')}}
              </span>
                <ok-chevron-right-icon></ok-chevron-right-icon>
            </div>
        </div>
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
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkCommunityTile from "~/components/tiles/OkCommunityTile.vue";
    import { IModalService } from "~/services/modal/IModalService";

    @Component({
        name: "OkMobileCommunitiesYouCategory",
        components: {OkCommunityTile, OkHttpList, OkUserAvatar, OkFatButton, OkCategoryPreviewButton},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser,
            }
        }
    })
    export default class OkMobileCommunitiesYouCategory extends Vue {

        $refs: {
            okHttpList: OkHttpList<ICommunity>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);


        openFavoriteCommunitiesModal() {
            this.modalService.openCommunitiesList({
                    title: this.$t("pages.home.communities.favorites.title") as string,
                    onScrollLoader: this.favoriteCommunitiesOnScrollLoader,
                    refresher: this.favoriteCommunitiesRefresher,
                }
            )
        }

        favoriteCommunitiesRefresher(): Promise<ICommunity[]> {
            return this.userService.getFavoriteCommunities();
        }

        favoriteCommunitiesOnScrollLoader(items: ICommunity[]): Promise<ICommunity[]> {
            return this.userService.getFavoriteCommunities({
                offset: items.length
            });
        }

        openAdministratedCommunitiesModal() {
            this.modalService.openCommunitiesList({
                    title: this.$t("pages.home.communities.administrated.title") as string,
                    onScrollLoader: this.administratedCommunitiesOnScrollLoader,
                    refresher: this.administratedCommunitiesRefresher,
                }
            )
        }

        administratedCommunitiesRefresher(): Promise<ICommunity[]> {
            return this.userService.getAdministratedCommunities();
        }

        administratedCommunitiesOnScrollLoader(items: ICommunity[]): Promise<ICommunity[]> {
            return this.userService.getAdministratedCommunities({
                offset: items.length
            });
        }

        openModeratedCommunitiesModal() {
            this.modalService.openCommunitiesList({
                    title: this.$t("pages.home.communities.moderated.title") as string,
                    onScrollLoader: this.moderatedCommunitiesOnScrollLoader,
                    refresher: this.moderatedCommunitiesRefresher,
                }
            )
        }

        moderatedCommunitiesRefresher(): Promise<ICommunity[]> {
            return this.userService.getModeratedCommunities();
        }

        moderatedCommunitiesOnScrollLoader(items: ICommunity[]): Promise<ICommunity[]> {
            return this.userService.getModeratedCommunities({
                offset: items.length
            });
        }

        openJoinedCommunitiesModal() {
            this.modalService.openCommunitiesList({
                    title: this.$t("pages.home.communities.joined.title") as string,
                    onScrollLoader: this.joinedCommunitiesOnScrollLoader,
                    refresher: this.joinedCommunitiesRefresher,
                }
            )
        }

        joinedCommunitiesRefresher(): Promise<ICommunity[]> {
            return this.userService.getJoinedCommunities();
        }

        joinedCommunitiesOnScrollLoader(items: ICommunity[]): Promise<ICommunity[]> {
            return this.userService.getJoinedCommunities({
                offset: items.length
            });
        }


    }
</script>
