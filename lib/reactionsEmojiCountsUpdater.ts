import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';
import { EmojiData } from '~/types/models-data/common/EmojiData';
import reactionsEmojiCountFactory from '~/models/posts/reactions-emoji-count/factory';
import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';
import { IReactionsEmojiCount } from '~/models/posts/reactions-emoji-count/IReactionsEmojiCount';

export const reactionEmojiCountsUpdater = (params: {
    existingReactionsEmojiCounts: IReactionsEmojiCount[],
    existingReaction: IPostReaction | IPostCommentReaction,
    newReaction: IPostReaction | IPostCommentReaction
}): IReactionsEmojiCount[] => {
    const hasExistingReaction = !!params.existingReaction;

    if (!hasExistingReaction && params.newReaction == null) {
        throw 'Trying to remove no reaction';
    }

    const newEmojiCounts = params.existingReactionsEmojiCounts.slice(0);


    if (hasExistingReaction) {
        // Find and unset the current reaction
        const existingReactionEmojiCount = newEmojiCounts.find((emojiCount) => {
            return emojiCount.emoji.id == params.existingReaction.emoji.id;
        });

        if (existingReactionEmojiCount.count > 1) {
            // If its not the only reaction for this emoji, decrement it
            existingReactionEmojiCount.count -= 1;
        } else {
            // If its the only reaction for this emoji, remove it altogether
            const indexOfExistingReactionEmojiCount = newEmojiCounts.indexOf(existingReactionEmojiCount);
            newEmojiCounts.splice(indexOfExistingReactionEmojiCount, 1);
        }
    }

    if (params.newReaction) {
        const newReactionEmojiCount = newEmojiCounts.find((emojiCount) => {
            return emojiCount.emoji.id == params.newReaction.emoji.id;
        });

        if (newReactionEmojiCount) {
            // Up existing count
            newReactionEmojiCount.count += 1;
        } else {
            const serializedEmoji = params.newReaction.emoji.serialize();
            const emojiData = JSON.parse(serializedEmoji) as EmojiData;
            // Add new emoji count
            const newEmojiCount = reactionsEmojiCountFactory.make({
                // Arg. All data models require ID
                id: 999,
                emoji: emojiData,
                count: 1
            });


            newEmojiCounts
                .push(newEmojiCount);
        }
    }

    return newEmojiCounts;
};
