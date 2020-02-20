import { IDataModel } from '~/models/abstract/IDataModel';


export interface ICommunityMembership extends IDataModel<ICommunityMembership> {
    userId: number;
    communityId: number;
    isAdministrator: boolean;
    isModerator: boolean;
}

