import { IStringTemplateService } from '~/services/string-template/IStringTemplateService';
import { injectable } from '~/node_modules/inversify';


// Deprecated, use utilsService
@injectable()
export class StringTemplateService implements IStringTemplateService {
    parse(template: string, templateData: {[key: string]: boolean | number | string}): string {
        let processedTemplate = template;
        Object.keys(templateData).forEach((key) => processedTemplate = processedTemplate.replace(`{${key}}`, templateData[key].toString()));
        return processedTemplate;
    }
}

