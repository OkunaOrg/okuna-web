import { IDataModel } from '~/models/abstract/IDataModel';
import { IUser } from '~/models/auth/user/IUser';
import { ICommunityMembership } from '~/models/communities/community/community-membership/ICommunityMembership';
import { ICategory } from '~/models/common/category/ICategory';
import { CommunityType } from '~/models/communities/community/lib/CommunityType';
import Color from 'color';

export interface ICommunity extends IDataModel<ICommunity> {
    creator?: IUser;
    name?: string;
    type?: CommunityType;
    rules?: string;
    avatar?: string;
    title?: string;
    userAdjective?: string;
    usersAdjective?: string;
    description?: string;
    color?: Color;
    cover?: string;
    isInvited?: boolean;
    areNewPostNotificationsEnabled?: boolean;
    isCreator?: boolean;
    isReported?: boolean;
    moderators?: IUser[];
    memberships?: ICommunityMembership[];
    administrators?: IUser[];
    isFavorite?: boolean;
    invitesEnabled?: boolean;
    membersCount?: number;
    postsCount?: number;
    pendingModeratedObjectsCount?: number;
    categories?: ICategory[];
    colorInvert?: Color;

    isMember(user: IUser): boolean;
}