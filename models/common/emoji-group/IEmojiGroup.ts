import { IDataModel } from '~/models/abstract/IDataModel';
import Color from 'color';
import { IEmoji } from '~/models/common/emoji/IEmoji';

export interface IEmojiGroup extends IDataModel<IEmojiGroup> {
    keyword: string;
    created: Date;
    order: number;
    color: Color;
    emojis: IEmoji[];
}
