import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { IPostImage } from '~/models/posts/post-image/IPostImage';


export class PostImage extends DataModel<PostImage> implements IPostImage {

    height: number;
    image: string;
    thumbnail: string;
    width: number;

    dataMaps: DataModelAttributeMap<IPostImage>[] = [
        {
            dataKey: 'height',
            attributeKey: 'height',
        },
        {
            dataKey: 'image',
            attributeKey: 'image',
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

