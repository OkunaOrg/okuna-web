import { IHttpService } from '~/services/http/IHttpService';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { IStringTemplateService } from '~/services/string-template/IStringTemplateService';

import { AxiosResponse } from '~/node_modules/axios';
import { ICategoriesApiService } from '~/services/Apis/categories/ICategoriesApiService';
import { CategoryData } from '~/types/models-data/common/CategoryData';

@injectable()
export class CategoriesApiService implements ICategoriesApiService {
    static GET_CATEGORIES_PATH = 'api/categories/';

    constructor(@inject(TYPES.HttpService) private httpService: IHttpService,
                @inject(TYPES.StringTemplateService) private stringTemplateService: IStringTemplateService) {
    }

    getCategories(): Promise<AxiosResponse<CategoryData[]>> {
        return this.httpService.get(CategoriesApiService.GET_CATEGORIES_PATH, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }


}