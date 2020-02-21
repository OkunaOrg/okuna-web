import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { IPostVideo } from '~/models/posts/post-video/IPostVideo';
import { IPostVideoFormat } from '~/models/posts/post-video-format/IPostVideoFormat';
import { postVideoFormatsDeserializer, postVideoFormatsSerializer } from '~/models/common/serializers';


export class PostVideo extends DataModel<PostVideo> implements IPostVideo {

    duration: number;
    formatSet: IPostVideoFormat[];
    height: number;
    thumbnail: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
    width: number;

    dataMaps: DataModelAttributeMap<IPostVideo>[] = [
        {
            dataKey: 'height',
            attributeKey: 'height',
        },
        {
            dataKey: 'thumbnail',
            attributeKey: 'thumbnail',
        },
        {
            dataKey: 'thumbnail_height',
            attributeKey: 'thumbnailHeight',
        },
        {
            dataKey: 'thumbnail_width',
            attributeKey: 'thumbnailWidth',
        },
        {
            dataKey: 'width',
            attributeKey: 'width',
        },
        {
            dataKey: 'format_set',
            attributeKey: 'formatSet',
            deserializer: postVideoFormatsDeserializer,
            serializer: postVideoFormatsSerializer,
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

