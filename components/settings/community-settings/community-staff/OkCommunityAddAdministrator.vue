<template>
    <div class="ok-has-background-primary is-semi-rounded has-width-100-percent">
        <div class="box ok-has-background-primary-highlight">
            <div class="columns align-items-center has-padding-bottom-10">
                <div class="column">
                    <h2 class="is-size-5 ok-has-text-primary-invert has-text-weight-bold">
                        {{ $t('manage_community.administrators.add_administrator') }}
                    </h2>
                </div>

                <div class="column is-narrow">
                    <button
                        class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold has-padding-10 is-size-7"
                        @click.prevent="openAdministratorsSettingsModal"
                    >{{ $t('global.keywords.cancel') }}</button>
                </div>
            </div>

            <ok-http-list
                :refresher="membersRefresher"
                :on-scroll-loader="membersOnScrollLoader"
                :searcher="membersSearcher"
                ref="okHttpList"
            >
                <ok-community-member-list-item
                    slot-scope="props"
                    :user="props.item"
                    :showActionButton="props.item.id !== loggedInUser.id"
                    :isButtonDisabled="isRequestActive"
                    @actionButtonClicked="confirmAddingAdministrator"
                    :actionButtonText="$t('manage_community.administrators.add')"
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
    import { CommunityMembersExclusion } from '~/services/Apis/communities/CommunitiesApiServiceTypes';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IModalService } from '~/services/modal/IModalService';
    import { IUserService } from '~/services/user/IUserService';
    import { IUtilsService } from '~/services/utils/IUtilsService';

    @Component({
        name: 'OkCommunityAddAdministrator',
        components: { OkCommunityMemberListItem, OkHttpList },
        subscriptions: function () {
            return {
                loggedInUser: this['userService'].loggedInUser
            };
        }
    })
    export default class OkCommunityAddAdministrator extends Vue {
        static infiniteScrollChunkMembersCount = 20;

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

        async membersSearcher(query: string): Promise<IUser[]> {
            return this.userService.searchCommunityMembers({
                community: this.community,
                exclude: [ CommunityMembersExclusion.administrators ],
                query
            });
        }

        async membersRefresher(): Promise<IUser[]> {
            return this.userService.getCommunityMembers({
                community: this.community,
                exclude: [ CommunityMembersExclusion.administrators ],
                count: OkCommunityAddAdministrator.infiniteScrollChunkMembersCount
            });
        }

        async membersOnScrollLoader(members: IUser[]): Promise<IUser[]> {
            const last = members[members.length - 1];
            const lastId = last.id;

            return this.userService.getCommunityMembers({
                community: this.community,
                exclude: [ CommunityMembersExclusion.administrators ],
                count: OkCommunityAddAdministrator.infiniteScrollChunkMembersCount,
                maxId: lastId
            });
        }

        openAdministratorsSettingsModal() {
            this.modalService.openCommunityAdministratorsSettingsModal({
                community: this.community
            });
        }

        onWantsToAddAdministrator(user: IUser) {
            const community = this.community;

            return async () => {
                try {
                    this.isRequestActive = true;

                    await this.userService.addCommunityAdministrator({
                        community,
                        user
                    });

                    this.modalService.openCommunityAdministratorsSettingsModal({
                        community
                    });
                } catch (err) {
                    this.isRequestActive = false;

                    const handledError = this.utilsService.handleErrorWithToast(err);
                    if (handledError.isUnhandled) {
                        throw handledError.error;
                    }
                }
            };
        }

        onWantsToCancelAddingAdministrator() {
            const community = this.community;

            return () => {
                this.modalService.openCommunityAddAdministratorModal({
                    community
                });
            };
        }

        confirmAddingAdministrator(user: IUser) {
            this.modalService.openConfirmationModal({
                title: this.$t('manage_community.administrators.add_confirmation.title', { username: user.username }).toString(),
                contents: this.$t('manage_community.administrators.add_confirmation.contents').toString(),
                confirmationButtonText: this.$t('global.keywords.yes').toString(),
                cancelButtonText: this.$t('global.keywords.no').toString(),
                confirmationCallback: this.onWantsToAddAdministrator(user),
                cancelCallback: this.onWantsToCancelAddingAdministrator()
            });
        }
    }
</script>
