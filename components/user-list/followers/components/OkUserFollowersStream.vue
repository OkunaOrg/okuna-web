<template>
    <section class="ok-user-followers-stream">
        <ok-http-list
            :refresher="followersRefresher"
            :on-scroll-loader="followersOnScrollLoader"
            :searcher="followersSearcher"
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
    .ok-user-followers-stream {
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
        name: 'OkUserFollowersStream',
        components: { OkHttpList, OkUserListItem },
        subscriptions: function () {
            return {
                loggedInUser: this['userService'].loggedInUser
            };
        }
    })
    export default class OkUserFollowersStream extends Vue {
        static infiniteScrollChunkFollowersCount = 10;

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser | undefined>
        };

        $refs!: {
            okHttpList: OkHttpList<IUser>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        followers: IUser[] = [];

        async followersSearcher(query: string): Promise<IUser[]> {
            return this.userService.searchFollowers({
                query
            });
        }

        async followersRefresher(): Promise<IUser[]> {
            return this.userService.getFollowers({
                count: OkUserFollowersStream.infiniteScrollChunkFollowersCount
            });
        }

        async followersOnScrollLoader(followers: IUser[]): Promise<IUser[]> {
            const lastFollowing = followers[followers.length - 1];
            const lastFollowingId = lastFollowing.id;

            return this.userService.getFollowers({
                count: OkUserFollowersStream.infiniteScrollChunkFollowersCount,
                maxId: lastFollowingId
            });
        }
    }
</script>
