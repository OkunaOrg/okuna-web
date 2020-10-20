import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { ILinkPreviewImage } from '~/models/link-previews/link-preview-image/ILinkPreviewImage';

export class LinkPreviewImage extends DataModel<LinkPreviewImage> implements ILinkPreviewImage {
    url: string;
    width: number;
    height: number;

    dataMaps: DataModelAttributeMap<ILinkPreviewImage>[] = [
        {dataKey: 'url', attributeKey: 'url',},
        {dataKey: 'width', attributeKey: 'width',},
        {dataKey: 'height', attributeKey: 'height',},
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

