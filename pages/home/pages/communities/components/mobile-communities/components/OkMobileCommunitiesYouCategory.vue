<template>
  <div>
      <div>
          <h2 class="title ok-has-text-primary-invert">
              {{$t('pages.home.communities.favorites.title')}}
          </h2>
          <ok-http-list
                  :refresher="favoriteCommunitiesRefresher" ref="okHttpList" :limit="4" :show-no-more="false"
                  :item-class="'has-padding-bottom-10'">
              <nuxt-link slot-scope="props" :to="'/c/' + props.item.name">
                  <ok-community-tile :community="props.item"></ok-community-tile>
              </nuxt-link>
          </ok-http-list>
          <nuxt-link :to="'c/favorites'">
              <span class="is-size-6 ok-has-text-primary-invert-60">
                {{$t('pages.home.communities.favorites.see_all_communities')}}
              </span>
              <ok-chevron-right-icon></ok-chevron-right-icon>
          </nuxt-link>
      </div>
      <div class="has-padding-top-20">
          <h2 class="title ok-has-text-primary-invert">
              {{$t('pages.home.communities.administrated.title')}}
          </h2>
          <ok-http-list
                  :refresher="administratedCommunitiesRefresher" ref="okHttpList" :limit="4" :show-no-more="false"
                  :item-class="'has-padding-bottom-10'">
              <nuxt-link slot-scope="props" :to="'/c/' + props.item.name">
                  <ok-community-tile :community="props.item"></ok-community-tile>
              </nuxt-link>
          </ok-http-list>
          <nuxt-link :to="'c/administrated'">
              <span class="is-size-6 ok-has-text-primary-invert-60">
                {{$t('pages.home.communities.administrated.see_all_communities')}}
              </span>
              <ok-chevron-right-icon></ok-chevron-right-icon>
          </nuxt-link>
      </div>
      <div class="has-padding-top-20">
          <h2 class="title ok-has-text-primary-invert">
              {{$t('pages.home.communities.moderated.title')}}
          </h2>
          <ok-http-list
                  :refresher="moderatedCommunitiesRefresher" ref="okHttpList" :limit="4" :show-no-more="false"
                  :item-class="'has-padding-bottom-10'">
              <nuxt-link slot-scope="props" :to="'/c/' + props.item.name">
                  <ok-community-tile :community="props.item"></ok-community-tile>
              </nuxt-link>
          </ok-http-list>
          <nuxt-link :to="'c/moderated'">
              <span class="is-size-6 ok-has-text-primary-invert-60">
                {{$t('pages.home.communities.moderated.see_all_communities')}}
              </span>
              <ok-chevron-right-icon></ok-chevron-right-icon>
          </nuxt-link>
      </div>
      <div class="has-padding-top-20">
          <h2 class="title ok-has-text-primary-invert">
              {{$t('pages.home.communities.joined.title')}}
          </h2>
          <ok-http-list
                  :refresher="joinedCommunitiesRefresher" ref="okHttpList" :limit="4" :show-no-more="false"
                  :item-class="'has-padding-bottom-10'">
              <nuxt-link slot-scope="props" :to="'/c/' + props.item.name">
                  <ok-community-tile :community="props.item"></ok-community-tile>
              </nuxt-link>
          </ok-http-list>
          <nuxt-link :to="'c/joined'">
              <span class="is-size-6 ok-has-text-primary-invert-60">
                {{$t('pages.home.communities.joined.see_all_communities')}}
              </span>
              <ok-chevron-right-icon></ok-chevron-right-icon>
          </nuxt-link>
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
    import { ICommunity } from '~/models/communities/community/ICommunity';
    import OkCommunityTile from '~/components/tiles/OkCommunityTile.vue';

    @Component({
        name:'OkMobileCommunitiesYouCategory',
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


        favoriteCommunitiesRefresher(): Promise<ICommunity[]> {
            return this.userService.getFavoriteCommunities();
        }

        administratedCommunitiesRefresher(): Promise<ICommunity[]> {
            return this.userService.getAdministratedCommunities();
        }

        moderatedCommunitiesRefresher(): Promise<ICommunity[]> {
            return this.userService.getModeratedCommunities();
        }

        joinedCommunitiesRefresher(): Promise<ICommunity[]> {
            return this.userService.getJoinedCommunities();
        }


    }
</script>



