import { ModelData } from '~/types/models-data/ModelData';
import { IDataModel } from '~/models/abstract/IDataModel';

export abstract class IModelFactory<T extends IDataModel<T>> {
    abstract make(data: ModelData): T;

    makeMultiple(data: ModelData[]): T[] {
        return data.map((dataItem) => this.make(dataItem));
    }
}