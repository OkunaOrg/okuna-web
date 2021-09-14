import { ModelData } from '~/types/models-data/ModelData';
import { DataModelAttributeMap, IDataModel } from '~/models/abstract/IDataModel';

export abstract class DataModel<T extends DataModel<T>> implements IDataModel<T> {
    [key: string]: any;

    public id!: number;

    abstract dataMaps: DataModelAttributeMap<any>[] = [
        {
            dataKey: 'id',
            attributeKey: 'id'
        },
    ];

    constructor(data: ModelData) {
        this.updateWithData(data);
    }

    updateWithData(data: ModelData) {
        this.dataMaps.forEach((dataMap: DataModelAttributeMap<any>) => {
            let dataKeyValue = data[dataMap.dataKey];
            if (typeof dataKeyValue !== 'undefined' && dataKeyValue !== null) {
                const attributeType = typeof this[dataMap.attributeKey];
                const attributeIsObject = attributeType === 'function' || attributeType === 'object' && !!attributeType;

                if (attributeIsObject && this[dataMap.attributeKey] !== null && this[dataMap.attributeKey]['updateWithData']) {
                    // If its another DataModel, dont replace it but merely update it
                    this[dataMap.attributeKey]['updateWithData'](dataKeyValue);
                } else {
                    if (dataMap.deserializer) dataKeyValue = dataMap.deserializer(this, dataKeyValue);
                    this[dataMap.attributeKey] = dataKeyValue;
                }
            } else {
                const valueAlreadyExists = !!this[dataMap.attributeKey];
                if (valueAlreadyExists && typeof dataKeyValue === 'undefined') return;
                if (valueAlreadyExists && dataKeyValue === null) {
                    this[dataMap.attributeKey] = dataKeyValue;
                    return;
                }

                if (typeof dataMap.defaultValue !== 'undefined') {
                    this[dataMap.attributeKey] = dataMap.defaultValue;
                }
            }
        });
    };

    serialize(): string {
        let result = {
            id: this.id
        };

        this.dataMaps.forEach((dataMap: DataModelAttributeMap<any>) => {
            let attributeKey = dataMap.attributeKey;
            let attributeValue = this[attributeKey];

            if (attributeValue) {
                if (dataMap.serializer) {
                    result[dataMap.dataKey] = dataMap.serializer(this, attributeValue);
                } else {
                    const attrType = typeof attributeValue;
                    const attrIsObject = attrType === 'function' || attrType === 'object' && !!attrType;
                    // The JSON.stringify will take care of making primitives into strings.
                    if (!attrIsObject) result[dataMap.dataKey] = attributeValue;
                }
            }
        });


        return JSON.stringify(result);
    }
}
