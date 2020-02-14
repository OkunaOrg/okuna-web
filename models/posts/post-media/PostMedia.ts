import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { IPostMedia } from '~/models/posts/post-media/IPostMedia';
import { PostMediaType } from '~/models/posts/post-media/lib/PostMediaType';
import { IPostImage } from '~/models/posts/post-image/IPostImage';
import { IPostVideo } from '~/models/posts/post-video/IPostVideo';
import {
    postMediaContentObjectDeserializer, postMediaContentObjectTypeSerializer,
    postMediaTypeDeserializer,
    postMediaTypeSerializer
} from '~/models/common/serializers';


export class PostMedia extends DataModel<PostMedia> implements IPostMedia {

    contentObject: IPostVideo | IPostImage;
    order: number;
    type: PostMediaType;

    dataMaps: DataModelAttributeMap<IPostMedia>[] = [
        // Important that type is deserialized first
        {
            dataKey: 'type',
            attributeKey: 'type',
            deserializer: postMediaTypeDeserializer,
            serializer: postMediaTypeSerializer
        },
        {
            dataKey: 'order',
            attributeKey: 'order',
        },
        {
            dataKey: 'content_object',
            attributeKey: 'contentObject',
            deserializer: postMediaContentObjectDeserializer,
            serializer: postMediaContentObjectTypeSerializer
        },

    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}

