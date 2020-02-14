import { IDataModel } from '~/models/abstract/IDataModel';
import { ICommunityMembershipFormat } from '~/models/posts/post-video-format/ICommunityMembershipFormat';


export interface ICommunityMembership extends IDataModel<ICommunityMembership> {
    userId: number;
    communityId: number;
    isAdministrator: boolean;
    isModerator: boolean;
}

