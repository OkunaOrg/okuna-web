<template>
    <div class="ok-has-background-primary is-semi-rounded has-width-100-percent">
        <div class="box ok-has-background-primary-highlight">
            <h2 class="is-size-5 has-padding-bottom-10 ok-has-text-primary-invert has-text-weight-bold">
                Administrators
            </h2>

            <ok-http-list
                :refresher="administratorsRefresher"
                :on-scroll-loader="administratorsOnScrollLoader"
                :searcher="administratorsSearcher"
                ref="okHttpList"
            >
                <ok-community-member-list-item
                    slot-scope="props"
                    :user="props.item"
                    :showActionButton="props.item.id !== loggedInUser.id"
                    :isButtonDisabled="isRequestActive"
                    @actionButtonClicked="onWantsToRemoveAdministrator"
                    actionButtonText="Remove"
                />
            </ok-http-list>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { BehaviorSubject } from 'rxjs';

    import OkHttpList from '~/components/http-list/OkHttpList.vue';
    import OkCommunityMemberListItem from '~/components/settings/community-settings/common/OkCommunityMemberListItem.vue';

    import { IUser } from '~/models/auth/user/IUser';
    import { ICommunity } from '~/models/communities/community/ICommunity';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IUserService } from '~/services/user/IUserService';
    import { IUtilsService } from '~/services/utils/IUtilsService';

    @Component({
        name: 'OkCommunityAdministratorsSettings',
        components: { OkCommunityMemberListItem, OkHttpList },
        subscriptions: function () {
            return {
                loggedInUser: this['userService'].loggedInUser
            };
        }
    })
    export default class OkCommunityAdministratorsSettings extends Vue {
        static infiniteScrollChunkAdministratorsCount = 20;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        $refs!: {
            okHttpList: OkHttpList<IUser>;
        };

        @Prop({
            type: Object,
            required: true
        }) community: ICommunity;

        isRequestActive: boolean = false;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        async administratorsSearcher(query: string): Promise<IUser[]> {
            return this.userService.searchCommunityAdministrators({
                community: this.community,
                query
            });
        }

        async administratorsRefresher(): Promise<IUser[]> {
            return this.userService.getCommunityAdministrators({
                community: this.community,
                count: OkCommunityAdministratorsSettings.infiniteScrollChunkAdministratorsCount
            });
        }

        async administratorsOnScrollLoader(administrators: IUser[]): Promise<IUser[]> {
            const last = administrators[administrators.length - 1];
            const lastId = last.id;

            return this.userService.getCommunityAdministrators({
                community: this.community,
                count: OkCommunityAdministratorsSettings.infiniteScrollChunkAdministratorsCount,
                maxId: lastId
            });
        }

        async onWantsToRemoveAdministrator(user: IUser) {
            try {
                this.isRequestActive = true;

                await this.userService.removeCommunityAdministrator({
                    community: this.community,
                    user
                });

                this.$refs.okHttpList.removeItem(user);
            } catch (err) {
                this.isRequestActive = false;

                const handledError = this.utilsService.handleErrorWithToast(err);
                if (handledError.isUnhandled) {
                    throw handledError.error;
                }
            }
        }
    }
</script>
