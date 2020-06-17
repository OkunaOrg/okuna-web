import { IDataModel } from '~/models/abstract/IDataModel';
import { IEmoji } from '~/models/common/emoji/IEmoji';
import Color from 'color';

export interface IHashtag extends IDataModel<IHashtag> {
    name?: string;
    emoji?: IEmoji;
    image?: string;
    color?: Color;
    textColor?: string;
    postsCount?: number;
    isReported?: boolean;
}
