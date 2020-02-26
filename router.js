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
import OkPostPage from '~/pages/home/pages/post/OkPostPage.vue';
import OkPostCommentsPage from '~/pages/home/pages/post/pages/post-comments/OkPostCommentsPage.vue';
import OkPostCommentPage from '~/pages/home/pages/post/pages/post-comment/OkPostCommentPage.vue';
import OkPostCommentRepliesPage
    from '~/pages/home/pages/post/pages/post-comment/pages/post-comment-replies/OkPostCommentRepliesPage.vue';
import OkPostCommentReplyPage
    from '~/pages/home/pages/post/pages/post-comment/pages/post-comment-reply/OkPostCommentReplyPage.vue';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: HomePage,
                children: [
                    {
                        path: '',
                        component: OkHomeTimelinePage
                    },
                    {
                        path: 'n',
                        component: OkHomeNowPage
                    },
                    {
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
                        path: 'p',
                        component: OkEmptyPage,
                        children: [
                            {
                                path: ':postUuid',
                                component: OkPostPage,
                                children: [
                                    {
                                        path: 'c',
                                        component: OkEmptyPage,
                                        children: [
                                            {
                                                path: '',
                                                component: OkPostCommentsPage
                                            },
                                            {
                                                path: ':postCommentId',
                                                component: OkEmptyPage,
                                                children: [
                                                    {
                                                        path: '',
                                                        component: OkPostCommentPage
                                                    },
                                                    {
                                                        path: 'r',
                                                        component: OkEmptyPage,
                                                        children: [
                                                            {
                                                                path: '',
                                                                component: OkPostCommentRepliesPage,
                                                            },
                                                            {
                                                                path: ':postCommentReplyId',
                                                                component: OkPostCommentReplyPage,
                                                            },
                                                        ]
                                                    }
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            }
                        ]
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