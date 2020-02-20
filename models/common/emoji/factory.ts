import { IModelFactory } from '~/interfaces/IModelFactory';
import { EmojiData } from 'types/models-data/common/EmojiData';
import { Emoji } from '~/models/common/emoji/Emoji';
import { IEmoji } from '~/models/common/emoji/IEmoji';

class EmojiFactory extends IModelFactory<IEmoji> {
    make(data: EmojiData): IEmoji {
        return new Emoji(data);
    }
}

const emojiFactory = new EmojiFactory();

export default emojiFactory;
