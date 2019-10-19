import { action, observable } from '~/node_modules/mobx';
import { DataModel } from '~/models/abstract/DataModel';
import { ModelData } from '~/types/models-data/ModelData';

export abstract class ObservedDataModel<T extends ObservedDataModel<T>> extends DataModel<T> {
    @observable
    observable!: ObservedDataModel<T>;

    updateWithData(data: ModelData) {
        super.updateWithData(data);
        this.notifyUpdate();
    };

    @action.bound
    notifyUpdate() {
        this.observable = this as any;
    }
}