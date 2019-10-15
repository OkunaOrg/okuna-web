import { IModelData, DataModel } from '~/models/abstract/DataModel';

export interface IModelFactory<T extends DataModel<T>> {
    make(data: IModelData): T;
}