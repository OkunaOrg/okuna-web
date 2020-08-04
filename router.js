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
import OkAuthPage from "./pages/auth/OkAuthPage";
import OkLoginPage from "./pages/auth/pages/OkLoginPage";
import OkRegisterPage from "./pages/auth/pages/register-page/OkRegisterPage";
import OkCommunityProfile from "./pages/home/pages/community/OkCommunityProfile";

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        scrollBehavior(to, from, savedPosition) {
            if (to.name === 'timeline' || to.name === 'now') {
                return false;
            }

            return {x: 0, y: savedPosition || 0}
        },
        routes: [
            {
                path: '/',
                name: 'home',
                component: OkHomePage,
                children: [
                    {
                        name: 'timeline',
                        path: '',
                        component: OkTimelinePage,
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
                    },
                    {
                        path: 'c/:communityName',
                        component: OkCommunityProfile,
                    },
                    {
                        name: 'now',
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
                        name: 'user',
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
