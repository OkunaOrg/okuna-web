<template>
    <div class="ok-has-background-primary is-semi-rounded has-width-100-percent">
        <div class="box ok-has-background-primary-highlight">
            <div class="columns align-items-center has-padding-bottom-10">
                <div class="column">
                    <h2 class="is-size-5 ok-has-text-primary-invert has-text-weight-bold">
                        {{ $t('manage_circles.my_circles.title') }}
                    </h2>
                </div>

                <div class="column is-narrow">
                    <button
                        class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold has-padding-10 is-size-7"
                        @click.prevent="openCreateCircleModal"
                    >{{ $t('manage_circles.my_circles.create') }}</button>
                </div>
            </div>

            <ok-http-list
                :refresher="circlesRefresher"
                :searcher="circlesSearcher"
                :showNoMore="false"
                ref="okHttpList"
            >
                <ok-circle-list-item
                    slot-scope="props"
                    :circle="props.item"
                    :isConnectionsCircle="props.item === connectionsCircle"
                    :isButtonDisabled="isRequestActive"
                    @circleClicked="handleCircleClick"
                    @deleteButtonClicked="confirmCircleDeletion"
                />
            </ok-http-list>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'nuxt-property-decorator';
    import { BehaviorSubject } from 'rxjs';

    import OkHttpList from '~/components/http-list/OkHttpList.vue';

    import { IUser } from '~/models/auth/user/IUser';
    import { ICircle } from '~/models/connections/circle/ICircle';

    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IModalService } from '~/services/modal/IModalService';
    import { IUserService } from '~/services/user/IUserService';
    import { IUtilsService } from '~/services/utils/IUtilsService';

    import OkCircleListItem from '~/components/circles/components/OkCircleListItem.vue';

    @Component({
        name: 'OkCircles',
        components: { OkHttpList, OkCircleListItem },
        subscriptions: function () {
            return {
                loggedInUser: this['userService'].loggedInUser
            };
        }
    })
    export default class OkCircles extends Vue {
        static infiniteScrollChunkCirclesCount = 20;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        $refs!: {
            okHttpList: OkHttpList<ICircle>;
        };

        isRequestActive: boolean = false;

        circles: ICircle[] | null = null;
        connectionsCircle: ICircle | null = null;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        async circlesSearcher(query: string): Promise<ICircle[]> {
            return this.circles.filter(circle => circle.name.toLowerCase().includes(query));
        }

        async circlesRefresher(): Promise<ICircle[]> {
            const circles = await this.userService.getConnectionsCircles();
            this.connectionsCircle = circles.pop();
            this.circles = [ this.connectionsCircle, ...circles ];
            return this.circles;
        }

        async circlesOnScrollLoader(circles: ICircle[]): Promise<ICircle[]> {
            return Promise.resolve(circles); // no-op
        }

        async handleCircleClick(targetCircle: ICircle, isConnectionsCircle: boolean) {
            try {
                this.isRequestActive = true;

                const circle = await this.userService.getConnectionsCircle({ circleId: targetCircle.id });
                this.modalService.openCircleDetailsModal({
                    circle,
                    isConnectionsCircle
                });
            } catch (err) {
                this.isRequestActive = false;

                const handledError = this.utilsService.handleErrorWithToast(err);
                if (handledError.isUnhandled) {
                    throw handledError.error;
                }
            }
        }

        onWantsToDeleteCircle(circle: ICircle) {
            return async () => {
                try {
                    this.isRequestActive = true;

                    await this.userService.deleteConnectionsCircle({
                        circleId: circle.id
                    });

                    this.modalService.openCirclesModal();
                } catch (err) {
                    this.isRequestActive = false;

                    const handledError = this.utilsService.handleErrorWithToast(err);
                    if (handledError.isUnhandled) {
                        throw handledError.error;
                    }
                }
            };
        }

        onWantsToCancelDeletingCircle() {
            return () => {
                this.modalService.openCirclesModal();
            };
        }

        confirmCircleDeletion(circle: ICircle) {
            this.modalService.openConfirmationModal({
                title: 'Confirm circle deletion',
                contents: 'Are you sure you want to delete this circle?',
                confirmationButtonText: this.$t('global.keywords.yes').toString(),
                cancelButtonText: this.$t('global.keywords.no').toString(),
                confirmationCallback: this.onWantsToDeleteCircle(circle),
                cancelCallback: this.onWantsToCancelDeletingCircle()
            });
        }

        openCreateCircleModal() {
            this.modalService.openCreateCircleModal();
        }
    }
</script>
