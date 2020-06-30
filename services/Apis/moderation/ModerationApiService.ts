import { IHttpService } from '~/services/http/IHttpService';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { IStringTemplateService } from '~/services/string-template/IStringTemplateService';

import { AxiosResponse } from '~/node_modules/axios';
import { IModerationApiService } from '~/services/Apis/moderation/IModerationApiService';
import { ModerationCategoryData } from '~/types/models-data/moderation/ModerationCategoryData';

@injectable()
export class ModerationApiService implements IModerationApiService {
    static GET_MODERATION_CATEGORIES_PATH = 'api/moderation/categories/';


    constructor(@inject(TYPES.HttpService) private httpService: IHttpService,
                @inject(TYPES.StringTemplateService) private stringTemplateService: IStringTemplateService) {
    }

    getModerationCategories(): Promise<AxiosResponse<ModerationCategoryData[]>> {
        return this.httpService.get(ModerationApiService.GET_MODERATION_CATEGORIES_PATH, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }


}