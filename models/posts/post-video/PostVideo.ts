import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { IPostVideo } from '~/models/posts/post-video/IPostVideo';


export class PostVideo extends DataModel<PostVideo> implements IPostVideo {

    height: number;
    video: string;
    thumbnail: string;
    width: number;

    dataMaps: DataModelAttributeMap<IPostVideo>[] = [
        {
            dataKey: 'height',
            attributeKey: 'height',
        },
        {
            dataKey: 'video',
            attributeKey: 'video',
        },
        {
            dataKey: 'thumbnail',
            attributeKey: 'thumbnail',
        },
        {
            dataKey: 'width',
            attributeKey: 'width',
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

