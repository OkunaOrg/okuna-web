import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { IPostVideoFormat } from '~/models/posts/post-video-format/IPostVideoFormat';


export class PostVideoFormat extends DataModel<PostVideoFormat> implements IPostVideoFormat {

    duration: number;
    file: string;
    format: string;
    progress: number;

    dataMaps: DataModelAttributeMap<IPostVideoFormat>[] = [
        {
            dataKey: 'duration',
            attributeKey: 'duration',
        },
        {
            dataKey: 'file',
            attributeKey: 'file',
        },
        {
            dataKey: 'format',
            attributeKey: 'format',
        },
        {
            dataKey: 'progress',
            attributeKey: 'progress',
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

