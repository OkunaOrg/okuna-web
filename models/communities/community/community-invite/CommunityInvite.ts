import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { ICommunityInvite } from './ICommunityInvite';
import { ICommunity } from '~/models/communities/community/ICommunity';
import { IUser } from '~/models/auth/user/IUser';
import {
    communityDeserializer,
    communitySerializer,
    userDeserializer,
    userSerializer
} from '~/models/common/serializers';


export class CommunityInvite extends DataModel<CommunityInvite> implements ICommunityInvite {
    userId: number;
    creatorId: number;
    invitedUserId: number;
    invitedUser: IUser;
    communityId?: number;
    community?: ICommunity;
    creator: IUser;

    dataMaps: DataModelAttributeMap<ICommunityInvite>[] = [
        {
            dataKey: 'user_id',
            attributeKey: 'userId',
        },
        {
            dataKey: 'creator_id',
            attributeKey: 'creatorId',
        },
        {
            dataKey: 'invited_user_id',
            attributeKey: 'invitedUserId',
        },
        {
            dataKey: 'community_id',
            attributeKey: 'communityId',
        },
        {
            dataKey: 'community',
            attributeKey: 'community',
            deserializer: communityDeserializer,
            serializer: communitySerializer,
        },
        {
            dataKey: 'creator',
            attributeKey: 'creator',
            deserializer: userDeserializer,
            serializer: userSerializer,
        },
        {
            dataKey: 'invited_user',
            attributeKey: 'invitedUser',
            deserializer: userDeserializer,
            serializer: userSerializer,
        },

    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

