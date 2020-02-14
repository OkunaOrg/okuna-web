import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { ICommunityMembership } from './ICommunityMembership';


export class CommunityMembership extends DataModel<CommunityMembership> implements ICommunityMembership {

    userId: number;
    communityId: number;
    isAdministrator: boolean;
    isModerator: boolean;

    dataMaps: DataModelAttributeMap<ICommunityMembership>[] = [
        {
            dataKey: 'user_id',
            attributeKey: 'userId',
        },
        {
            dataKey: 'community_id',
            attributeKey: 'communityId',
        },
        {
            dataKey: 'is_administrator',
            attributeKey: 'isAdministrator',
        },
        {
            dataKey: 'is_moderator',
            attributeKey: 'isModerator',
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

