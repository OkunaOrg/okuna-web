import { IUser } from '~/models/auth/user/IUser';
import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { userDeserializer, userSerializer } from '~/models/common/serializers';
import { IConnection } from '~/models/connections/connection/IConnection';

export class Connection extends DataModel<Connection> implements IConnection {
    targetUser!: IUser;
    dataMaps: DataModelAttributeMap<IConnection>[] = [
        {
            dataKey: 'target_user',
            attributeKey: 'targetUser',
            deserializer: userDeserializer,
            serializer: userSerializer,
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

