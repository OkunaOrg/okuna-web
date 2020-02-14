import { IDataModel } from '~/models/abstract/IDataModel';
import { IEmoji } from '~/models/common/emoji/IEmoji';


export interface IReactionsEmojiCount extends IDataModel<IReactionsEmojiCount> {
    emoji: IEmoji;
    count: number;
}

