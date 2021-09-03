export class ModalType {
    static post = new ModalType('Post');
    static postReactions = new ModalType('PostReactions');
    static postActions = new ModalType('PostActions');
    static postCommentReactions = new ModalType('PostCommentReactions');
    static communitiesList = new ModalType('CommunitiesList');
    static reportObject = new ModalType('ReportObject');
    static userActions = new ModalType('UserActions');
    static communityActions = new ModalType('CommunityActions');
    static hashtagActions = new ModalType('HashtagActions');
    static postCommentActions = new ModalType('PostCommentActions');
    static connectionsCirclesPicker = new ModalType('ConnectionsCirclesPicker');
    static termsOfUse = new ModalType('TermsOfUse');
    static privacyPolicy = new ModalType('PrivacyPolicy');
    static communityGuidelines = new ModalType('PrivacyPolicy');
    static themes = new ModalType('Themes');
    static settings = new ModalType('Settings');
    static applicationSettings = new ModalType('ApplicationSettings');
    static userSettings = new ModalType('UserSettings');
    static userProfileSettings = new ModalType('UserProfileSettings');
    static userVisibilitySettings = new ModalType('UserVisibilitySettings');
    static imageCropper = new ModalType('ImageCropper');
    static userFollowings = new ModalType('UserFollowings');
    static userFollowers = new ModalType('UserFollowers');
    static welcomeToOkunaWeb = new ModalType('WelcomeToOkunaWeb');
    static getTheApp = new ModalType('GetTheApp');
    static createCommunity = new ModalType('CreateCommunity');
    static communityRules = new ModalType('CommunityRules');
    static communityStaff = new ModalType('CommunityStaff');
    static communitySettings = new ModalType('CommunitySettings');
    static communityDetailsSettings = new ModalType('CommunityDetailsSettings');
    static communityAdministratorsSettings = new ModalType('CommunityAdministratorsSettings');
    static communityAddAdministrator = new ModalType('CommunityAddAdministrator');
    static communityModeratorsSettings = new ModalType('CommunityModeratorsSettings');
    static communityAddModerator = new ModalType('CommunityAddModerator');
    static communityBansSettings = new ModalType('CommunityBansSettings');
    static communityAddBannedUser = new ModalType('CommunityAddBannedUser');
    static communityReports = new ModalType('CommunityReports');
    static communityClosedPosts = new ModalType('CommunityClosedPosts');
    static communityInvite = new ModalType('CommunityInvite');
    static circlesModal = new ModalType('Circles');
    static createCircleModal = new ModalType('CreateCircle');
    static circleDetailsModal = new ModalType('CircleDetails');
    static editCircleModal = new ModalType('EditCircle');
    static postStudio = new ModalType('createPost');

    static confirmationModal = new ModalType('ConfirmationModal');


    static _values: ModalType[] = [
        ModalType.post,
        ModalType.postReactions,
        ModalType.communitiesList,
        ModalType.postActions,
        ModalType.reportObject,
        ModalType.userActions,
        ModalType.communityActions,
        ModalType.postCommentActions,
        ModalType.connectionsCirclesPicker,
        ModalType.termsOfUse,
        ModalType.privacyPolicy,
        ModalType.communityGuidelines,
        ModalType.themes,
        ModalType.welcomeToOkunaWeb,
        ModalType.getTheApp,
        ModalType.communityRules,
        ModalType.communityStaff,
        ModalType.settings,
        ModalType.applicationSettings,
        ModalType.userSettings,
        ModalType.userProfileSettings,
        ModalType.userVisibilitySettings,
        ModalType.imageCropper,
        ModalType.userFollowings,
        ModalType.userFollowers,
        ModalType.postStudio,
        ModalType.createCommunity,
        ModalType.communitySettings,
        ModalType.communityDetailsSettings,
        ModalType.communityAdministratorsSettings,
        ModalType.communityAddAdministrator,
        ModalType.communityModeratorsSettings,
        ModalType.communityAddModerator,
        ModalType.communityBansSettings,
        ModalType.communityAddBannedUser,
        ModalType.communityReports,
        ModalType.communityClosedPosts,
        ModalType.communityInvite,
        ModalType.circlesModal,
        ModalType.createCircleModal,
        ModalType.circleDetailsModal,
        ModalType.editCircleModal,

        ModalType.confirmationModal,
    ];

    static values() {
        return ModalType._values.slice(0);
    }

    static parse(val: string): ModalType | undefined {
        let keyword;

        for (let i = 0; i < ModalType._values.length; i++) {
            const value = ModalType._values[i];
            if (val == value.code) {
                keyword = value;
                break;
            }
        }

        if (!keyword) {
            console.error('Unsupported modal type');
        }

        return keyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}
