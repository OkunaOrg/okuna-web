import { IModelFactory } from '~/interfaces/IModelFactory';
import { IModerationCategory } from '~/models/moderation/moderation_category/IModerationCategory';
import { ModerationCategory } from '~/models/moderation/moderation_category/ModerationCategory';
import { ModerationCategoryData } from '~/types/models-data/moderation/ModerationCategoryData';

class ModerationCategoryFactory extends IModelFactory<IModerationCategory> {
    make(data: ModerationCategoryData): IModerationCategory {
        return new ModerationCategory(data);
    }
}

const moderationCategoryFactory = new ModerationCategoryFactory();

export default moderationCategoryFactory;
