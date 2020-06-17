import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import {
    dateDeserializer,
    dateSerializer,
    postDeserializer,
    postSerializer,
} from '~/models/common/serializers';
import { IPost } from '~/models/posts/post/IPost';
import { ITrendingPost } from '~/models/posts/trending-post/ITrendingPost';


export class TrendingPost extends DataModel<TrendingPost> implements ITrendingPost {
    id: number;
    post: IPost;
    created: Date;

    dataMaps: DataModelAttributeMap<ITrendingPost>[] = [
        {
            dataKey: 'post',
            attributeKey: 'post',
            deserializer: postDeserializer,
            serializer: postSerializer
        },
        {
            dataKey: 'created',
            attributeKey: 'created',
            deserializer: dateDeserializer,
            serializer: dateSerializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

