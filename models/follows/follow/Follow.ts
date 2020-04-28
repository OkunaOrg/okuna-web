import { IUser } from '~/models/auth/user/IUser';
import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { userDeserializer, userSerializer } from '~/models/common/serializers';
import { IFollow } from '~/models/follows/follow/IFollow';

export class Follow extends DataModel<Follow> implements IFollow {
    followedUser!: IUser;
    dataMaps: DataModelAttributeMap<IFollow>[] = [
        {
            dataKey: 'followed_user',
            attributeKey: 'followedUser',
            deserializer: userDeserializer,
            serializer: userSerializer,
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

