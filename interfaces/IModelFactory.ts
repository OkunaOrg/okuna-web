import { ModelData } from '~/types/models/ModelData';
import { IDataModel } from '~/models/abstract/IDataModel';

export interface IModelFactory<T extends IDataModel<T>> {
    make(data: ModelData): T;
}