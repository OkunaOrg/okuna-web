import { IDataModel } from '~/models/abstract/IDataModel';


export interface IPostVideoFormat extends IDataModel<IPostVideoFormat> {
    progress: number;
    duration: number;
    format: string;
    file: string;
}

