import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { ILinkPreview } from '~/models/link-previews/link-preview/ILinkPreview';
import { ILinkPreviewImage } from '~/models/link-previews/link-preview-image/ILinkPreviewImage';
import { ILinkPreviewYoutubeDetails } from '~/models/link-previews/link-preview-youtube-details/ILinkPreviewYoutubeDetails';
import { ILinkPreviewTwitterDetails } from '~/models/link-previews/link-preview-twitter-details/ILinkPreviewTwitterDetails';
import {
    dateDeserializer, dateSerializer,
    linkPreviewDetailsDeserializer, linkPreviewDetailsSerializer,
    linkPreviewImageDeserializer,
    linkPreviewImageSerializer
} from '~/models/common/serializers';

export class LinkPreview extends DataModel<LinkPreview> implements ILinkPreview {
    url: string;
    domain: string;
    lastUpdated: Date;
    nextUpdate: Date;
    contentType: string;
    mimeType: string;
    redirected: boolean;
    redirectionUrl: string;
    redirectionTrail: string[];
    title: string;
    description: string;
    name: string;
    trackersDetected: boolean;
    icon: ILinkPreviewImage;
    image: ILinkPreviewImage;
    details: ILinkPreviewTwitterDetails | ILinkPreviewYoutubeDetails;

    dataMaps: DataModelAttributeMap<ILinkPreview>[] = [
        {
            dataKey: 'uuid',
            attributeKey: 'id',
        },
        {
            dataKey: 'url',
            attributeKey: 'url',
        },
        {
            dataKey: 'domain',
            attributeKey: 'domain'
        },
        {
            dataKey: 'contentType',
            attributeKey: 'contentType'
        },
        {
            dataKey: 'mimeType',
            attributeKey: 'mimeType'
        },
        {
            dataKey: 'redirected',
            attributeKey: 'redirected'
        },
        {
            dataKey: 'redirectionUrl',
            attributeKey: 'redirectionUrl'
        },
        {
            dataKey: 'redirectionTrail',
            attributeKey: 'redirectionTrail'
        },
        {
            dataKey: 'title',
            attributeKey: 'title'
        },
        {
            dataKey: 'description',
            attributeKey: 'description'
        },
        {
            dataKey: 'name',
            attributeKey: 'name'
        },
        {
            dataKey: 'trackersDetected',
            attributeKey: 'trackersDetected'
        },
        {
            dataKey: 'icon',
            attributeKey: 'icon',
            deserializer: linkPreviewImageDeserializer,
            serializer: linkPreviewImageSerializer,
        },
        {
            dataKey: 'image',
            attributeKey: 'image',
            deserializer: linkPreviewImageDeserializer,
            serializer: linkPreviewImageSerializer,
        },
        {
            dataKey: 'details',
            attributeKey: 'details',
            deserializer: linkPreviewDetailsDeserializer,
            serializer: linkPreviewDetailsSerializer,
        },
        {
            dataKey: 'lastUpdated',
            attributeKey: 'lastUpdated',
            deserializer: dateDeserializer,
            serializer: dateSerializer
        },
        {
            dataKey: 'nextUpdate', attributeKey: 'nextUpdate',
            deserializer: dateDeserializer,
            serializer: dateSerializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

