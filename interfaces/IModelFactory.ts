import { IModelData, Model } from '~/models/abstract/Model';

export interface IModelFactory<T extends Model<T, Y>, Y extends IModelData> {
    make(data: Y): T;
}