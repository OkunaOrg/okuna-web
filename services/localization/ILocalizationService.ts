import VueI18n from '~/node_modules/vue-i18n';

export interface ILocalizationService {
    setVueTranslator(vueTranslator: VueI18n): void;

    localize(key: string, values?: VueI18n.Values): string;

    getActiveLocale(): string;
}