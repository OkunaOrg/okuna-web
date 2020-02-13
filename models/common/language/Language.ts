import { ILanguage } from '~/models/common/language/ILanguage';
import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import Color from 'color';
import {
    colorSerializer,
    dateSerializer,
    dateDeserializer,
    colorDeserializer
} from '~/models/common/serializers';

export class Language extends DataModel<Language> implements ILanguage {
    code: string;
    name: string;

    dataMaps: DataModelAttributeMap<ILanguage>[] = [
        {
            dataKey: 'code',
            attributeKey: 'code',
        },
        {
            dataKey: 'name',
            attributeKey: 'name',
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

