import { IStringTemplateService } from '~/services/string-template/IStringTemplate';

const fillTemplate = require('es6-dynamic-template');

export class StringTemplateService implements IStringTemplateService {
    parse(template: string, templateData: {[key: string]: boolean | number | string}): string {
        return fillTemplate(template, templateData);
    }
}

