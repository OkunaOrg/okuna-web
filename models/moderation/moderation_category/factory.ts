import { DataModel } from 'models/abstract/DataModel';
import { IModelFactory } from 'interfaces/IModelFactory';
import { ModerationCategoryData } from 'types/models-data/common/ModerationCategoryData';
import { ModerationCategory } from '~/models/common/moderationCategory/ModerationCategory';
import { IModerationCategory } from '~/models/common/moderationCategory/IModerationCategory';

class ModerationCategoryFactory extends IModelFactory<IModerationCategory> {
    make(data: ModerationCategoryData): IModerationCategory {
        return new ModerationCategory(data);
    }
}

const moderationCategoryFactory = new ModerationCategoryFactory();

export default moderationCategoryFactory;
