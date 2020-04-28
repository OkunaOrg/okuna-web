import { ICircle } from '~/models/circles/circle/ICircle';
import { IUserProfile } from '~/models/auth/user-profile/IUserProfile';
import { IDataModel } from '~/models/abstract/IDataModel';


export interface IUser extends IDataModel<IUser> {
    uuid: string;
    areGuidelinesAccepted: boolean;
    connectionsCircleId: number;
    followersCount: number;
    postsCount: number;
    dateJoined: Date;
    inviteCount: number;
    unreadNotificationsCount: number;
    pendingCommunitiesModeratedObjectsCount: number;
    activeModerationPenaltiesCount: number;
    email: string;
    username: string;
    followingCount: number;
    isFollowing: boolean;
    isFollowed: boolean;
    isConnected: boolean;
    isGlobalModerator: boolean;
    isBlocked: boolean;
    isReported: boolean;
    isFullyConnected: boolean;
    isMemberOfCommunities: boolean;
    isPendingConnectionConfirmation: boolean;

    connectedCircles: ICircle[];
    profile: IUserProfile;


    incrementFollowersCount(): void;
    decrementFollowersCount(): void;
}