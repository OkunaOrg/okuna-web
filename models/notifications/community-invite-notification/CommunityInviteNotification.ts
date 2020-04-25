import { ICommunityInvite } from '~/models/communities/community/community-invite/ICommunityInvite';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ICommunityInviteNotification } from '~/models/notifications/community-invite-notification/ICommunityInviteNotification';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import { communityInviteDeserializer, communityInviteSerializer } from '~/models/common/serializers';

export class CommunityInviteNotification extends DataModel<CommunityInviteNotification> implements ICommunityInviteNotification {

    communityInvite: ICommunityInvite;

    dataMaps: DataModelAttributeMap<ICommunityInviteNotification>[] = [
        {
            dataKey: 'community_invite',
            attributeKey: 'communityInvite',
            serializer: communityInviteSerializer,
            deserializer: communityInviteDeserializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}

