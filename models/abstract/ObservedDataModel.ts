import { action, observable } from '~/node_modules/mobx';
import { IModelData, DataModel } from '~/models/abstract/DataModel';

export abstract class ObservedDataModel<T extends ObservedDataModel<T>> extends DataModel<T> {
    @observable
    observable!: ObservedDataModel<T>;

    updateWithData(data: IModelData) {
        super.updateWithData(data);
        this.notifyUpdate();
    };

    @action.bound
    notifyUpdate() {
        this.observable = this as any;
    }
}