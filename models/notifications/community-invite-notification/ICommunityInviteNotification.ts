import { IDataModel } from '~/models/abstract/IDataModel';
import { ICommunityInvite } from '~/models/communities/community/community-invite/ICommunityInvite';

export interface ICommunityInviteNotification extends IDataModel<ICommunityInviteNotification> {
    communityInvite: ICommunityInvite;
}

