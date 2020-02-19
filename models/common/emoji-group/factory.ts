import { IModelFactory } from 'interfaces/IModelFactory';
import { EmojiGroupData } from 'types/models-data/common/EmojiGroupData';
import { EmojiGroup } from '~/models/common/emojiGroup/EmojiGroup';
import { IEmojiGroup } from '~/models/common/emojiGroup/IEmojiGroup';

class EmojiGroupFactory extends IModelFactory<IEmojiGroup> {
    make(data: EmojiGroupData): IEmojiGroup {
        return new EmojiGroup(data);
    }
}

const emojiGroupFactory = new EmojiGroupFactory();

export default emojiGroupFactory;
