import { DataModel, ModelData } from '~/models/abstract/DataModel';

export interface IModelFactory<T extends DataModel<T>> {
    make(data: ModelData): T;
}