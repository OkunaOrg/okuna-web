import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import { userDeserializer, userSerializer
} from '~/models/common/serializers';
import { IUser } from '~/models/auth/user/IUser';
import { IConnectionConfirmedNotification } from '~/models/notifications/connection-confirmed-notification/IConnectionConfirmedNotification';

export class ConnectionConfirmedNotification extends DataModel<ConnectionConfirmedNotification> implements IConnectionConfirmedNotification {

    connectionConfirmator: IUser;

    dataMaps: DataModelAttributeMap<IConnectionConfirmedNotification>[] = [
        {
            dataKey: 'connection_confirmator',
            attributeKey: 'connectionConfirmator',
            serializer: userSerializer,
            deserializer: userDeserializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}

