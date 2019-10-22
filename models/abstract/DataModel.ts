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
        const dataMaps = this.getDataMaps();
        dataMaps.forEach((dataMap: DataModelAttributeMap<any>) => {
            let dataKeyValue = data[dataMap.dataKey];
            if (dataKeyValue) {
                if (dataMap.deserializer) dataKeyValue = dataMap.deserializer(this, dataKeyValue);
                this[dataMap.attributeKey] = dataKeyValue;
            }
        });
    };
}