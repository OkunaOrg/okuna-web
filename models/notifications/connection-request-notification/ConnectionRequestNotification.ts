import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import { userDeserializer, userSerializer
} from '~/models/common/serializers';
import { IUser } from '~/models/auth/user/IUser';
import { IConnectionRequestNotification } from '~/models/notifications/connection-request-notification/IConnectionRequestNotification';

export class ConnectionRequestNotification extends DataModel<ConnectionRequestNotification> implements IConnectionRequestNotification {

    connectionRequester: IUser;

    dataMaps: DataModelAttributeMap<IConnectionRequestNotification>[] = [
        {
            dataKey: 'connection_requester',
            attributeKey: 'connectionRequester',
            serializer: userSerializer,
            deserializer: userDeserializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}

