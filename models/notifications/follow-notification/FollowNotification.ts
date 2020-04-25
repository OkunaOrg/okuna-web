import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import {
    userDeserializer,
    userSerializer
} from '~/models/common/serializers';
import { IUser } from '~/models/auth/user/IUser';
import { IFollowNotification } from '~/models/notifications/follow-notification/IFollowNotification';

export class FollowNotification extends DataModel<FollowNotification> implements IFollowNotification {

    follower: IUser;

    dataMaps: DataModelAttributeMap<IFollowNotification>[] = [
        {
            dataKey: 'follower',
            attributeKey: 'follower',
            serializer: userSerializer,
            deserializer: userDeserializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}

