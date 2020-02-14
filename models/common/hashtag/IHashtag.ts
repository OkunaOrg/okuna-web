import { IDataModel } from '~/models/abstract/IDataModel';
import { IEmoji } from '~/models/common/emoji/IEmoji';

export interface IHashtag extends IDataModel<IHashtag> {
    name?: string;
    emoji?: IEmoji;
    image?: string;
    color?: string;
    textColor?: string;
    postsCount?: number;
    isReported?: boolean;
}
