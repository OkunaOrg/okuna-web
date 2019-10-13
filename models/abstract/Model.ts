export interface IModelData{
    id: number;
}

export abstract class Model<T extends Model<T, Y>, Y extends IModelData> {
    public id: number;

    protected constructor(data: Y) {
        this.id = data.id;
    }
}
