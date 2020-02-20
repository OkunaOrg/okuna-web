import { IStringTemplateService } from '~/services/string-template/IStringTemplate';
import { injectable } from '~/node_modules/inversify';


@injectable()
export class StringTemplateService implements IStringTemplateService {
    parse(template: string, templateData: {[key: string]: boolean | number | string}): string {
        let processedTemplate = template;
        Object.keys(templateData).forEach((key) => processedTemplate = processedTemplate.replace(`{${key}}`, templateData[key].toString()));
        return processedTemplate;
    }
}

