import VueI18n from '~/node_modules/vue-i18n';
import { ILocalizationService } from '~/services/localization/ILocalizationService';
import { injectable } from '~/node_modules/inversify';

@injectable()
export class LocalizationService implements ILocalizationService {
    private vuei18n!: VueI18n;

    setVueTranslator(vueTranslator: VueI18n) {
        this.vuei18n = vueTranslator;
    }

    localize(key: string) {
        return this.vuei18n.t(key) as string;
    }

    getActiveLocale() {
        return this.vuei18n.locale;
    }
}

