import { AxiosResponse } from '~/node_modules/axios';
import { CategoryData } from '~/types/models-data/common/CategoryData';

export interface ICategoriesApiService {
    getCategories(): Promise<AxiosResponse<CategoryData[]>>;
}
