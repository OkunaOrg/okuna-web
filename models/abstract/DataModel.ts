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
            if (dataKeyValue) {
                if (dataMap.deserializer) dataKeyValue = dataMap.deserializer(this, dataKeyValue);
                this[dataMap.attributeKey] = dataKeyValue;
            }
        });
    };

    serialize(): string {
        let result = {};

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