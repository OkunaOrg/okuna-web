import { DataModel } from '~/models/abstract/DataModel';
import { ModelData } from '~/types/models/ModelData';

export interface IModelFactory<T extends DataModel<T>> {
    make(data: ModelData): T;
}