import { ModelData } from '~/types/models-data/ModelData';

export interface IDataModel<T extends IDataModel<T>> {
    [key: string]: any;

    id: number;

    updateWithData(data: ModelData): void;
}


type DataModelAttributeUpdater<T> = (instance: T, data: any) => any;

export interface DataModelDataToAttributesMap<T> {
    [key: string]: string | DataModelAttributeUpdater<T>;
}