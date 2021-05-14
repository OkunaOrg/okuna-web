<template>
    <div class="ok-has-background-primary is-semi-rounded has-width-100-percent">
        <div class="box ok-has-background-primary-highlight">
            <div class="columns align-items-center has-padding-bottom-10">
                <div class="column">
                    <h2 class="is-size-5 ok-has-text-primary-invert has-text-weight-bold">
                        {{ $t('manage_community.settings.moderators.name') }}
                    </h2>
                </div>

                <div class="column is-narrow">
                    <button
                        class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold has-padding-10 is-size-7"
                        @click.prevent="openAddModeratorModal"
                    >{{ $t('manage_community.moderators.add') }}</button>
                </div>
            </div>

            <ok-http-list
                :refresher="moderatorsRefresher"
                :on-scroll-loader="moderatorsOnScrollLoader"
                :searcher="moderatorsSearcher"
                ref="okHttpList"
            >
                <ok-community-member-list-item
                    slot-scope="props"
                    :user="props.item"
                    :showActionButton="props.item.id !== loggedInUser.id"
                    :isButtonDisabled="isRequestActive"
                    @actionButtonClicked="onWantsToRemoveModerator"
                    :actionButtonText="$t('manage_community.moderators.remove')"
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
    import { IModalService } from '~/services/modal/IModalService';
    import { IUserService } from '~/services/user/IUserService';
    import { IUtilsService } from '~/services/utils/IUtilsService';

    @Component({
        name: 'OkCommunityModeratorsSettings',
        components: { OkCommunityMemberListItem, OkHttpList },
        subscriptions: function () {
            return {
                loggedInUser: this['userService'].loggedInUser
            };
        }
    })
    export default class OkCommunityModeratorsSettings extends Vue {
        static infiniteScrollChunkModeratorsCount = 20;

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
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        async moderatorsSearcher(query: string): Promise<IUser[]> {
            return this.userService.searchCommunityModerators({
                community: this.community,
                query
            });
        }

        async moderatorsRefresher(): Promise<IUser[]> {
            return this.userService.getCommunityModerators({
                community: this.community,
                count: OkCommunityModeratorsSettings.infiniteScrollChunkModeratorsCount
            });
        }

        async moderatorsOnScrollLoader(moderators: IUser[]): Promise<IUser[]> {
            const last = moderators[moderators.length - 1];
            const lastId = last.id;

            return this.userService.getCommunityModerators({
                community: this.community,
                count: OkCommunityModeratorsSettings.infiniteScrollChunkModeratorsCount,
                maxId: lastId
            });
        }

        async onWantsToRemoveModerator(user: IUser) {
            try {
                this.isRequestActive = true;

                await this.userService.removeCommunityModerator({
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

        openAddModeratorModal() {
            this.modalService.openCommunityAddModeratorModal({
                community: this.community
            });
        }
    }
</script>
