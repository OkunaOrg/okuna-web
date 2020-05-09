import Vue from 'vue';
import Router from 'vue-router';
import OkHomePage from "./pages/home/OkHomePage";
import OkMenuPage from "./pages/home/pages/menu/OkMenuPage";
import OkNotificationsPage from "./pages/home/pages/notifications/OkNotificationsPage";
import OkNowPage from "./pages/home/pages/now/OkNowPage";
import OkTimelinePage from "./pages/home/pages/timeline/OkTimelinePage";
import OkHashtagPage from "./pages/home/pages/hashtag/OkHashtagPage";
import OkPostPage from "./pages/home/pages/post/OkPostPage";
import OkUserPage from "./pages/home/pages/user/OkUserProfilePage";
import OkCommunitiesPage from "./pages/home/pages/communities/OkCommunitiesPage";
import OkExploreCommunitiesPage from "./pages/home/pages/communities/pages/explore/OkExploreCommunitiesPage";
import OkCommunityPage from "./pages/home/pages/communities/pages/community/OkCommunityPage";

import OkAuthPage from "./pages/auth/OkAuthPage";
import OkLoginPage from "./pages/auth/pages/OkLoginPage";
import OkRegisterPage from "./pages/auth/pages/OkRegisterPage";

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                name: 'home',
                component: OkHomePage,
                children: [
                    {
                        name: 'timeline',
                        path: '',
                        component: OkTimelinePage
                    },
                    {
                        path: 'm',
                        component: OkMenuPage
                    },
                    {
                        path: 'n',
                        component: OkNotificationsPage
                    },
                    {
                        name: 'communities',
                        path: 'c',
                        component: OkCommunitiesPage,
                        children: [
                            {
                                path: '',
                                component: OkExploreCommunitiesPage
                            },
                            {
                                path: ':communityName',
                                component: OkCommunityPage,
                            },
                        ]
                    },
                    {
                        path: 'now',
                        component: OkNowPage
                    },
                    {
                        path: 'h/:hashtagName',
                        component: OkHashtagPage,
                    },
                    {
                        name: 'post',
                        path: 'p/:postUuid',
                        component: OkPostPage,
                    },
                    {
                        path: ':userUsername',
                        component: OkUserPage,
                    },
                ]
            },
            {
                path: '/a',
                component: OkAuthPage,
                children: [
                    {
                        path: 'login',
                        component: OkLoginPage
                    },
                    {
                        path: 'register',
                        component: OkRegisterPage
                    }
                ]
            },
        ]
    })
}
