<template>
    <section class="ok-user-followings-stream">
        <ok-http-list
            :refresher="followingsRefresher"
            :on-scroll-loader="followingsOnScrollLoader"
            :searcher="followingsSearcher"
            ref="okHttpList"
        >
            <ok-user-list-item
                slot-scope="props"
                :user="props.item"
            ></ok-user-list-item>
        </ok-http-list>
    </section>
</template>

<style lang="scss" scoped>
    .ok-user-followings-stream {
        height: calc(100vh - 240px);
        width: 100%;
        overflow-y: auto;
    }
</style>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';
    import { BehaviorSubject } from 'rxjs';
    import { IUser } from '~/models/auth/user/IUser';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IUserService } from '~/services/user/IUserService';

    import OkHttpList from '~/components/http-list/OkHttpList.vue';
    import OkUserListItem from '~/components/user-list/common/user-list-item/OkUserListItem.vue';

    @Component({
        name: 'OkUserFollowingsStream',
        components: { OkHttpList, OkUserListItem },
        subscriptions: function () {
            return {
                loggedInUser: this['userService'].loggedInUser
            };
        }
    })
    export default class OkUserFollowingsStream extends Vue {
        static infiniteScrollChunkFollowingsCount = 10;

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser | undefined>
        };

        $refs!: {
            okHttpList: OkHttpList<IUser>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        followings: IUser[] = [];

        async followingsSearcher(query: string): Promise<IUser[]> {
            return this.userService.searchFollowings({
                query
            });
        }

        async followingsRefresher(): Promise<IUser[]> {
            return this.userService.getFollowings({
                count: OkUserFollowingsStream.infiniteScrollChunkFollowingsCount
            });
        }

        async followingsOnScrollLoader(followings: IUser[]): Promise<IUser[]> {
            const lastFollowing = followings[followings.length - 1];
            const lastFollowingId = lastFollowing.id;

            return this.userService.getFollowings({
                count: OkUserFollowingsStream.infiniteScrollChunkFollowingsCount,
                maxId: lastFollowingId
            });
        }
    }
</script>
