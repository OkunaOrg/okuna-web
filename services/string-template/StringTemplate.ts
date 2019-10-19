import { IStringTemplateService } from '~/services/string-template/IStringTemplate';
import { injectable } from '~/node_modules/inversify';

const fillTemplate = require('es6-dynamic-template');

@injectable()
export class StringTemplateService implements IStringTemplateService {
    parse(template: string, templateData: {[key: string]: boolean | number | string}): string {
        return fillTemplate(template, templateData);
    }
}

