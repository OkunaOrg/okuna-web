import { IModelFactory } from '~/interfaces/IModelFactory';
import { EmojiGroupData } from 'types/models-data/common/EmojiGroupData';
import { IEmojiGroup } from '~/models/common/emoji-group/IEmojiGroup';
import { EmojiGroup } from '~/models/common/emoji-group/EmojiGroup';

class EmojiGroupFactory extends IModelFactory<IEmojiGroup> {
    make(data: EmojiGroupData): IEmojiGroup {
        return new EmojiGroup(data);
    }
}

const emojiGroupFactory = new EmojiGroupFactory();

export default emojiGroupFactory;
