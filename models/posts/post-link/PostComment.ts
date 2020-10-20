import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { IPostLink } from '~/models/posts/post-link/IPostComment';


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
}
