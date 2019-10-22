import { ModelData } from '~/types/models-data/ModelData';

export interface IDataModel<T extends IDataModel<T>> {
    [key: string]: any;

    id: number;

    updateWithData(data: ModelData): void;

    dataMaps: DataModelAttributeMap<T>[];
}


export interface DataModelAttributeMap<T> {
    dataKey: string;
    attributeKey: string;
    deserializer?: DataValueToAttributeDeserializer<T>
}

type DataValueToAttributeDeserializer<T> = (instance: T, rawData: any) => any;
