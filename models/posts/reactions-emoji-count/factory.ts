import { IModelFactory } from '~/interfaces/IModelFactory';
import { IReactionsEmojiCount } from '~/models/posts/reactions-emoji-count/IReactionsEmojiCount';
import { ReactionsEmojiCount } from '~/models/posts/reactions-emoji-count/ReactionsEmojiCount';
import { ReactionsEmojiCountData } from '~/types/models-data/posts/ReactionsEmojiCountData';

class ReactionsEmojiCountFactory extends IModelFactory<IReactionsEmojiCount> {
    make(data: ReactionsEmojiCountData): IReactionsEmojiCount {
        return new ReactionsEmojiCount(data);
    }
}

const reactionsEmojiCountFactory = new ReactionsEmojiCountFactory();

export default reactionsEmojiCountFactory;