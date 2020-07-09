import { ICircle } from '~/models/connections/circle/ICircle';
import { IUser } from '~/models/auth/user/IUser';
import userFactory from '~/models/auth/user/factory';
import { DataModel } from '~/models/abstract/DataModel';
import { UserData } from '~/types/models-data/auth/UserData';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { colorDeserializer, colorSerializer } from '~/models/common/serializers';
import Color from 'color';

export class Circle extends DataModel<Circle> implements ICircle {
    creator!: IUser;
    name!: string;
    color!: Color;
    usersCount!: number;
    users!: IUser[];

    dataMaps: DataModelAttributeMap<ICircle>[] = [
        {
            dataKey: 'name',
            attributeKey: 'name'
        },
        {
            dataKey: 'color',
            attributeKey: 'color',
            serializer: colorSerializer,
            deserializer: colorDeserializer
        },
        {
            dataKey: 'users_count',
            attributeKey: 'usersCount'
        },
        {
            dataKey: 'creator',
            attributeKey: 'creator',
            deserializer: (instance, rawData: UserData) => {
                if (!rawData) return;
                return userFactory.make(rawData);
            },
        },
        {
            dataKey: 'users',
            attributeKey: 'users',
            deserializer: (instance, rawData: UserData[]) => {
                return rawData.map((rawDataItem) => userFactory.make(rawDataItem));
            }
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

