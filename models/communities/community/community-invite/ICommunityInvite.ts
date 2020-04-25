import { IDataModel } from '~/models/abstract/IDataModel';
import { IUser } from '~/models/auth/user/IUser';
import { ICommunity } from '~/models/communities/community/ICommunity';


export interface ICommunityInvite extends IDataModel<ICommunityInvite> {
    userId: number;
    creatorId: number;
    invitedUserId: number;
    invitedUser: IUser;
    communityId?: number;
    community?: ICommunity;
    creator: IUser;
}

