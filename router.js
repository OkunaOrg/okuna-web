import Vue from 'vue';
import Router from 'vue-router';

import OkEmptyPage from '~/pages/OkEmptyPage.vue';
import HomePage from '~/pages/home/HomePage.vue';
import AuthPage from '~/pages/auth/auth.vue';
import AuthLoginPage from '~/pages/auth/pages/login.vue';
import AuthRegisterPage from '~/pages/auth/pages/register.vue';
import OkHomeTimelinePage from '~/pages/home/pages/timeline/OkHomeTimelinePage.vue';
import HomeUserPage from '~/pages/home/pages/user/user.vue';
import HomeUserProfilePage from '~/pages/home/pages/user/pages/profile.vue';
import HomeUserEditProfilePage from '~/pages/home/pages/user/pages/edit.vue';
import HomeCommunitiesPage from '~/pages/home/pages/communities/communities.vue';
import HomeCommunitiesExplorePage from '~/pages/home/pages/communities/pages/explore/explore.vue';
import HomeCommunityPage from '~/pages/home/pages/communities/pages/community/community.vue';
import HomeCommunityProfilePage from '~/pages/home/pages/communities/pages/community/pages/profile.vue';
import HomeCommunityEditPage from '~/pages/home/pages/communities/pages/community/pages/edit.vue';
import OkHomeNowPage from '~/pages/home/pages/now/HomeNowPage.vue';
import OkPostCommentsPage from '~/pages/home/pages/post/pages/post-comments/OkPostCommentsPage.vue';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                name: 'home',
                component: HomePage,
                children: [
                    {
                        name: 'timeline',
                        path: '',
                        component: OkHomeTimelinePage
                    },
                    {
                        path: 'n',
                        component: OkHomeNowPage
                    },
                    {
                        name: 'communities',
                        path: 'c',
                        component: HomeCommunitiesPage,
                        children: [
                            {
                                path: '',
                                component: HomeCommunitiesExplorePage
                            },
                            {
                                path: ':communityName',
                                component: HomeCommunityPage,
                                children: [
                                    {
                                        path: '',
                                        component: HomeCommunityProfilePage
                                    },
                                    {
                                        path: 'e',
                                        component: HomeCommunityEditPage
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        path: 'h',
                        component: HomeCommunitiesPage,
                        children: [
                            {
                                path: ':hashtagName',
                                component: HomeCommunityPage,
                                children: [
                                    {
                                        path: '',
                                        component: HomeCommunityProfilePage
                                    },
                                    {
                                        path: 'e',
                                        component: HomeCommunityEditPage
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'post',
                        path: 'p/:postUuid',
                        component: OkPostCommentsPage,
                    },
                    {
                        path: ':username',
                        component: HomeUserPage,
                        children: [
                            {
                                path: '',
                                component: HomeUserProfilePage
                            },
                            {
                                path: 'e',
                                component: HomeUserEditProfilePage
                            },
                        ]
                    },
                ]
            },
            {
                path: '/a',
                component: AuthPage,
                children: [
                    {
                        path: 'login',
                        component: AuthLoginPage
                    },
                    {
                        path: 'register',
                        component: AuthRegisterPage
                    }
                ]
            },
        ]
    })
}