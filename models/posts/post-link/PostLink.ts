import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { IPostLink } from '~/models/posts/post-link/IPostLink';
import { ModelData } from '~/types/models-data/ModelData';


export class PostLink extends DataModel<PostLink> implements IPostLink {
    hasPreview?: boolean;
    link?: string;

    dataMaps: DataModelAttributeMap<IPostLink>[] = [
        {
            dataKey: 'has_preview',
            attributeKey: 'hasPreview',
        },
        {
            dataKey: 'link',
            attributeKey: 'link'
        },
    ];
    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}
