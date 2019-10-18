import { singleton } from '~/node_modules/tsyringe';

const fillTemplate = require('es6-dynamic-template');

@singleton()
export class StringTemplateService {
    parse(template: string, templateData: {[key: string]: boolean | number | string}): string {
        return fillTemplate(template, templateData);
    }
}

