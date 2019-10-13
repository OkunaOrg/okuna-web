import { action, observable } from '~/node_modules/mobx';
import { Model } from '~/models/abstract/Model';

export interface IUpdatableModelData {
    id: number;
}

export abstract class UpdatableModel<T extends UpdatableModel<T, Y>, Y extends IUpdatableModelData> extends Model<T, Y> {
    @observable
    updateSubject!: T;

    abstract updateWithData(data: Y): void;

    @action.bound
    notifyUpdate() {
        this.updateSubject = this as any;
    }

    update(data: Y) {
        this.updateWithData(data);
        this.notifyUpdate();
    }
}
