import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { dateDeserializer, dateSerializer } from '~/models/common/serializers';
import { ILinkPreviewYoutubeDetails } from '~/models/link-previews/link-preview-youtube-details/ILinkPreviewYoutubeDetails';

export class LinkPreviewYoutubeDetails extends DataModel<LinkPreviewYoutubeDetails> implements ILinkPreviewYoutubeDetails {
    type: 'youtube';
    statusId: string;
    retweetCount: number;
    likesCount: number;
    publishedAt: Date;

    dataMaps: DataModelAttributeMap<ILinkPreviewYoutubeDetails>[] = [
        {dataKey: 'type', attributeKey: 'type'},
        {dataKey: 'statusId', attributeKey: 'statusId'},
        {dataKey: 'retweetCount', attributeKey: 'retweetCount'},
        {dataKey: 'likesCount', attributeKey: 'likesCount'},
        {
            dataKey: 'publishedAt', attributeKey: 'publishedAt',
            serializer: dateSerializer, deserializer: dateDeserializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

