export interface IStringTemplateService {
    parse(template: string, templateData: {[key: string]: boolean | number | string}): string;
}

