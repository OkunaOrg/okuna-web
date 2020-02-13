import { IDataModel } from '~/models/abstract/IDataModel';
import Color from 'color';

export interface IEmoji extends IDataModel<IEmoji> {
    keyword: string;
    image: string;
    created: Date;
    order: number;
    color: Color;
}
