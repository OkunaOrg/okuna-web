import { IDataModel } from '~/models/abstract/IDataModel';
import { Emoji } from '~/models/common/emoji/Emoji';


export interface IReactionsEmojiCount extends IDataModel<IReactionsEmojiCount> {
    emoji: Emoji;
    count: number;
}

