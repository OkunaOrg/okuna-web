<template>
    <section class="ok-search">
        <b-tabs v-model="searchTabIndex" position="is-centered" expanded>
            <b-tab-item>
                <template slot="header">
                    <span class="ok-has-text-primary-invert">
                            {{$t('global.keywords.users')}}
                        </span>
                </template>
                <ok-http-list :searcher="usersSearcher" ref="usersList" :show-search-bar="false"
                              @onListItemClicked="onListItemClicked">
                    <nuxt-link slot-scope="props" :to="'/' + props.item.username">
                        <div class="has-padding-bottom-5">
                            <ok-user-tile :user="props.item"></ok-user-tile>
                        </div>
                    </nuxt-link>
                </ok-http-list>
            </b-tab-item>
            <b-tab-item>
                <template slot="header">
                    <span class="ok-has-text-primary-invert">
                            {{$t('global.keywords.communities')}}
                        </span>
                </template>
                <ok-http-list :searcher="communitiesSearcher" ref="communitiesList" :show-search-bar="false"
                              @onListItemClicked="onListItemClicked"
                              class="has-padding-10">
                    <nuxt-link slot-scope="props" :to="'/c/' + props.item.name">
                        <div class="has-padding-bottom-10">
                            <ok-community-tile :community="props.item"></ok-community-tile>
                        </div>
                    </nuxt-link>
                </ok-http-list>
            </b-tab-item>
            <b-tab-item>
                <template slot="header">
                    <div class="has-padding-10">
                        <span class="ok-has-text-primary-invert">
                            {{$t('global.keywords.hashtags')}}
                        </span>
                    </div>
                </template>
                <ok-http-list :searcher="hashtagsSearcher" ref="hashtagsList" :show-search-bar="false"
                              @onListItemClicked="onListItemClicked">
                    <nuxt-link slot-scope="props" :to="'/h/' + props.item.name">
                        <div class="has-padding-bottom-5">
                            <ok-hashtag-tile :hashtag="props.item"></ok-hashtag-tile>
                        </div>
                    </nuxt-link>
                </ok-http-list>
            </b-tab-item>
        </b-tabs>
    </section>
</template>


<style lang="scss">
    .ok-search {

        .tab-content {
            padding: 0 !important;
        }

        .tabs {
            .is-active {
                background-color: var(--primary-highlight-color) !important;
            }

            li {
                height: 100%;

                a {
                    min-height: 100%;
                }

            }
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import OkHttpList from "~/components/http-list/OkHttpList.vue";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUser } from "~/models/auth/user/IUser";
    import { IHashtag } from "~/models/common/hashtag/IHashtag";
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import { ILoggingService } from "~/services/logging/ILoggingService";
    import { IOkLogger } from "~/services/logging/types";
    import OkCommunityTile from "~/components/tiles/OkCommunityTile.vue";
    import OkUserTile from "~/components/tiles/OkUserTile.vue";
    import OkHashtagTile from "~/components/tiles/OkHashtagTile.vue";

    @Component({
        name: "OkSearch",
        components: {OkHashtagTile, OkUserTile, OkCommunityTile, OkHttpList},
    })
    export default class OkSearch extends Vue {
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private logger: IOkLogger;

        @Prop({
            type: String,
            default: true,
        }) readonly initialSearchQuery: string;

        $refs: {
            usersList: OkHttpList<IUser>,
            hashtagsList: OkHttpList<IHashtag>,
            communitiesList: OkHttpList<ICommunity>,
        };

        searchTabIndex = 0;
        shortCuts = ['@','c/','#'];

        created() {
            this.logger = this.loggingService.getLogger({
                name: "OkSearch"
            });

            if (this.initialSearchQuery) this.searchWithQuery(this.initialSearchQuery);
        }


        async searchWithQuery(query: string) {
            this.logger.info(`Searching with query: ${query}`);
            query = query.trim();

            query = this.handleShortCutSearch(query);
            if(!query){
                return;
            }

            const searchPromises: Promise<void>[] = [
                this.$refs.usersList.searchWithQuery(query),
                this.$refs.communitiesList.searchWithQuery(query),
                this.$refs.hashtagsList.searchWithQuery(query),
            ];

            return Promise.all(searchPromises)
        }

        clearSearch() {
            this.$refs.usersList.clearSearch();
            this.$refs.communitiesList.clearSearch();
            this.$refs.hashtagsList.clearSearch();
        }

        handleShortCutSearch(query: string): string {
            if (query.startsWith(this.shortCuts[0])) {
                this.searchTabIndex = 0;
                query = query.replace(this.shortCuts[0],'');
            } else if(query.startsWith(this.shortCuts[1])) {
                this.searchTabIndex = 1;
                query = query.replace(this.shortCuts[1],'');
            } else if (query.startsWith(this.shortCuts[2])) {
                this.searchTabIndex = 2;
                query = query.replace(this.shortCuts[2],'');
            }
            return query;
        }

        onListItemClicked(item: any) {
            this.$emit("onSearchItemClicked", item);
        }

        async usersSearcher(query: string) {
            return this.userService.searchUsers({
                query: query
            });
        }

        async hashtagsSearcher(query: string) {
            return this.userService.searchHashtags({
                query: query
            });
        }

        async communitiesSearcher(query: string) {
            return this.userService.searchCommunities({
                query: query
            });
        }
    }
</script>

