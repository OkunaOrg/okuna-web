import { ModelData } from '~/types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';
import { ModerationCategoryData } from '~/types/models-data/moderation/ModerationCategoryData';

export interface ModerationReportData extends ModelData {
    description: string;
    reporter: UserData;
    category: ModerationCategoryData;
    created: string;
}