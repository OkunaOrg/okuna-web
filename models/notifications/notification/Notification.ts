import { INotification } from '~/models/notifications/notification/INotification';
import { IUser } from '~/models/auth/user/IUser';
import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from 'types/models-data/ModelData';
import {
    dateDeserializer,
    dateSerializer, notificationContentObjectDeserializer, notificationContentObjectTypeSerializer,
    notificationTypeDeserializer, notificationTypeSerializer,
    userDeserializer,
    userSerializer
} from '~/models/common/serializers';
import { NotificationType } from '~/models/notifications/notification/lib/NotificationType';

export class Notification extends DataModel<Notification> implements INotification {

    created: Date;
    owner: IUser;
    read: boolean;
    type: NotificationType;
    contentObject: any;

    dataMaps: DataModelAttributeMap<INotification>[] = [
        {
            dataKey: 'created',
            attributeKey: 'created',
            serializer: dateSerializer,
            deserializer: dateDeserializer,
        },
        {
            dataKey: 'owner',
            attributeKey: 'owner',
            deserializer: userDeserializer,
            serializer: userSerializer
        },
        {
            dataKey: 'read',
            attributeKey: 'read'
        },
        {
            dataKey: 'notification_type',
            attributeKey: 'type',
            deserializer: notificationTypeDeserializer,
            serializer: notificationTypeSerializer,
        },
        {
            dataKey: 'content_object',
            attributeKey: 'contentObject',
            deserializer: notificationContentObjectDeserializer,
            serializer: notificationContentObjectTypeSerializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

    readNotification(): void {
        this.read = true;
    }
}
