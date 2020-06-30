import { AxiosResponse } from '~/node_modules/axios';
import { ModerationCategoryData } from '~/types/models-data/moderation/ModerationCategoryData';

export interface IModerationApiService {
    getModerationCategories(): Promise<AxiosResponse<ModerationCategoryData[]>>;
}
