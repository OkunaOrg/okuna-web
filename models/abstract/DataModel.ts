export interface ModelData {
    id: number,

    [key: string]: any;
}


export interface IndexedItem {
    [key: string]: any;
}

export abstract class DataModel<T extends DataModel<T>> implements IndexedItem {
    [key: string]: any;

    public id!: number;

    ownAttributesKeys: string[];
    abstract dataMap: DataModelDataToAttributesMap<any>;

    constructor(data: ModelData) {
        this.ownAttributesKeys = Object.getOwnPropertyNames(this);
        this.updateWithData(data);
    }

    updateWithData(data: ModelData) {
        this.ownAttributesKeys.forEach((ownAttributeKey) => {
            let targetAttributeValue = data[ownAttributeKey];

            if (targetAttributeValue) {
                const targetAttribute = this.dataMap[ownAttributeKey];

                if (typeof targetAttribute == 'string') {
                    let targetAttributeKey = targetAttribute;

                    if (!this.ownAttributesKeys.includes(targetAttributeKey)) {
                        throw Error(`The specified target attribute ${targetAttributeKey} for static data key ${ownAttributeKey} does not exists in model.`);
                    }

                    this[targetAttributeKey] = targetAttributeValue;
                } else {
                    targetAttribute(this, targetAttributeValue);
                }
            }
        });
    };
}


type DataModelAttributeUpdater<T> = (instance: T, data: any) => any;

export interface DataModelDataToAttributesMap<T> {
    [key: string]: string | DataModelAttributeUpdater<T>;
}