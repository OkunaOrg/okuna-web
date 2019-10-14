export interface IModelData{
    [key: string]: any;
    id: number;
}

export interface IModel{
    [key: string]: any;
}

export abstract class Model<T extends Model<T, Y>, Y extends IModelData> implements IModel{
    [key: string]: any;

    public id: number;

    protected constructor(data: Y) {
        this.id = data.id;
    }
}
