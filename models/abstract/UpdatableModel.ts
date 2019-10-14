import { action, observable } from '~/node_modules/mobx';
import { IModelData, Model } from '~/models/abstract/Model';

export interface IUpdatableModelData extends IModelData {
}

export abstract class UpdatableModel<T extends UpdatableModel<T, Y>, Y extends IUpdatableModelData> extends Model<T, Y> {
    @observable
    updateSubject!: UpdatableModel<T, Y>;

    updatableDataKeys: string[];
    ownAttributesKeys: string[];
    updatableDataToAttributesMap: UpdatableModelDataToAttributesMap<any> = {
        id: 'id'
    };

    protected constructor(data: Y) {
        super(data);
        this.updatableDataKeys = Object.keys(this.updatableDataToAttributesMap);
        this.ownAttributesKeys = Object.getOwnPropertyNames(this);
        this.updateWithData(data);
    }


    updateWithData(data: Y, config: {notifyUpdate: boolean} = {notifyUpdate: true}) {
        this.updatableDataKeys.forEach((updatableDataKey) => {
            let targetAttributeValue = data[updatableDataKey];

            if (targetAttributeValue) {
                const targetAttribute = this.updatableDataToAttributesMap[updatableDataKey];

                let targetAttributeKey;

                if (typeof targetAttribute == 'string') {
                    targetAttributeKey = targetAttribute;
                } else {
                    targetAttributeKey = targetAttribute.targetAttribute;
                    targetAttributeValue = targetAttribute.updater(this, targetAttributeValue);
                }

                if (!this.ownAttributesKeys.includes(targetAttributeKey)) {
                    throw Error(`The specified target attribute ${targetAttributeKey} for updatable data key ${updatableDataKey} does not exists in model.`);
                }

                this[targetAttributeKey] = targetAttributeValue;
            }
        });
        this.notifyUpdate();
    };

    @action.bound
    notifyUpdate() {
        this.updateSubject = this as any;
    }

    update(data: Y) {
        this.updateWithData(data);
        this.notifyUpdate();
    }
}

interface UpdatableModelKeyUpdater<T> {
    targetAttribute: string;
    updater: (instance: T, data: any) => any
}

interface UpdatableModelDataToAttributesMap<T> {
    [key: string]: string | UpdatableModelKeyUpdater<T>;
}